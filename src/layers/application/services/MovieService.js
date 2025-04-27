import { MovieRepository } from '../../data/repositories/MovieRepository';

export class MovieService {
  static async getInitialMovies() {
    try {
      const [trending, topRated, latest] = await Promise.all([
        MovieRepository.getTrendingMovies(),
        MovieRepository.getTopRatedMovies(),
        MovieRepository.getLatestMovies()
      ]);

      return {
        trending: trending.slice(0, 8),
        topRated: topRated.slice(0, 8),
        latest: latest.slice(0, 8)
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
      return {
        ...response,
        results: response.results.slice(0, 20)
      };
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }

  static async getMovieDetails(id) {
    try {
      return await MovieRepository.getMovieDetails(id);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }

  static async getFilteredMovies(filters) {
    try {
      const movies = await MovieRepository.getFilteredMovies(filters);
      return {
        trending: movies.slice(0, 8),
        topRated: movies.slice(8, 16),
        latest: movies.slice(16, 24)
      };
    } catch (error) {
      console.error('Error filtering movies:', error);
      throw error;
    }
  }
} 