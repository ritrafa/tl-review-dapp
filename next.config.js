const { createProxyMiddleware } = require('http-proxy-middleware');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_TL_API: process.env.NEXT_PUBLIC_TL_API,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tiplink.io/api/:path*', // Proxy to the external API
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && isServer) {
      const express = require('express');
      const app = express();
      app.use(
        '/api',
        createProxyMiddleware({
          target: 'https://tiplink.io',
          changeOrigin: true,
          pathRewrite: { '^/api': '/api' },
          headers: {
            'Access-Control-Allow-Headers': 'Authorization, Content-Type',
          },
        })
      );
      app.listen(3000); // Start the express server
    }
    return config;
  },
};

module.exports = nextConfig;
