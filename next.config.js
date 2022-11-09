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
            // {
            //     source: '/:path*',
            //     destination: 'http://localhost:8000/:path*',
            // },
            {
                source: '/pinjaman',
                destination: '/loan',
            },
            {
                source: '/pinjaman/buat-pengajuan',
                destination: '/loan/create',
            },
            {
                source: '/akun',
                destination: '/profile',
            },
        ]
    },
}

module.exports = nextConfig
