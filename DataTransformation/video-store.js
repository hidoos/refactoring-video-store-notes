/**
 * using top-level functions
 */
const {movies} = require('../movies');
const {customer} = require('../customer');

function movieFor(rental, movies) {
  return movies[rental.movieID];
}

function amountFor(r, movies) {
  let result = 0;

  // determine amount for each movie
  switch (movieFor(r, movies).code) {
    case 'regular':
      result = 2;
      if (r.days > 2) {
        result += (r.days - 2) * 1.5;
      }
      break;
    case 'new':
      result = r.days * 3;
      break;
    case 'childrens':
      result = 1.5;
      if (r.days > 3) {
        result += (r.days - 3) * 1.5;
      }
      break;
  }
  return result;
}

function totalAmount(customer, movies) {
  let result = 0;
  for (let r of customer.rentals) {
    result += amountFor(r, movies);
  }
  return result;
}

function totalFrequentRenterPoints(customer, movies) {
  let result = 0;
  for (let r of customer.rentals) {
    result += frequentRenterPointsFor(r, movies);
  }
  return result;
}

function frequentRenterPointsFor(r, movies) {
  // add frequent renter points
  // add bonus for a two day new release rental
  return (movieFor(r, movies).code === 'new' && r.days > 2) ? 2 : 1;
}

function statement(customer, movies) {
  // build local partial function
  const amount = () => totalAmount(customer, movies);
  const frequentRenterPoints = () => totalFrequentRenterPoints(customer, movies);
  const movie = (aRental) => movieFor(aRental, movies);
  const rentalAmount = (aRental) => amountFor(aRental, movies);

  let data = createStatementData(customer, movies);

  let result = `<h1>Rental Record for <em>${data.name}</em></h1>\n`;
  result += "<table>\n";
  for (let r of data.rentals) {
    result += `  <tr><td>${movie(r).title}</td><td>${rentalAmount(r)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${amount()}</em></p>\n`;
  result += `<p>You earned <em>${frequentRenterPoints()}</em> frequent renter points</p>\n`;
  return result;

  function createStatementData(customer, movies) {
    let result = Object.assign({}, customer);
    result.rentals = customer.rentals.map(rental => createRentalData(rental));
    return result;

    function createRentalData(rental) {
      let result = Object.assign({}, rental);
      return result;
    }
  }
}

console.log(statement(customer, movies));

