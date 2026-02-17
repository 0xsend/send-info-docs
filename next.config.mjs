import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/docs/features/send-checks',
        destination: '/docs/features/send-links',
        permanent: true,
      },
    ];
  },
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
