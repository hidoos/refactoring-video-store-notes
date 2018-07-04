const {Rental} = require("./rental.class");

class Customer {
  constructor(data, movies) {
    this._data = data;
    this._movies = movies;
  }

  get name() {
    return this._data.name;
  }

  get rentals() {
    return this._data.rentals.map(r => new Rental(r, this._movies));
  }

  get frequentRenterPoints() {
    return this.rentals
      .map(r => r.frequentRenterPoints)
      .reduce((a, b) => a + b, 0);
  }

  get amount() {
    return this.rentals
      .reduce((total, r) => total + r.amount, 0);
  }

}

module.exports = {
  Customer
};