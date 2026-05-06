import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.50.220'],
  turbopack: false,
  output: 'standalone',
};

export default withMDX(config);
