/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  typedRoutes: false,
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
