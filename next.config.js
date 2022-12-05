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
                source: '/pinjaman/detail',
                destination: '/loan/detail',
            },
            {
                source: '/akun',
                destination: '/profile',
            },
            {
                source: '/akun/buat-data',
                destination: '/profile/create',
            },
        ]
    },
}

module.exports = nextConfig
