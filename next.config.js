//import externalLinks from "remark-external-links"
//import smartypants from "remark-smartypants"
//import remarkGfm from "remark-gfm"

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  swcMinify: true,
  images: {
    domains: ["https://api.decentraland.org/", "picsum.photos"],
  },
  staticPageGenerationTimeout: 60000,
}

module.exports = withMDX(nextConfig)
