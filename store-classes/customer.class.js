const {Rental} = require("./rental.class");

class Customer {
  constructor(data) {
    this._data = data;
  }

  get name() {
    return this._data.name;
  }

  get rentals() {
    return this._data.rentals.map(r => new Rental(r));
  }
}

module.exports = {
  Customer
};