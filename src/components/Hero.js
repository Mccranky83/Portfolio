import React, { useState, useEffect, useRef, useCallback } from "react";
import { config } from "../../config";

const Hero = ({ isLoading }) => {
  const profilePhotos = config.profilePhotos;

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLoopPaused, setIsLoopPaused] = useState(false);
  const intervalRef = useRef(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentPhotoIndex(
        (prevIndex) => (prevIndex + 1) % profilePhotos.length,
      );
    }, 3000);
  }, [profilePhotos.length]);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isLoopPaused) {
      startInterval();
    } else {
      stopInterval();
    }

    return () => {
      stopInterval();
    };
  }, [isLoading, isLoopPaused, startInterval, stopInterval]);

  const handleDotClick = (index) => {
    setCurrentPhotoIndex(index);
    if (!isLoopPaused) {
      startInterval();
    }
  };

  return (
    <div className={`hero-section ${isLoading ? "loading" : "loaded"}`}>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="text-line line-1">
              {config.name}
              <br />
              {config.title}
              <br />
              {config.subtitle}
            </span>
          </h1>
          <p className="hero-description">
            <span className="text-line line-2">{config.description}</span>
          </p>
          <div className="text-line line-3">
            <button
              className="cta-button"
              onClick={() => window.open(`mailto:${config.email}`, "_blank")}
            >
              Get in touch!
            </button>
          </div>
          <div className="hero-links">
            <p className="text-line line-4">
              Find me on{" "}
              <a href={config.github} className="link">
                GitHub
              </a>{" "}
              and{" "}
              <a href={config.linkedin} className="link">
                LinkedIn
              </a>
            </p>
            <p className="text-line line-5">
              <a
                href={`${config.basePath}/resume.pdf`}
                download
                className="link"
              >
                Download my resume
              </a>{" "}
              (PDF)
            </p>
          </div>
        </div>
      </div>
      <div className="hero-image">
        <img
          src={`${config.basePath}${profilePhotos[currentPhotoIndex]}`}
          alt="Profile"
          className="hero-image-photo"
        />
        <div className="photo-hud">
          <div className="hud-indicators">
            {profilePhotos.map((_, index) => (
              <button
                key={index}
                className={`hud-dot ${index === currentPhotoIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
          <button
            className="hud-play-pause"
            onClick={() => setIsLoopPaused(!isLoopPaused)}
            aria-label={isLoopPaused ? "Resume slideshow" : "Pause slideshow"}
          >
            {isLoopPaused ? "▶" : "⏸"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
