import { movies } from './movies';
import { customer } from "./customer";

function statement(customer, movies) {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;
  for (let r of customer.rentals) {
    frequentRenterPoints += frequentRenterPointsFor(r);
    //print figures for this rental
    result += `\t${movieFor(r).title}\t${amountFor(r)}\n`;
    totalAmount += amountFor(r);
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
}

function amountFor(r) {
  let result = 0;

  // determine amount for each movie
  switch (movieFor(r).code) {
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

function movieFor(r) {
  return movies[r.movieID];
}

function frequentRenterPointsFor(r) {
  // add frequent renter points
  // add bonus for a two day new release rental
  return (movieFor(r).code === 'new' && r.days > 2) ? 2 : 1;
}

statement(customer, movies);

/* statement method output 
  Rental Record for martin
    Ran 3.5
    Trois Couleurs: Bleu 2
  Amount owed is 5.5
  You earned 2 frequent renter points
*/

/* hope output 
  <h1>Rental Record for <em>martin</em></h1>
  <table>
    <tr><td>Ran</td><td>3.5</td></tr>
    <tr><td>Trois Couleurs: Bleu</td><td>2</td></tr>
  </table>
  <p>Amount owed is <em>5.5</em></p>
  <p>You earned <em>2</em> frequent renter points</p>
 */