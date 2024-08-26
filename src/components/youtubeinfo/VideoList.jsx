import { useState } from 'react';
import PropTypes from 'prop-types';

function VideoList({ videos }) {
  const [selectedVideos, setSelectedVideos] = useState([]);

  const handleCheckboxChange = (videoId) => {
    setSelectedVideos(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleDownload = () => {
    // Implementar lógica de descarga de transcripciones
    console.log("Downloading transcriptions for:", selectedVideos);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Video List</h3>
      {videos.length > 0 ? (
        <div className="space-y-2">
          {videos.map(video => (
            <div key={video.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`video-${video.id}`}
                checked={selectedVideos.includes(video.id)}
                onChange={() => handleCheckboxChange(video.id)}
                className="form-checkbox"
              />
              <label htmlFor={`video-${video.id}`} className="cursor-pointer">
                {video.title}
              </label>
            </div>
          ))}
          <button 
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={selectedVideos.length === 0}
          >
            Download Selected Transcriptions
          </button>
        </div>
      ) : (
        <p>No videos available.</p>
      )}
    </div>
  );
}

VideoList.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VideoList;