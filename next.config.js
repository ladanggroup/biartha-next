/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     runtime: 'experimental-edge',
    // },
    reactStrictMode: true,
    swcMinify: true,

    env: {
        appName: 'B`artha',
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
                source: '/hubungi-kami',
                destination: '/contact-us',
            },
            {
                source: '/pinjaman/buat-pengajuan',
                destination: '/loan/create',
            },
            {
                source: '/pinjaman/detail/:id',
                destination: '/loan/:id',
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
