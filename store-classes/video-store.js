/**
 * Using classes
 */
// import class
const {Customer} = require('./customer.class');

// mock data
const {movies} = require('../movies');
const {customer} = require('../customer');

function statement(customerArgs, movies) {
  const customer = new Customer(customerArgs, movies);
  let result = `Rental Record for ${customer.name}\n`;

  for (let rental of customer.rentals) {
    result += `\t${rental.movie.title}\t${rental.amount}\n`;
  }

  // add footer lines
  result += `Amount owed is ${customer.amount}\n`;
  result += `You earned ${customer.frequentRenterPoints} frequent renter points\n`;

  return result;
}

console.log(statement(customer, movies));
