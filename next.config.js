/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  //useFileSystemPublicRoutes: false,
}

module.exports = nextConfig
