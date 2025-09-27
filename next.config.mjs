import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['nextra/components'] = path.join(process.cwd(), 'components/mdx/nextra.js');
    return config;
  }
};

export default nextConfig;
