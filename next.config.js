/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["socodigital.com"],
  },
  experimental: {
    serverActions: true,
  },
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};

module.exports = nextConfig;
