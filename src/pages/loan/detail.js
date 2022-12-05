import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function show() {
    const [loan, setLoan] = React.useState([])
    const [document, setDocument] = React.useState([])

    const router = useRouter()
    const { loan_id } = router.query

    const getLoan = async () => {
        const res = await axios({
            method: 'GET',
            url: `/admin/loan/${loan_id}`,
        }).then(res => {
            setLoan(res.data.data.loan)
            setDocument(res.data.data.loan_document)
        })
    }

    useEffect(() => {
        if (!router.isReady) return
        getLoan()
    }, [router.isReady])
    return (
        <div>
            <Head>
                <title>{`${process.env.appName} - Pinjaman`}</title>
            </Head>
            <AppLayout
                header={
                    <h2 className="flex justify-between text-xl font-semibold leading-tight text-gray-800">
                        <div>Pinjaman</div>
                        <div>
                            <nav className="flex" aria-label="Breadcrumb">
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
                <div className="py-12 mx-auto flex max-w-7xl space-x-4 sm:px-6 lg:px-8">
                    <div className="w-full">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div>
                                <div>
                                    Detail Pinjaman :{' '}
                                    <span className="font-semibold">
                                        {' '}
                                        {loan.loan_number} (
                                        {loan.status === 'PROCCESS' &&
                                            'Pengajuan'}
                                        )
                                    </span>
                                </div>
                            </div>

                            {loan.status === 'LOAN_APPROVED' && (
                                <div className="mt-4 text-blue-800 bg-blue-50 p-4">
                                    <div>
                                        Pinjaman : Rp.{' '}
                                        <span className="font-semibold">
                                            {' '}
                                            {loan.loan_value?.toLocaleString()}
                                        </span>
                                    </div>
                                    <div>
                                        Bunga : Rp.
                                        {loan.loan_interest?.toLocaleString()} (
                                        {loan.interest_percentage}%)
                                    </div>
                                    <div>
                                        Biaya Admin : Rp.{' '}
                                        {loan.handling_fee?.toLocaleString()}
                                    </div>
                                    <div>Tenor : {loan.tenor} Hari</div>
                                </div>
                            )}

                            <div className="mt-4 text-gray-600">
                                <div>
                                    PIC :{' '}
                                    <span className="font-semibold">
                                        {loan.pic_name}
                                    </span>
                                </div>
                                <div>Telp : {loan.pic_phone}</div>
                                <div>Position : {loan.pic_position}</div>
                            </div>

                            <div className="mt-4 text-gray-600">
                                <div className="">
                                    Nama Proyek :{' '}
                                    <span className="font-semibold">
                                        {loan.contract_name}
                                    </span>
                                </div>
                                <div className="">
                                    Nomor Kontrak : {loan.contract_number}
                                </div>
                                <div className="">
                                    Tanggal Kontrak : {loan.contract_start}{' '}
                                    sampai {loan.contract_end}
                                </div>
                                <div className="">
                                    Nilai Kontrak : Rp. {loan.contract_value}
                                </div>
                            </div>

                            <div className="mt-4 text-gray-600">
                                <div>Dokumen Kontrak :</div>
                                <div className="grid grid-cols-2 gap-2">
                                    {document.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.file_doc}
                                            target="_blank"
                                            className="flex space-x-2 px-2 py-1 bg-blue-50 w-fit rounded-full items-center text-blue-800">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                />
                                            </svg>
                                            <div>{item.name} - </div>
                                            <div>No. {item.number}</div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-72">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-600 font-bold">Aksi</div>
                            {loan.status === 'PROCCESS' && (
                                <span className="text-gray-500 font-light mt-4">
                                    Tidak ada aksi yang di butuhkan
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </AppLayout>
        </div>
    )
}
