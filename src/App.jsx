import { useState } from 'react';
import YouTubeInfo from './components/YouTubeInfo/YouTubeInfo';
import GitHubRepo from './components/GitHubRepo/GitHubRepo';

function App() {
  const [activeTab, setActiveTab] = useState('youtube');

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-3xl font-bold mb-5 text-center">YouTube and GitHub Info Fetcher</h1>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('youtube')}
              className={`px-4 py-2 rounded-full ${
                activeTab === 'youtube'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition duration-300 ease-in-out`}
            >
              YouTube
            </button>
            <button
              onClick={() => setActiveTab('github')}
              className={`px-4 py-2 rounded-full ${
                activeTab === 'github'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition duration-300 ease-in-out`}
            >
              GitHub
            </button>
          </div>
          
          <div className="transition-opacity duration-300 ease-in-out">
            {activeTab === 'youtube' ? <YouTubeInfo /> : <GitHubRepo />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
