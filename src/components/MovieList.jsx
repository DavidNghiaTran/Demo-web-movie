import PropTypes from "prop-types";
import { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MovieContext } from "../context/MovieDetailContext";
import { FaStar } from "react-icons/fa";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const MovieList = ({ title, data }) => {
  const { handleVideoTrailer } = useContext(MovieContext);

  if (!data || data.length === 0) {
    return (
      <div className="my-10 px-10 max-w-full">
        <h2 className="text-xl uppercase mb-4">{title}</h2>
        <div className="text-center py-10 text-gray-400">
          Không có dữ liệu phim
        </div>
      </div>
    );
  }

  const CustomButtonGroup = ({ next, previous }) => {
    return (
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
        <button
          onClick={previous}
          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={next}
          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="my-10 px-10 max-w-full">
      <h2 className="text-xl uppercase mb-4">{title}</h2>
      <div className="relative">
        <Carousel
          responsive={responsive}
          draggable={false}
          customButtonGroup={<CustomButtonGroup />}
          renderButtonGroupOutside={true}
        >
          {data.map((movie) => (
            <div
              key={movie.id}
              className="group relative mx-2"
              onClick={() => handleVideoTrailer(movie.id)}
            >
              <div className="relative w-[200px] h-[300px] overflow-hidden rounded-lg">
                <img
                  src={movie.posterPath}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                  {movie.title || movie.name || movie.original_title}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    {movie.vote_average?.toFixed(1) || "N/A"}
                  </span>
                  <span>•</span>
                  <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
};

export default MovieList;
