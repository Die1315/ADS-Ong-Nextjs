/** @type {import('next').NextConfig} */

const nextConfig = {
  useFileSystemPublicRoutes: true,
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
      },
      {
        protocol: 'https',
        hostname: 'ads-ong-nextjs-production.up.railway.app',
        pathname: '/**',
      }
    ]
  },
};

module.exports = nextConfig;
