import { MovieRepository } from '../repositories/MovieRepository';

export class MovieService {
  static async getInitialMovies() {
    try {
      const [trending, topRated, latest] = await Promise.all([
        MovieRepository.getTrendingMovies(),
        MovieRepository.getTopRatedMovies(),
        MovieRepository.getLatestMovies()
      ]);

      return {
        trending: trending.slice(0, 10),
        topRated: topRated.slice(0, 10),
        latest: latest.slice(0, 10)
      };
    } catch (error) {
      console.error('Error fetching initial movies:', error);
      throw error;
    }
  }

  static async searchMovies(query, page = 1) {
    try {
      if (!query) return { results: [], page: 1, totalPages: 0 };
      
      const response = await MovieRepository.searchMovies(query, page);
      return response;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }

  static async getFilteredMovies(filters) {
    try {
      const movies = await MovieRepository.getFilteredMovies(filters);
      return {
        trending: movies.slice(0, 10),
        topRated: movies.slice(10, 20),
        latest: movies.slice(20, 30)
      };
    } catch (error) {
      console.error('Error filtering movies:', error);
      throw error;
    }
  }
} 