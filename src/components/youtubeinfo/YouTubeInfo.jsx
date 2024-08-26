import { useState, useEffect } from 'react';
import useFetchYouTubeData from '../../hooks/useFetchYouTubeData';
import VideoList from './VideoList';

function YouTubeInfo() {
  const [channelId, setChannelId] = useState('');
  const { channelInfo, videos, fetchData, isLoading, error, authorize, handleAuthCallback } = useFetchYouTubeData();

  useEffect(() => {
    if (window.location.hash) {
      handleAuthCallback();
    }
  }, [handleAuthCallback]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(channelId);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">YouTube Channel Info</h2>
      <button onClick={authorize} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
        Authorize YouTube
      </button>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
          placeholder="Enter YouTube Channel ID"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600">
          Fetch Info
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {channelInfo && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{channelInfo.title}</h3>
          <p>Subscribers: {channelInfo.subscriberCount}</p>
        </div>
      )}
      {videos.length > 0 && <VideoList videos={videos} />}
    </div>
  );
}

export default YouTubeInfo;