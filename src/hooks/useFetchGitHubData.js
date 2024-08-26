import { useState } from 'react';
import axios from 'axios';

const useFetchGitHubData = () => {
  const [repoInfo, setRepoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepo = async (repoUrl) => {
    setIsLoading(true);
    setError(null);
    try {
      const [owner, repo] = repoUrl.split('/').slice(-2);
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
      setRepoInfo(response.data);
    } catch (error) {
      setError('Error fetching GitHub data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadContent = async () => {
    if (!repoInfo) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3001/download-repo', {
        repoUrl: repoInfo.html_url
      }, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${repoInfo.name}_content.txt`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      setError('Error downloading repository content: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { repoInfo, fetchRepo, downloadContent, isLoading, error };
};

export default useFetchGitHubData;