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
}

module.exports = {
  Customer
};