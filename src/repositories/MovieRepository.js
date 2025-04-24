import { Movie } from '../models/Movie';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export class MovieRepository {
  static async getTrendingMovies() {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?language=vi`,
      this.getOptions()
    );
    const data = await response.json();
    return data.results.map(movie => new Movie(movie));
  }

  static async getTopRatedMovies() {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?language=vi`,
      this.getOptions()
    );
    const data = await response.json();
    return data.results.map(movie => new Movie(movie));
  }

  static async getLatestMovies() {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?language=vi`,
      this.getOptions()
    );
    const data = await response.json();
    return data.results.map(movie => new Movie(movie));
  }

  static async searchMovies(query, page = 1) {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=vi&page=${page}`,
      this.getOptions()
    );
    const data = await response.json();
    return {
      results: data.results.map(movie => new Movie(movie)),
      page: data.page,
      totalPages: data.total_pages
    };
  }

  static async getFilteredMovies({ genre, country, year }) {
    const url = `${BASE_URL}/discover/movie?language=vi&with_genres=${genre}&with_origin_country=${country}${year !== 'all' ? `&primary_release_year=${year}` : ''}&sort_by=popularity.desc`;
    const response = await fetch(url, this.getOptions());
    const data = await response.json();
    return data.results.map(movie => new Movie(movie));
  }

  static getOptions() {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
  }
} 