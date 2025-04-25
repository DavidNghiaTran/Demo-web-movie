import { MovieRepository } from '../repositories/MovieRepository';

// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        const result = await func(...args);
        resolve(result);
      }, delay);
    });
  };
};

export class MovieService {
  static async getInitialMovies() {
    try {
      // Sử dụng Promise.all để fetch dữ liệu song song
      const [trending, topRated, latest] = await Promise.all([
        MovieRepository.getTrendingMovies(),
        MovieRepository.getTopRatedMovies(),
        MovieRepository.getLatestMovies()
      ]);

      // Giới hạn số lượng phim trả về để giảm tải
      return {
        trending: this.optimizeMovies(trending.slice(0, 8)),
        topRated: this.optimizeMovies(topRated.slice(0, 8)),
        latest: this.optimizeMovies(latest.slice(0, 8))
      };
    } catch (error) {
      console.error('Error fetching initial movies:', error);
      throw error;
    }
  }

  // Debounced search function
  static debouncedSearch = debounce(async (query, page = 1) => {
    try {
      if (!query) return { results: [], page: 1, totalPages: 0 };
      
      const response = await MovieRepository.searchMovies(query, page);
      return {
        ...response,
        results: this.optimizeMovies(response.results.slice(0, 20))
      };
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }, 300);

  static async searchMovies(query, page = 1) {
    return this.debouncedSearch(query, page);
  }

  static async getFilteredMovies(filters) {
    try {
      const movies = await MovieRepository.getFilteredMovies(filters);
      return {
        trending: this.optimizeMovies(movies.slice(0, 8)),
        topRated: this.optimizeMovies(movies.slice(8, 16)),
        latest: this.optimizeMovies(movies.slice(16, 24))
      };
    } catch (error) {
      console.error('Error filtering movies:', error);
      throw error;
    }
  }

  // Tối ưu hóa dữ liệu phim
  static optimizeMovies(movies) {
    return movies.map(movie => ({
      ...movie,
      // Chỉ giữ lại các trường cần thiết
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average
    }));
  }
} 