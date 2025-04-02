import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
    onSearch('');
    setSearch('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <div className="p-4 flex justify-between fixed top-0 left-0 w-full z-[9999] bg-black">
      <div className="flex items-center gap-8">
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200" 
          onClick={handleHomeClick}
        >
          <span className="text-red-700 text-2xl font-bold">Movie</span>
        </div>
        <nav className="hidden md:flex items-center space-x-5">
          <a href="#" className="hover:text-red-700">
            Home
          </a>
          <a href="#" className="hover:text-red-700">
            About
          </a>
          <a href="#" className="hover:text-red-700">
            Contact
          </a>
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="w-[500px]">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-white text-black border border-gray-600 rounded-full px-4 py-2 outline-none focus:border-white"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;