export class Movie {
  constructor({
    id,
    title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    genre_ids,
    original_language
  }) {
    this.id = id;
    this.title = title;
    this.overview = overview;
    this.posterPath = poster_path ? `${import.meta.env.VITE_IMG_URL}${poster_path}` : null;
    this.backdropPath = backdrop_path ? `https://image.tmdb.org/t/p/original${backdrop_path}` : null;
    this.releaseDate = release_date;
    this.voteAverage = vote_average;
    this.genreIds = genre_ids;
    this.originalLanguage = original_language;
  }
} 