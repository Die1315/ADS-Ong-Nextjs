/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = {
        fs: false,
      };
  
      return config;
    }, 
 
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**',
      },
      { 
        protocol: 'https',
        hostname: 'www.linkedin.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ads-ong-nextjs.vercel.app',
        pathname: '/**',
      }
    ]
  },
    //useFileSystemPublicRoutes: false,
}

module.exports = nextConfig

