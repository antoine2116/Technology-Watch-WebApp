/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // For Google's favicon service
      {
        protocol: 'https',
        hostname: 's2.googleusercontent.com',
        port: '',
        pathname: '/s2/favicons/**',
      },
    ],
  },

}

module.exports = nextConfig
