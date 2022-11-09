import AppLayout from '@/components/Layouts/AppLayout'
import LoadingUser from '@/components/LoadingUser'
import { useAuth } from '@/hooks/auth'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function register() {
    const { user } = useAuth({ middleware: 'auth' })
    return (
        <>
            {!user && <LoadingUser />}
            {user && (
                <>
                    <Head>
                        <title>{`${process.env.appName} - Pinjaman`}</title>
                    </Head>
                    <AppLayout
                        header={
                            <h2 className="flex justify-between text-xl font-semibold leading-tight text-gray-800">
                                <div>Kelola Akun</div>
                                <div>
                                    <nav
                                        className="flex"
                                        aria-label="Breadcrumb">
                                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                            <li className="inline-flex items-center">
                                                <Link
                                                    href="/dashboard"
                                                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                                    <svg
                                                        className="mr-2 h-4 w-4"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                                    </svg>
                                                    Home
                                                </Link>
                                            </li>
                                            <li aria-current="page">
                                                <div className="flex items-center">
                                                    <svg
                                                        className="h-6 w-6 text-gray-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                            clipRule="evenodd"></path>
                                                    </svg>
                                                    <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
                                                        Kelola Akun
                                                    </span>
                                                </div>
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </h2>
                        }>
                        <div className="py-12">
                            <div className="mx-auto flex max-w-7xl space-x-4 sm:px-6 lg:px-8">
                                <div className="h-fit w-96 overflow-hidden bg-[#20354b] shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm text-gray-400">
                                                2d ago
                                            </span>
                                            <span class="text-emerald-400">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="mx-auto mt-6 w-fit">
                                            <img
                                                src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
                                                class="w-28 rounded-full "
                                                alt="profile picture"
                                            />
                                        </div>
                                        <div class="mt-4 text-center">
                                            <h2 class="text-2xl font-bold tracking-wide text-white">
                                                {user?.name}
                                            </h2>
                                            <p class="mt-1.5 font-semibold text-gray-400">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex px-6 py-4">
                                        <button className="btn w-full text-center">
                                            Ubah Password
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full space-y-4">
                                    <div className="h-fit overflow-hidden rounded-lg bg-white shadow-sm">
                                        <div className="p-6">
                                            <div className="text-sm text-gray-600">
                                                Total tagihan{' '}
                                                <span className="text-secondary text-xl font-semibold">
                                                    Rp. 1.000.000
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AppLayout>
                </>
            )}
        </>
    )
}
