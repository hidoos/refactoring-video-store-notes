class Rental {
  constructor(data) {
    this._data = data;
  }

  get days() {
    return this._data.days;
  }

  get movieID() {
    return this._data.movieID;
  }
}

module.exports = {
  Rental
};