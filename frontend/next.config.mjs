/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
    removeConsole: false,
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiURL: process.env.NEXT_PUBLIC_API_URL_BASE,
  },
};

export default nextConfig;
