import { useState, useCallback } from 'react';
import { MovieService } from '../services/MovieService';
import { useNavigate } from 'react-router-dom';

export const useMovieController = () => {
  const [movies, setMovies] = useState({
    trending: [],
    topRated: [],
    latest: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchInitialMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await MovieService.getInitialMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchMovies = useCallback(async (query, page = 1) => {
    try {
      setLoading(true);
      setError(null);
      return await MovieService.searchMovies(query, page);
    } catch (err) {
      setError(err.message);
      return { results: [], page: 1, totalPages: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  const getMovieDetails = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      return await MovieService.getMovieDetails(id);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getFilteredMovies = useCallback(async (filters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await MovieService.getFilteredMovies(filters);
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleMovieClick = useCallback((id) => {
    navigate(`/movie/${id}`);
  }, [navigate]);

  return {
    movies,
    loading,
    error,
    fetchInitialMovies,
    searchMovies,
    getMovieDetails,
    getFilteredMovies,
    handleMovieClick
  };
}; 