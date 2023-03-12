/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "randomuser.me"]
  },
  //useFileSystemPublicRoutes: false,
}

module.exports = nextConfig
