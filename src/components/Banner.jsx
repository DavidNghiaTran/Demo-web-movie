import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import IconRatingHalf from "../assets/rating-half.png";
import IconRating from "../assets/rating.png";
import ImgMovie from "../assets/temp-1.jpeg";
import IconPlay from "../assets/play-button.png";

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchRandomMovie = async () => {
    try {
      const url = "https://api.themoviedb.org/3/trending/movie/day?language=vi";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      
      // Chọn ngẫu nhiên một phim từ danh sách
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setMovie(data.results[randomIndex]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMovie();

    // Thay đổi phim mỗi 1 phút (60000ms)
    const interval = setInterval(() => {
      fetchRandomMovie();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleWatchNow = () => {
    setShowModal(true);
  };

  if (loading || !movie) return null;

  return (
    <>
      <div className="h-[600px] w-full relative mb-10 mt-16">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-10 left-0 right-0 p-6 z-20">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg max-w-2xl line-clamp-3 mb-6">{movie.overview}</p>
          <div className="flex items-center gap-6">
            <button
              onClick={handleWatchNow}
              className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
            >
              <svg 
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
              Xem ngay
            </button>
            <div className="flex items-center gap-4">
              <span className="bg-black/50 px-3 py-1 rounded">
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="bg-black/50 px-3 py-1 rounded">
                {movie.vote_average.toFixed(1)} ⭐
              </span>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <button 
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 right-4 text-white hover:text-red-700 transition-colors duration-200 z-[60]"
          >
            <svg 
              className="w-10 h-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>

          <div 
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.2embed.cc/embed/${movie.id}`}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              title={movie.title}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;