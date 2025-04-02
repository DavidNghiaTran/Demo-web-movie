import { useState } from 'react';
import PropTypes from 'prop-types';

const VideoUpload = ({ onUpload }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('title', title);
      formData.append('description', description);

      // Thay YOUR_API_ENDPOINT bằng URL thực tế
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onUpload(data);
      
      // Reset form
      setVideoFile(null);
      setTitle('');
      setDescription('');
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tải video. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Đăng tải Video</h2>
      
      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2">Chọn Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2">Tiêu đề</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 h-32"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded ${
            loading
              ? 'bg-gray-500'
              : 'bg-red-700 hover:bg-red-800'
          } text-white font-bold transition-colors`}
        >
          {loading ? 'Đang tải lên...' : 'Đăng tải'}
        </button>
      </form>
    </div>
  );
};

VideoUpload.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default VideoUpload; 