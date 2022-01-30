/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    JWTSecret: process.env.JWT_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    staticFolder: "/static",
  },
};

module.exports = nextConfig;
