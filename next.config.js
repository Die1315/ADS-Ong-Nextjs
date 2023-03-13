/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'randomuser.me','temporary.png']
  },
  //useFileSystemPublicRoutes: false,
}

module.exports = nextConfig
