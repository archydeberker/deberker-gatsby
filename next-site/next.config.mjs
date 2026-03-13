import path from 'node:path';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\\.mdx?$/,
});

const nextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  outputFileTracingRoot: path.join(process.cwd(), '..'),
  images: {
    unoptimized: true,
  },
};

export default withMDX(nextConfig);
