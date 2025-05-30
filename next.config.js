/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PROJECT_PASSWORD: process.env.PROJECT_PASSWORD,
    COOKIE_NAME:       process.env.COOKIE_NAME,
    COOKIE_MAX_AGE:    process.env.COOKIE_MAX_AGE,
  },
};

module.exports = nextConfig;

