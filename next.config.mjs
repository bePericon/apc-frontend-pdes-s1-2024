/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  compiler: {
    styledComponents: true,
    removeConsole: false,
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiURL: process.env.NEXT_PUBLIC_API_URL_BASE,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'http2.mlstatic.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
