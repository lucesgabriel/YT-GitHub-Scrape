import { useState, useEffect } from 'react';
import axios from 'axios';

const CLIENT_ID = '327106431735-e8ejut59in4suotd9l8gg3jneci3qcuq.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:5173/oauth2callback';

const useFetchYouTubeData = () => {
  const [channelInfo, setChannelInfo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('youtube_token');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const authorize = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent('https://www.googleapis.com/auth/youtube.force-ssl')}`;
    window.location = authUrl;
  };

  const handleAuthCallback = () => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    if (token) {
      setAccessToken(token);
      localStorage.setItem('youtube_token', token);
    } else {
      const errorMessage = params.get('error');
      setError(`Authentication failed: ${errorMessage || 'Unknown error'}`);
    }
  };

  const fetchData = async (channelId) => {
    if (!accessToken) {
      setError('Not authorized. Please login first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch channel info
      const channelResponse = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
        params: {
          part: 'snippet,statistics',
          id: channelId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (channelResponse.data.items.length > 0) {
        setChannelInfo({
          title: channelResponse.data.items[0].snippet.title,
          subscriberCount: channelResponse.data.items[0].statistics.subscriberCount,
        });

        // Fetch videos
        const videosResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: 'snippet',
            channelId: channelId,
            type: 'video',
            maxResults: 50,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setVideos(videosResponse.data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
        })));
      } else {
        setError('No channel found with the provided ID.');
      }
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Error ${error.response.status}: ${error.response.data.error.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response received from YouTube API. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error fetching YouTube data: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('youtube_token');
    setAccessToken(null);
    setChannelInfo(null);
    setVideos([]);
  };

  return { 
    channelInfo, 
    videos, 
    fetchData, 
    isLoading, 
    error, 
    authorize, 
    handleAuthCallback,
    isAuthorized: !!accessToken,
    logout
  };
};

export default useFetchYouTubeData;