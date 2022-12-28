import AppLayout from '@/components/Layouts/AppLayout'
import Loading from '@/components/Loading'
import LoadingUser from '@/components/LoadingUser'
import { StatusWithIcon } from '@/components/Status'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function loan() {
    const { user } = useAuth({ middleware: 'auth' })
    const [loan, setLoan] = React.useState([])
    const [page, setPage] = React.useState({
        current_page: 1,
        from: '',
        last_page: '',
    })
    const [status, setStatus] = React.useState('')

    const [loading, setLoading] = React.useState(false)
    const getLoan = async () => {
        setLoading(true)
        const response = await axios({
            method: 'GET',
            url: '/api/loan?page=' + page.current_page + '&status=' + status,
        }).then(response => {
            setLoan(response.data.data)
            setLoading(false)
            setPage({
                ...page,
                from: response.data.paging.from,
                last_page: response.data.paging.last_page,
            })
        })
    }

    const nextPage = () => {
        setPage({
            ...page,
            current_page: page.current_page + 1,
        })
    }
    const prevPage = () => {
        if (page.current_page > 1) {
            setPage({
                ...page,
                current_page: page.current_page - 1,
            })
        }
    }

    useEffect(() => {
        getLoan()
    }, [page.current_page, status])

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
                                                        <button
                                                            onClick={() =>
                                                                setStatus('')
                                                            }
                                                            className={`${
                                                                status === ''
                                                                    ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                                                                    : ''
                                                            }inline-block p-4`}>
                                                            Semua
                                                        </button>
                                                    </li>
                                                    <li className="mr-2">
                                                        <button
                                                            onClick={() =>
                                                                setStatus(
                                                                    'LOAN_PROPOSED',
                                                                )
                                                            }
                                                            className={`${
                                                                status ===
                                                                'LOAN_PROPOSED'
                                                                    ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                                                                    : ''
                                                            }inline-block p-4`}>
                                                            Pengajuan
                                                        </button>
                                                    </li>
                                                    <li className="mr-2">
                                                        <button
                                                            onClick={() =>
                                                                setStatus(
                                                                    'LOAN_APPROVED',
                                                                )
                                                            }
                                                            className={`${
                                                                status ===
                                                                'LOAN_APPROVED'
                                                                    ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                                                                    : ''
                                                            }inline-block p-4`}>
                                                            Disetujui
                                                        </button>
                                                    </li>
                                                    <li className="mr-2">
                                                        <button
                                                            onClick={() =>
                                                                setStatus(
                                                                    'LOAN_RUNNING',
                                                                )
                                                            }
                                                            className={`${
                                                                status ===
                                                                'LOAN_RUNNING'
                                                                    ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                                                                    : ''
                                                            }inline-block p-4`}>
                                                            Berjalan
                                                        </button>
                                                    </li>
                                                    <li className="mr-2">
                                                        <button
                                                            onClick={() =>
                                                                setStatus(
                                                                    'LOAN_REJECTED',
                                                                )
                                                            }
                                                            className={`${
                                                                status ===
                                                                'LOAN_REJECTED'
                                                                    ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                                                                    : ''
                                                            }inline-block p-4`}>
                                                            Ditolak
                                                        </button>
                                                    </li>
                                                    <li className="mr-2">
                                                        <button
                                                            onClick={() =>
                                                                setStatus(
                                                                    'LOAN_PAYMENT_VERIFIED',
                                                                )
                                                            }
                                                            className={`${
                                                                status ===
                                                                'LOAN_PAYMENT_VERIFIED'
                                                                    ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                                                                    : ''
                                                            }inline-block p-4`}>
                                                            Lunas
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {loading ? (
                                        <Loading />
                                    ) : (
                                        <>
                                            {loan.length === 0 && notFound()}
                                            {loan.length !== 0 && (
                                                <>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {loan.map(
                                                            (item, index) => (
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
                                                                            <StatusWithIcon
                                                                                status={
                                                                                    item.status
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="text-sm text-gray-700">
                                                                            <div>
                                                                                Jatuh
                                                                                Tempo
                                                                                :{' '}
                                                                                <span className="text-primary">
                                                                                    {item.loan_end_date
                                                                                        ? item.loan_end_date
                                                                                        : '-'}
                                                                                </span>
                                                                            </div>
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
                                                                                        '/loan/create',
                                                                                    query: {
                                                                                        loan_id:
                                                                                            item.loan_id,
                                                                                    },
                                                                                }}
                                                                                className="block text-center border-primary text-primary hover:bg-primary mt-4 w-full rounded-md border-2 py-1 transition-all duration-300 hover:text-white">
                                                                                Upload
                                                                                File
                                                                            </Link>
                                                                        )}
                                                                        {item.status !==
                                                                            'LOAN_CREATED' && (
                                                                            <Link
                                                                                href={`/loan/${item.loan_id}`}
                                                                                className="block text-center border-primary text-primary hover:bg-primary mt-4 w-full rounded-md border-2 py-1 transition-all duration-300 hover:text-white">
                                                                                Lihat
                                                                                detail
                                                                            </Link>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                    <div className="flex justify-end">
                                                        {/* Previous Button */}
                                                        <button
                                                            onClick={() =>
                                                                prevPage()
                                                            }
                                                            disabled={
                                                                page.current_page ===
                                                                1
                                                                    ? true
                                                                    : false
                                                            }
                                                            className="disabled:invisible inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                            Halaman Sebelumnya
                                                        </button>
                                                        {/* Next Button */}
                                                        <button
                                                            onClick={() =>
                                                                nextPage()
                                                            }
                                                            disabled={
                                                                page.current_page ===
                                                                page.last_page
                                                                    ? true
                                                                    : false
                                                            }
                                                            className="disabled:invisible inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                            Halaman Selanjutnya
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </>
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
                                            href={'/loan/create'}
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
