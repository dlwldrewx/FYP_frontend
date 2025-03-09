/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*', // Matches API requests in the Next.js app
            destination: 'http://localhost:5000/api/:path*', // Redirects to the backend server
          },
        ];
      },
};

export default nextConfig;
