import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Hero from "./Hero";
import CV from "./CV";
import Portfolio from "./Portfolio";

const App = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "green";
  });

  const getThemeColor = (themeName) => {
    switch (themeName) {
      case "blue":
        return "#7FBBB3";
      case "red":
        return "#E67E80";
      default:
        return "#A7D9B5";
    }
  };

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
    } else {
      localStorage.removeItem("darkMode");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const color = getThemeColor(theme);
    document.documentElement.style.setProperty("--primary-color", color);
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    document.documentElement.style.setProperty("--primary-filter", `rgba(${r}, ${g}, ${b}, 0.4)`);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "about":
        return <Hero isLoading={isLoading} />;
      case "cv":
        return <CV />;
      case "portfolio":
        return <Portfolio />;
      default:
        return <Hero isLoading={isLoading} />;
    }
  };

  return (
    <div
      className={`app ${sidebarOpen ? "sidebar-open" : ""} ${darkMode ? "dark-mode" : ""}`}
    >
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        theme={theme}
        setTheme={setTheme}
      />
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default App;
