import React, { useState, useEffect } from 'react';
import { config } from '../../config';

const Portfolio = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('stars');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const whitelistedRepos = [
          `${config.githubUsername}/dotfiles`,
          `${config.githubUsername}/simple-chatroom`,
          `${config.githubUsername}/aistudy-docs-crawler`,
          'Agast0/Hack-UTA-2025'
        ];

        const response = await fetch(`https://api.github.com/users/${config.githubUsername}/repos?sort=updated&per_page=50`);
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        
        const filteredRepos = data.filter(repo => {
          const fullName = repo.full_name;
          return repo.stargazers_count > 0 || whitelistedRepos.includes(fullName);
        });
        
        const externalRepos = whitelistedRepos.filter(repoName => {
          const isExternal = !repoName.startsWith(`${config.githubUsername}/`);
          return isExternal && !filteredRepos.some(r => r.full_name === repoName);
        });
        
        for (const repoName of externalRepos) {
          try {
            const repoData = await fetch(`https://api.github.com/repos/${repoName}`).then(r => r.json());
            if (repoData && !repoData.message) {
              filteredRepos.push(repoData);
            }
          } catch (e) {
            console.log(`Could not fetch ${repoName}`);
          }
        }
        
        setRepos(filteredRepos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const getLanguageColor = (language) => {
    const colors = {
      'JavaScript': '#f7df1e',
      'TypeScript': '#3178c6',
      'Python': '#3776ab',
      'Java': '#ed8b00',
      'C++': '#00599c',
      'React': '#61dafb',
      'HTML': '#e34c26',
      'CSS': '#1572b6',
      'Shell': '#89e051',
      'Other': '#6e7681'
    };
    return colors[language] || colors['Other'];
  };

  const sortRepositories = (repos, sortBy) => {
    const sortedRepos = [...repos];
    switch (sortBy) {
      case 'updated':
        return sortedRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      case 'stars':
        return sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      case 'name':
        return sortedRepos.sort((a, b) => a.name.localeCompare(b.name));
      case 'language':
        return sortedRepos.sort((a, b) => {
          const langA = a.language || 'Z';
          const langB = b.language || 'Z';
          return langA.localeCompare(langB);
        });
      default:
        return sortedRepos;
    }
  };

  const sortedRepos = sortRepositories(repos, sortBy);

  if (loading) {
    return (
      <div className="portfolio-section">
        <h1 className="section-title">Portfolio</h1>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading repositories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-section">
        <h1 className="section-title">Portfolio</h1>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="portfolio-section">
        <h1 className="section-title">Portfolio</h1>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>No starred repositories found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-section">
      <div className="portfolio-header">
        <h1 className="section-title">Portfolio</h1>
        <div className="sort-controls">
          <label htmlFor="sort-select">Sort by:</label>
          <select 
            id="sort-select"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="updated">Last Updated</option>
            <option value="stars">Star Count</option>
            <option value="name">Name</option>
            <option value="language">Language</option>
          </select>
        </div>
      </div>
      <div className="portfolio-grid">
        {sortedRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-item"
          >
            <div className="repo-header">
              <div>
                <h3>{repo.name}</h3>
                {repo.owner.login !== config.githubUsername && (
                  <p className="repo-owner">by {repo.owner.login}</p>
                )}
              </div>
              {repo.language && (
                <span 
                  className="repo-language"
                  style={{ 
                    background: getLanguageColor(repo.language) + '20',
                    color: getLanguageColor(repo.language)
                  }}
                >
                  {repo.language}
                </span>
              )}
            </div>
            <p className="repo-description">{repo.description || 'No description available'}</p>
            <div className="repo-meta">
              <span className="repo-stars">⭐ {repo.stargazers_count}</span>
              {repo.updated_at && (
                <span className="repo-updated">
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
