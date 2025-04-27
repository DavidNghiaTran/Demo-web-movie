import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovieController } from '../../application/controllers/MovieController';

export const MovieCard = ({ movie }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { handleMovieClick } = useMovieController();

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative group">
      <Link to={`/movie/${movie.id}`} onClick={() => handleMovieClick(movie.id)}>
        <div className="relative overflow-hidden rounded-lg">
          {!isImageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img
            src={imageError ? '/placeholder.jpg' : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
            className={`w-full h-auto transition-transform duration-300 group-hover:scale-105 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
        <div className="mt-2">
          <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
          <p className="text-xs text-gray-500">{movie.release_date?.split('-')[0]}</p>
        </div>
      </Link>
    </div>
  );
}; 