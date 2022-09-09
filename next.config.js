/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs")

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["https://api.decentraland.org/"],
  },
}

const sentryWebpackPluginOptions = {
  silent: true,
  enabled: process.env.NEXT_PUBLIC_ENV === "prod",
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
