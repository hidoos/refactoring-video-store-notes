class Rental {
  constructor(data, movies) {
    this._data = data;
    this._movies = movies;
  }

  get days() {
    return this._data.days;
  }

  get movieID() {
    return this._data.movieID;
  }

  get movie() {
    return this._movies[this.movieID];
  }
}

module.exports = {
  Rental
};