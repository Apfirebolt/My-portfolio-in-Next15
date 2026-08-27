/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '4kwallpapers.com',
        pathname: '/**',
      },
      // You can also add softgenie.org here if you load API images from it:
      {
        protocol: 'https',
        hostname: 'softgenie.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;