/**
 * using top-level functions
 */
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

function textStatement(customer, movies) {
  let result = `Rental Record for ${customer.name}\n`;

  for (let r of customer.rentals) {
    result += `\t${movieFor(r, movies).title}\t${amountFor(r, movies)}\n`;
  }

  // add footer lines
  result += `Amount owed is ${totalAmount(customer, movies)}\n`;
  result += `You earned ${totalFrequentRenterPoints(customer, movies)} frequent renter points\n`;

  /**
   * another way is using pipeline methods

   function totalAmountPipe() {
      return customer.rentals
        .reduce((total, r) => total + amountFor(r), 0);
    }

   function totalFrequentRenterPointsPipe() {
      return customer.rentals
        .map(r => frequentRenterPointsFor(r))
        .reduce((a, b) => a + b, 0)
    }
   */

  return result;
}

function htmlStatement(customer, movies) {
  let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n`;
  result += "<table>\n";
  for (let r of customer.rentals) {
    result += `  <tr><td>${movieFor(r, movies).title}</td><td>${amountFor(r, movies)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${totalAmount(customer, movies)}</em></p>\n`;
  result += `<p>You earned <em>${totalFrequentRenterPoints(customer, movies)}</em> frequent renter points</p>\n`;
  return result;
}

function statement(customer, movies, format = '') {
  const dispatchTable = {
    text: textStatement,
    html: htmlStatement
  };
  if (undefined === dispatchTable[format]) throw new Error(`unknown statement for ${format}`)
  return dispatchTable[format].call(null, customer, movies);
}

// todo 使用函数 curry 去包装 statement，返回一个新的函数，只用传 format 参数来调用
console.log(statement(customer, movies, 'text'));

// console.log(htmlStatement(customer, movies));
// console.log(statement(customer, movies));

