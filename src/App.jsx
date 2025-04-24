import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import MovieFilter from "./components/MovieFilter";
import { MovieProvider } from "./context/MovieDetailContext";
import { MovieService } from "./services/MovieService";

function App() {
  const [movies, setMovies] = useState({
    trending: [],
    topRated: [],
    latest: []
  });
  const [searchData, setSearchData] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (value) => {
    setSearchQuery(value);
    setSearchPage(1);
    setHasMore(true);
    
    try {
      const response = await MovieService.searchMovies(value);
      setSearchData(response.results);
      setHasMore(response.page < response.totalPages);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleLoadMore = async () => {
    if (!hasMore || !searchQuery) return;
    
    try {
      const nextPage = searchPage + 1;
      const response = await MovieService.searchMovies(searchQuery, nextPage);
      setSearchData(prev => [...prev, ...response.results]);
      setSearchPage(nextPage);
      setHasMore(nextPage < response.totalPages);
    } catch (error) {
      console.error('Load more error:', error);
    }
  };

  const handleFilter = async (filters) => {
    try {
      const filteredMovies = await MovieService.getFilteredMovies(filters);
      setMovies(filteredMovies);
    } catch (error) {
      console.error('Filter error:', error);
    }
  };

  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        const initialMovies = await MovieService.getInitialMovies();
        setMovies(initialMovies);
      } catch (error) {
        console.error('Initial fetch error:', error);
      }
    };

    fetchInitialMovies();
  }, []);

  return (
    <>
      <MovieProvider>
        <div className="h-full bg-black text-white min-h-screen pb-10 relative">
          <Header onSearch={handleSearch} />
          <Banner />
          
          {searchData.length === 0 && (
            <MovieFilter onFilterChange={handleFilter} />
          )}

          {searchData.length === 0 && (
            <MovieList 
              title="Phim Hot" 
              data={movies.trending} 
            />
          )}
          
          {searchData.length === 0 && (
            <MovieList 
              title="Phim đề cử" 
              data={movies.topRated} 
            />
          )}
          
          {searchData.length === 0 && (
            <MovieList 
              title="Phim lẻ mới cập nhật" 
              data={movies.latest} 
            />
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