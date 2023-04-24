/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {

    domains: ['res.cloudinary.com', 'randomuser.me','temporary.png', 'www.linkedin.com','media.licdn.com']

  },
    //useFileSystemPublicRoutes: false,
}

module.exports = nextConfig

