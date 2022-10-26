/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["https://api.decentraland.org/"],
  },
}

module.exports = nextConfig
