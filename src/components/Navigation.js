import React, { useState } from 'react';

const Navigation = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen, darkMode, setDarkMode, theme, setTheme }) => {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const navItems = [
    { id: 'about', label: 'About Me', icon: 'nf-fa-user' },
    { id: 'cv', label: 'CV', icon: 'nf-md-file_document' },
    { id: 'portfolio', label: 'Portfolio', icon: 'nf-oct-git_branch' }
  ];

  return (
    <>
      {activeSection !== 'about' && (
        <>
          <div className={`theme-selector ${themeMenuOpen ? 'open' : ''}`}>
            <button 
              className="theme-menu-toggle"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              aria-label="Theme selector"
            >
              <div className="theme-current" style={{ background: theme === 'green' ? '#A7D9B5' : theme === 'blue' ? '#7FBBB3' : '#E67E80' }}></div>
            </button>
            <div className="theme-options">
              <button 
                className={`theme-btn ${theme === 'green' ? 'active' : ''}`}
                onClick={() => { setTheme('green'); setThemeMenuOpen(false); }}
                aria-label="Green theme"
                title="Green theme"
              />
              <button 
                className={`theme-btn ${theme === 'blue' ? 'active' : ''}`}
                onClick={() => { setTheme('blue'); setThemeMenuOpen(false); }}
                aria-label="Blue theme"
                title="Blue theme"
              />
              <button 
                className={`theme-btn ${theme === 'red' ? 'active' : ''}`}
                onClick={() => { setTheme('red'); setThemeMenuOpen(false); }}
                aria-label="Red theme"
                title="Red theme"
              />
            </div>
          </div>
          <button 
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            <span className={darkMode ? 'nf-md-white_balance_sunny' : 'nf-oct-moon'}></span>
          </button>
        </>
      )}

      <button 
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <nav className={`navigation ${sidebarOpen ? 'open' : ''}`}>
        <div className="nav-main">
          <ul className="nav-list">
            {navItems.map(item => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <span className={`nav-icon ${item.icon}`}></span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
