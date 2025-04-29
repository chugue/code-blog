/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Explicitly disable the App Router
  experimental: {
    appDir: false,
  },
  // Configure image domains
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  // Disable ESLint during builds for now
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during builds for now
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
