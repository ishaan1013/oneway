/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "platform-lookaside.fbsbx.com"
      }
    ]
  }
}

module.exports = nextConfig
