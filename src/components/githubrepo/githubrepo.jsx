import { useState } from 'react';
import useFetchGitHubData from '../../hooks/useFetchGitHubData';

function GitHubRepo() {
  const [repoUrl, setRepoUrl] = useState('');
  const { repoInfo, fetchRepo, downloadContent, isLoading, error } = useFetchGitHubData();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRepo(repoUrl);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">GitHub Repository Info</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Enter GitHub Repository URL"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Fetch Repo
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {repoInfo && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{repoInfo.name}</h3>
          <p>Owner: {repoInfo.owner.login}</p>
          <p>Stars: {repoInfo.stargazers_count}</p>
          <button 
            onClick={downloadContent}
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? 'Downloading...' : 'Download Repository Content'}
          </button>
        </div>
      )}
    </div>
  );
}

export default GitHubRepo;