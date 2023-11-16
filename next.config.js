/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  appDir: true,
  images: {
    domains: ['source.unsplash.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
