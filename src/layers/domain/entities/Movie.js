export class Movie {
  constructor({
    id,
    title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    vote_count,
    genres = [],
    runtime,
    status,
    tagline,
    credits = {},
    videos = {},
    similar = {},
  }) {
    this.id = id;
    this.title = title;
    this.overview = overview;
    this.poster_path = poster_path;
    this.backdrop_path = backdrop_path;
    this.release_date = release_date;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.genres = genres;
    this.runtime = runtime;
    this.status = status;
    this.tagline = tagline;
    this.credits = credits;
    this.videos = videos;
    this.similar = similar;
  }

  getYear() {
    return this.release_date ? this.release_date.split('-')[0] : '';
  }

  getPosterUrl(size = 'w500') {
    return this.poster_path ? `https://image.tmdb.org/t/p/${size}${this.poster_path}` : null;
  }

  getBackdropUrl(size = 'original') {
    return this.backdrop_path ? `https://image.tmdb.org/t/p/${size}${this.backdrop_path}` : null;
  }

  getTrailer() {
    return this.videos?.results?.find(video => video.type === 'Trailer') || null;
  }

  getCast(limit = 5) {
    return this.credits?.cast?.slice(0, limit) || [];
  }

  getSimilarMovies(limit = 5) {
    return this.similar?.results?.slice(0, limit) || [];
  }
} 