import AppLayout from '@/components/Layouts/AppLayout'
import LoadingUser from '@/components/LoadingUser'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function loan() {
    const { user } = useAuth({ middleware: 'auth' })
    const [loan, setLoan] = React.useState([])

    const getLoan = async () => {
        const response = await axios({
            method: 'GET',
            url: '/api/loan',
        }).then(response => {
            setLoan(response.data.data)
        })
    }

    useEffect(() => {
        getLoan()
    }, [])

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
                                <div>Pinjaman</div>
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
                                                        Pinjaman
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
                                <div className="w-full space-y-4">
                                    <div className="h-fit overflow-hidden rounded-lg bg-white shadow-sm">
                                        <div className="px-4 pt-4">
                                            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                                                <ul className="flex flex-wrap -mb-px">
                                                    <li className="mr-2">
                                                        <a
                                                            href="#"
                                                            className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500">
                                                            Semua
                                                        </a>
                                                    </li>
                                                    <li className="mr-2">
                                                        <a
                                                            href="#"
                                                            className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                                            aria-current="page">
                                                            Pengajuan
                                                        </a>
                                                    </li>
                                                    <li className="mr-2">
                                                        <a
                                                            href="#"
                                                            className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                                            Disetujui
                                                        </a>
                                                    </li>
                                                    <li className="mr-2">
                                                        <a
                                                            href="#"
                                                            className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                                            Ditolak
                                                        </a>
                                                    </li>
                                                    <li className="mr-2">
                                                        <a
                                                            href="#"
                                                            className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                                            Lunas
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {loan.length === 0 && notFound()}
                                    {loan.length !== 0 && (
                                        <div className="grid grid-cols-2 gap-4">
                                            {loan.map((item, index) => (
                                                <div
                                                    className="h-fit w-full bg-white shadow-sm sm:rounded-lg"
                                                    key={index}>
                                                    <div className="p-6">
                                                        <div className="flex justify-between">
                                                            <div className="text-gray-800">
                                                                Tagihan{' '}
                                                                <span className="font-semibold">
                                                                    {' '}
                                                                    No.{' '}
                                                                    {
                                                                        item.loan_number
                                                                    }
                                                                </span>
                                                            </div>
                                                            {item.status ===
                                                                'LOAN_CREATED' && (
                                                                <div className="text-sm text-gray-600">
                                                                    Belum
                                                                    Diajukan
                                                                </div>
                                                            )}

                                                            {item.status ===
                                                                'LOAN_PROPOSED' && (
                                                                <div className="flex space-x-1 text-sm text-gray-600">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                            1.5
                                                                        }
                                                                        stroke="currentColor"
                                                                        className="w-5 h-5">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                        />
                                                                    </svg>
                                                                    <div>
                                                                        Pengajuan
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {item.status ===
                                                                'LOAN_APPROVED' && (
                                                                <div className="flex space-x-1 text-sm text-gray-600">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                            1.5
                                                                        }
                                                                        stroke="currentColor"
                                                                        className="w-5 h-5">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                                                                        />
                                                                    </svg>

                                                                    <div>
                                                                        Disetujui
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {item.status ===
                                                                'LOAN_WAITING_TRANSFERED' && (
                                                                <div className="flex space-x-1 text-sm text-gray-600">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                            1.5
                                                                        }
                                                                        stroke="currentColor"
                                                                        className="w-5 h-5">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                        />
                                                                    </svg>

                                                                    <div>
                                                                        PENCARIAN
                                                                        DANA
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {item.status ===
                                                                'LOAN_RUNNING' && (
                                                                <div className="flex space-x-1 text-sm text-gray-600">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                            1.5
                                                                        }
                                                                        stroke="currentColor"
                                                                        className="w-5 h-5">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                                                        />
                                                                    </svg>

                                                                    <div>
                                                                        Masa
                                                                        Pinjaman
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {item.status ===
                                                                'LOAN_PAYMENT_VERIFY' && (
                                                                <div className="flex space-x-1 text-sm text-gray-600">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                            1.5
                                                                        }
                                                                        stroke="currentColor"
                                                                        className="w-5 h-5">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                                                                        />
                                                                    </svg>

                                                                    <div>
                                                                        Verifikasi
                                                                        Pembayaran
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {item.status ===
                                                                'PAID' && (
                                                                <div className="flex space-x-1 text-sm text-green-500">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                        stroke="currentColor"
                                                                        className="h-5 w-5">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                        />
                                                                    </svg>

                                                                    <div>
                                                                        Lunas
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-gray-700">
                                                            Mulai Pinjaman :{' '}
                                                            <span className="text-primary">
                                                                {item.loan_date
                                                                    ? item.loan_date
                                                                    : '-'}
                                                            </span>
                                                            <div className="text-secondary my-2 text-xl font-semibold">
                                                                {item.loan_value
                                                                    ? 'Rp. ' +
                                                                      item.loan_value.toLocaleString()
                                                                    : 'Menunggu konfirmasi'}
                                                            </div>
                                                        </div>
                                                        {item.status ===
                                                            'LOAN_CREATED' && (
                                                            <Link
                                                                href={{
                                                                    pathname:
                                                                        '/pinjaman/buat-pengajuan',
                                                                    query: {
                                                                        loan_id:
                                                                            item.loan_id,
                                                                    },
                                                                }}
                                                                className="block text-center border-primary text-primary hover:bg-primary mt-4 w-full rounded-md border-2 py-1 transition-all duration-300 hover:text-white">
                                                                Upload File
                                                            </Link>
                                                        )}
                                                        {item.status !==
                                                            'LOAN_CREATED' && (
                                                            <Link
                                                                href={{
                                                                    pathname:
                                                                        '/pinjaman/detail/',
                                                                    query: {
                                                                        loan_id:
                                                                            item.loan_id,
                                                                    },
                                                                }}
                                                                className="block text-center border-primary text-primary hover:bg-primary mt-4 w-full rounded-md border-2 py-1 transition-all duration-300 hover:text-white">
                                                                Lihat detail
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="h-fit w-96 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    {/* <div className="bg-orange-600 p-6 text-center">
                                        <div className="text-sm text-gray-100">
                                            Sisa Kredit Pinjaman Kamu
                                        </div>
                                        <div className="text-2xl font-semibold text-white">
                                            <span className="text-sm">Rp.</span>{' '}
                                            100.000.000.000
                                        </div>
                                        <div className="text-xs font-normal text-gray-300">
                                            Total Kredit Rp. 100.000.000.000
                                        </div>
                                    </div> */}
                                    <div className="flex px-6 py-4">
                                        <Link
                                            href={'/pinjaman/buat-pengajuan'}
                                            className="btn w-full text-center">
                                            Ajukan Pinjaman
                                        </Link>
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

function notFound() {
    return (
        <div className="text-center text-gray-500">
            Anda belum memiliki riwayat pinjaman.
        </div>
    )
}
