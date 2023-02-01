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
        hostname: "scontent.cdninstagram.com"
      },
      {
        hostname: "cdninstagram.com"
      },
      {
        hostname: "scontent-yyz1-1.cdninstagram.com"
      },
    ]
  }
}

module.exports = nextConfig
