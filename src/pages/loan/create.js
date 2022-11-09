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
                                <div>Buat Pengajuan Pinjaman</div>
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
                                            <li>
                                                <div class="flex items-center">
                                                    <svg
                                                        class="h-6 w-6 text-gray-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
                                                    <Link
                                                        href="/loan"
                                                        class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2">
                                                        Pinjaman
                                                    </Link>
                                                </div>
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
                                                        Buat Pengajuan
                                                    </span>
                                                </div>
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </h2>
                        }></AppLayout>
                </>
            )}
        </>
    )
}
