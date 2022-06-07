/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    NEXT_PUBLIC_BACKEND_URL: "http://localhost:9998"
  }
}

module.exports = nextConfig
