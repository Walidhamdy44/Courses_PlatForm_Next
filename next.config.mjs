/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["utfs.io", "images.unsplash.com", "img.clerk.com"], // Add the domain here
  },
};

export default nextConfig;
