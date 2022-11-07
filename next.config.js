/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    env: {
        appName: 'Bi`Artha',
    },

    images: {
        domains: [],
    },

    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: 'http://localhost:8000/:path*',
            },
        ]
    },
}

module.exports = nextConfig
