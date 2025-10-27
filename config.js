const basePath = process.env.BASE_PATH || '';

export const config = {
  name: process.env.REACT_APP_NAME || "Your Name",
  title: process.env.REACT_APP_TITLE || "Your Title",
  subtitle: process.env.REACT_APP_SUBTITLE || "Your Subtitle",
  description: process.env.REACT_APP_DESCRIPTION || "Your description",
  email: process.env.REACT_APP_EMAIL || "your.email@example.com",
  github: process.env.REACT_APP_GITHUB || "https://github.com/yourusername",
  linkedin:
    process.env.REACT_APP_LINKEDIN ||
    "https://www.linkedin.com/in/yourusername",
  profilePhotos: (
    process.env.REACT_APP_PROFILE_PHOTOS ||
    `01.jpeg,02.jpeg,03.jpeg,04.jpeg`
  ).split(","),
  githubUsername: process.env.REACT_APP_GITHUB_USERNAME || "yourgithubusername",
  basePath: basePath,
};
