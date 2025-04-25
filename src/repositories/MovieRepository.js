import { Movie } from '../models/Movie';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Cache object to store API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export class MovieRepository {
  static async fetchWithRetry(url, options, retries = MAX_RETRIES) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return this.fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  }

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

  static isCacheValid(key) {
    const cached = cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < CACHE_DURATION;
  }

  static setCache(key, data) {
    cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  static getFallbackMovies() {
    return Array(8).fill(null).map(() => new Movie({
      id: Math.random(),
      title: 'Không thể tải phim',
      poster_path: '/placeholder.jpg',
      release_date: new Date().toISOString().split('T')[0]
    }));
  }
} 