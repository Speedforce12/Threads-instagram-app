/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com", "res.cloudinary.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["cloudinary"],
  },
};

module.exports = nextConfig;
