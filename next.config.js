/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs")

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://api.decentraland.org/"],
  },
}

const sampleRate = process.env.NEXT_PUBLIC_TRACE_SAMPLE_RATE
const sentryWebpackPluginOptions = {
  silent: true,
  traceSampleRate: sampleRate,
  // FIXME possibly dcl-metrics.com only later
  enabled: process.env.NEXT_PUBLIC_ENV === "prod",
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
