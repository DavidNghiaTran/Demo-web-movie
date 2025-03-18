import { useEffect } from "react";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import { useState } from "react";
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieDetailContext";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (value) => {
    setSearchQuery(value);
    setSearchPage(1);
    setHasMore(true);
    if (value === "") return setSearchData([]);
    
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=vi&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchData(data.results);
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = async () => {
    if (!hasMore || !searchQuery) return;
    
    const nextPage = searchPage + 1;
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=vi&page=${nextPage}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchData(prev => [...prev, ...data.results]);
      setSearchPage(nextPage);
      setHasMore(nextPage < data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      const urls = [
        "https://api.themoviedb.org/3/trending/movie/day?language=vi",
        "https://api.themoviedb.org/3/movie/top_rated?language=vi",
        "https://api.themoviedb.org/3/movie/now_playing?language=vi",
      ];
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const fetchMovies = async (url) => {
        return await fetch(url, options).then((response) => response.json());
      };

      try {
        const response = await Promise.all(urls.map(fetchMovies));

        setTrendingMovies(response[0].results);
        setTopRatedMovies(response[1].results);
        setLatestMovies(response[2].results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <MovieProvider>
        <div className="h-full bg-black text-white min-h-screen pb-10 relative">
          <Header onSearch={handleSearch} />
          <Banner />
          {searchData.length === 0 && (
            <MovieList title="Phim Hot" data={trendingMovies.slice(0, 10)} />
          )}
          {searchData.length === 0 && (
            <MovieList title="Phim lẻ mới cập nhật" data={latestMovies.slice(0, 10)} />
          )}
          {searchData.length === 0 && (
            <MovieList title="Phim đề cử" data={topRatedMovies.slice(0, 10)} />
          )}

          {searchData.length > 0 && (
            <MovieSearch 
              data={searchData} 
              onLoadMore={hasMore ? handleLoadMore : undefined}
            />
          )}
        </div>
      </MovieProvider>
    </>
  );
}

export default App; 