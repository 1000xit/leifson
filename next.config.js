/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  images: {
    domains: ['i.scdn.co'], // For Spotify images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '**',
      },
    ],
  },
  // Enable if you have SPA-like routing needs
  // trailingSlash: true,
};

module.exports = nextConfig; 