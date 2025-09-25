/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000',
  },
  // Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig
