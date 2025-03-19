import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { MovieContext } from "../context/MovieDetailContext";
import { FaStar } from "react-icons/fa";

const MovieSearch = ({ data, onLoadMore }) => {
  const { handleVideoTrailer } = useContext(MovieContext);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    setLoading(true);
    await onLoadMore();
    setLoading(false);
  };

  if (!data || data.length === 0) {
    return (
      <div className="my-10 px-10 max-w-full">
        <h2 className="text-xl uppercase mb-4">Kết quả tìm kiếm</h2>
        <div className="text-center py-10 text-gray-400">
          Không tìm thấy kết quả nào phù hợp
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 px-10 max-w-full">
      <h2 className="text-xl uppercase mb-4">Kết quả tìm kiếm</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="group relative"
            onClick={() => handleVideoTrailer(item.id)}
          >
            <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg">
              <img
                src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                {item.title || item.name || item.original_title}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  {item.vote_average?.toFixed(1) || "N/A"}
                </span>
                <span>•</span>
                <span>{item.release_date?.split("-")[0] || "N/A"}</span>
              </div>
              <p className="text-xs mt-2 line-clamp-2 opacity-80">
                {item.overview || "Chưa có mô tả"}
              </p>
            </div>
          </div>
        ))}
      </div>
      {onLoadMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang tải...
              </>
            ) : (
              "Tải thêm"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

MovieSearch.propTypes = {
  data: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func,
};

export default MovieSearch;
