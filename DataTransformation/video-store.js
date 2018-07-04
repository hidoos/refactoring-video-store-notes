/**
 * using top-level functions
 */
const {movies} = require('../movies');
const {customer} = require('../customer');
const {createStatementData} = require('./createStateDate');

function statement(customer, movies) {
  let data = createStatementData(customer, movies);

  let result = `<h1>Rental Record for <em>${data.name}</em></h1>\n`;
  result += "<table>\n";
  for (let r of data.rentals) {
    result += `  <tr><td>${r.title}</td><td>${r.amount}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${data.totalAmount}</em></p>\n`;
  result += `<p>You earned <em>${data.totalFrequentRenterPoints}</em> frequent renter points</p>\n`;
  return result;
}

console.log(statement(customer, movies));

