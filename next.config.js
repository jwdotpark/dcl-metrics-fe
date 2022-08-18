/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs")

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://api.decentraland.org/"],
  },
}

const sentryWebpackPluginOptions = {
  silent: true,
  traceSampleRate: 0.5,
  // FIXME possibly dcl-metrics.com only later
  enabled: process.env.NEXT_PUBLIC_ENV === "prod",
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
