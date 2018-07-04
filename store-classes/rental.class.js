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

  get amount() {
    let result = 0;

    // determine amount for each movie
    switch (this.movie.code) {
      case 'regular':
        result = 2;
        if (this.days > 2) {
          result += (this.days - 2) * 1.5;
        }
        break;
      case 'new':
        result = this.days * 3;
        break;
      case 'childrens':
        result = 1.5;
        if (this.days > 3) {
          result += (this.days - 3) * 1.5;
        }
        break;
    }
    return result;
  }

  get frequentRenterPoints() {
    // add frequent renter points
    // add bonus for a two day new release rental
    return (this.movie.code === 'new' && this.days > 2) ? 2 : 1;
  }
}

module.exports = {
  Rental
};