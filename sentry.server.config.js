import * as Sentry from "@sentry/nextjs"

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn:
    SENTRY_DSN ||
    "https://730958d1b4114e55aba35d2f755bddca@o1365263.ingest.sentry.io/6660841",
  tracesSampleRate: 1.0,
})
