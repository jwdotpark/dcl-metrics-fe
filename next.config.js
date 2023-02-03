/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["https://api.decentraland.org/", "picsum.photos"],
  },
  staticPageGenerationTimeout: 60000,
}

module.exports = nextConfig
