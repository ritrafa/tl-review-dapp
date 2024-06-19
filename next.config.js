/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_TL_API: process.env.NEXT_PUBLIC_TL_API,
  },
}

module.exports = nextConfig
