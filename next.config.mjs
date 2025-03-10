/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*', // Matches API requests in the Next.js app
            destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`, // Redirects to the backend server
          },
        ];
      },
};

export default nextConfig;
