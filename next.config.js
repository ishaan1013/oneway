/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "platform-lookaside.fbsbx.com"
      },
      {
        hostname: "**.cdninstagram.com"
      }
    ]
  }
}

module.exports = nextConfig
