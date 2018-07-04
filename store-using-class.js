/**
 * Using classes
 */
// import class
const {Customer} = require('./store-classes/customer.class');

// mock data
const {movies} = require('./movies');
const {customer} = require('./customer');

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

function statement(customerArgs, movies) {
  const customer = new Customer(customerArgs);
  let result = `Rental Record for ${customer.name}\n`;

  for (let r of customer.rentals) {
    result += `\t${movieFor(r, movies).title}\t${amountFor(r, movies)}\n`;
  }

  // add footer lines
  result += `Amount owed is ${totalAmount(customer, movies)}\n`;
  result += `You earned ${totalFrequentRenterPoints(customer, movies)} frequent renter points\n`;

  return result;
}

statement(customer, movies);

// console.log(htmlStatement(customer, movies));
// console.log(statement(customer, movies));
