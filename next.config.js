/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs")
import { BrowserTracing } from "@sentry/tracing"

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
  integrations: [new BrowserTracing({ tracingOrigins: ["*"] })],
  enabled: process.env.NEXT_PUBLIC_ENV === "prod",
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
