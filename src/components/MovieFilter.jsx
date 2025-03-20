import { useState } from 'react';

const MovieFilter = ({ onFilterChange }) => {
  const [genre, setGenre] = useState('all');
  const [country, setCountry] = useState('all');
  const [year, setYear] = useState('all');

  const genres = [
    { id: 'all', name: 'Tất cả' },
    { id: 28, name: 'Hành động' },
    { id: 35, name: 'Hài' },
    { id: 18, name: 'Chính kịch' },
    { id: 27, name: 'Kinh dị' },
    { id: 10749, name: 'Lãng mạn' },
    { id: 878, name: 'Khoa học viễn tưởng' },
    { id: 53, name: 'Giật gân' },
  ];

  const countries = [
    { id: 'all', name: 'Tất cả' },
    { id: 'US', name: 'Mỹ' },
    { id: 'KR', name: 'Hàn Quốc' },
    { id: 'JP', name: 'Nhật Bản' },
    { id: 'CN', name: 'Trung Quốc' },
    { id: 'TH', name: 'Thái Lan' },
    { id: 'VN', name: 'Việt Nam' },
  ];

  const years = [
    { id: 'all', name: 'Tất cả' },
    ...Array.from({ length: 25 }, (_, i) => ({
      id: 2024 - i,
      name: `${2024 - i}`
    }))
  ];

  const handleFilterChange = (type, value) => {
    if (type === 'genre') setGenre(value);
    if (type === 'country') setCountry(value);
    if (type === 'year') setYear(value);
    onFilterChange({ genre, country, year: value });
  };

  return (
    <div className="px-4 py-6 bg-gray-900">
      <div className="container mx-auto flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-white">Thể loại:</span>
          <select 
            value={genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            className="bg-gray-800 text-white px-3 py-1 rounded-md"
          >
            {genres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white">Quốc gia:</span>
          <select 
            value={country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="bg-gray-800 text-white px-3 py-1 rounded-md"
          >
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white">Năm:</span>
          <select 
            value={year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
            className="bg-gray-800 text-white px-3 py-1 rounded-md"
          >
            {years.map((y) => (
              <option key={y.id} value={y.id}>{y.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MovieFilter; 