/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
    domains: ['randomuser.me'],
  },
  //useFileSystemPublicRoutes: false,
}

module.exports = nextConfig
