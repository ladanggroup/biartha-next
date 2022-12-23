import InputSelect from '@/components/InputSelect'
import InputWithLabel from '@/components/InputWithLabel'
import AppLayout from '@/components/Layouts/AppLayout'
import Loading from '@/components/Loading'
import axios from '@/lib/axios'
import { Dialog, Transition } from '@headlessui/react'
import moment from 'moment'
import 'moment/locale/id'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function show() {
    const [loan, setLoan] = React.useState([])
    const [document, setDocument] = React.useState([])
    const [isOpen, setIsOpen] = React.useState(false)
    const [validation, setValidation] = React.useState([])
    const [contract, setContract] = React.useState({
        contract_file: '',
        accept: false,
    })
    const [payment, setPayment] = React.useState({
        payment_method: '',
        payment_account_no: '',
        payment_account_name: '',
        payment_date: '',
    })
    const [loanMutation, setLoanMutation] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()
    const { id } = router.query
    const [uploadProgress, setUploadProgress] = React.useState(0)
    const [modalType, setModalType] = React.useState('')
    const getLoan = async () => {
        setLoading(true)
        const res = await axios({
            method: 'GET',
            url: `/api/loan/${id}`,
        }).then(res => {
            setLoan(res.data.data.loan)
            setDocument(res.data.data.loan_document)
            setLoanMutation(res.data.data.loan_note)
            setLoading(false)
        })
    }

    const toggleModal = async () => {
        setIsOpen(!isOpen)
    }
    const toggleModalRenewal = async () => {
        setModalType('renewal')
        setIsOpen(!isOpen)
    }

    const uploadFile = async e => {
        e.preventDefault()
        const file = e.target.files[0]
        setUploadProgress(0)
        if (file.size > 5000000) {
            e.target.value = null
            toast.error('Ukuran file tidak boleh lebih dari 5mb', {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        } else if (
            file.type !== 'image/jpeg' &&
            file.type !== 'image/png' &&
            file.type !== 'application/pdf'
        ) {
            e.target.value = null
            toast.error('Format file tidak didukung', {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        } else {
            const folder = 'customer/loan/document/contract'
            const formData = new FormData()
            formData.append('file', file)
            formData.append('folder', folder)
            const res = await axios({
                method: 'POST',
                url: '/api/upload-file',
                data: formData,
                onUploadProgress: progressEvent => {
                    setUploadProgress(
                        parseInt(
                            Math.round(
                                (progressEvent.loaded / progressEvent.total) *
                                    100,
                            ),
                        ),
                    )
                },
            }).then(res => {
                setContract({
                    ...contract,
                    contract_file: res.data.data.file_url,
                })
            })
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setValidation([])
        let statusUpdate = ''
        const formData = new FormData()
        formData.append('_method', 'PUT')
        if (loan.status === 'LOAN_APPROVED') {
            if (contract.accept === true) {
                // formData.append('contract_document', contract.contract_file)
                statusUpdate = 'waiting-transfered'
            } else {
                toast.error('Anda belum menyetujui Syarat dan Kententuan', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
                return 0
            }
        } else if (
            loan.status === 'LOAN_RUNNING' ||
            loan.status === 'LOAN_PAYMENT_PROBLEM'
        ) {
            formData.append('bank', payment.payment_method)
            formData.append('account_number', payment.payment_account_no)
            formData.append('account_name', payment.payment_account_name)
            formData.append('date', payment.payment_date)
            formData.append('file', contract.contract_file)
            statusUpdate = 'payment-verify'
        }
        const res = await axios({
            method: 'POST',
            url: `/api/loan/${loan.loan_id}/${statusUpdate}`,
            data: formData,
        })
            .then(res => {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
                toggleModal()
                getLoan()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setValidation(error.response.data.errors)
            })
    }

    const handleReject = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('status', 'LOAN_REJECTED')
        formData.append('_method', 'PUT')
        const res = await axios({
            method: 'POST',
            url: '/api/loan/edit/' + loan.loan_id,
            data: formData,
        })
            .then(res => {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
                getLoan()
            })
            .catch(error => {
                toast.error(error.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
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
                {loading ? (
                    <Loading />
                ) : (
                    <div className="py-12 mx-auto flex max-w-7xl space-x-4 sm:px-6 lg:px-8">
                        <div className="w-full">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <div>
                                    <div>
                                        Detail Pinjaman :{' '}
                                        <span className="font-semibold">
                                            {' '}
                                            {loan.loan_number} (
                                            {loan.status === 'LOAN_PROPOSED' &&
                                                'Pengajuan'}
                                            {loan.status === 'LOAN_APPROVED' &&
                                                'Disetujui'}
                                            {loan.status ===
                                                'LOAN_WAITING_TRANSFERED' &&
                                                'Pencarian Dana'}
                                            {loan.status === 'LOAN_RUNNING' &&
                                                'Masa Pinjaman'}
                                            {loan.status ===
                                                'LOAN_PAYMENT_VERIFY' &&
                                                'Verifikasi Pembayaran'}
                                            {loan.status ===
                                                'LOAN_PAYMENT_PROBLEM' &&
                                                'Pembayaran Bermasalah'}
                                            {loan.status === 'LOAN_REJECTED' &&
                                                'Ditolak'}
                                            {loan.status ===
                                                'LOAN_PAYMENT_VERIFIED' &&
                                                'Lunas'}
                                            )
                                        </span>
                                    </div>
                                </div>
                                {loan.status === 'LOAN_PROPOSED' && (
                                    <div className="mt-4 bg-yellow-50 p-4 rounded-md shadow-md">
                                        <div className="font-semibold text-yellow-600">
                                            Catatan :
                                        </div>
                                        <div className="text-yellow-600">
                                            Pinjaman sedang dalam proses
                                            peninjauan. Tunggu dalam 1x24 jam
                                            hari kerja untuk mendapatkan respon
                                            dari kami.
                                        </div>
                                    </div>
                                )}
                                {loan.status === 'LOAN_WAITING_TRANSFERED' && (
                                    <div className="mt-4 bg-green-100 p-4 rounded-md shadow-md">
                                        <div className="font-semibold text-green-600">
                                            Catatan :
                                        </div>
                                        <div className="text-green-600">
                                            Pinjaman sudah disetujui, tunggu
                                            1x24 jam hari kerja uang akan segera
                                            masuk ke rekening{' '}
                                            <span className="font-semibold">
                                                {loan.bank_info.bank_name} -{' '}
                                                {
                                                    loan.bank_info
                                                        .bank_account_number
                                                }{' '}
                                                a/n.{' '}
                                                {
                                                    loan.bank_info
                                                        .bank_account_name
                                                }
                                                .
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {loan.status === 'LOAN_PAYMENT_VERIFY' && (
                                    <div className="mt-4 bg-yellow-50 p-4 rounded-md shadow-md">
                                        <div className="font-semibold text-yellow-600">
                                            Catatan :
                                        </div>
                                        <div className="text-yellow-600">
                                            Pembayaran akan diverifikasi dalam
                                            1x24 jam di hari dan jam kerja.
                                        </div>
                                    </div>
                                )}
                                {loan.status === 'LOAN_PAYMENT_PROBLEM' && (
                                    <div className="mt-4 bg-red-50 p-4 rounded-md shadow-md">
                                        <div className="font-semibold text-red-600">
                                            Catatan :
                                        </div>
                                        <div className="text-red-600">
                                            {loanMutation}
                                        </div>
                                    </div>
                                )}
                                {loan.status === 'LOAN_RUNNING' &&
                                    moment(loan.loan_end_date)
                                        .add(-7, 'days')
                                        .format('YYYY-MM-DD') <=
                                        moment().format('YYYY-MM-DD') && (
                                        <div className="mt-4 bg-red-50 p-4 rounded-md shadow-md">
                                            <div className="font-semibold text-red-600">
                                                PERINGATAN :
                                            </div>
                                            <div className="text-red-600">
                                                Pinjaman akan segera jatuh tempo
                                                dalam{' '}
                                                <span className="font-semibold">
                                                    {moment(loan.loan_end_date)
                                                        .locale('fr')
                                                        .fromNow(true)}
                                                </span>{' '}
                                                lagi. Mohon segera lakukan
                                                pembayaran.
                                            </div>
                                        </div>
                                    )}
                                {loan?.loan_value && (
                                    <div className="mt-4 text-blue-800 bg-blue-50 p-4">
                                        <div>
                                            Pinjaman : Rp.{' '}
                                            <span className="font-semibold">
                                                {' '}
                                                {Number(
                                                    loan?.loan_value,
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                        <div>
                                            Bunga : Rp.{' '}
                                            {Number(
                                                loan?.loan_interest,
                                            ).toLocaleString()}{' '}
                                            ({loan.interest_percentage}%)
                                        </div>
                                        <div>
                                            Biaya Penanganan : Rp.{' '}
                                            {Number(
                                                loan?.handling_fee,
                                            ).toLocaleString()}
                                        </div>
                                        <div>Tenor : {loan.tenor} Hari</div>
                                        <div>
                                            Tanggal Pinjaman : {loan.loan_date}
                                        </div>
                                        <div>
                                            Tanggal{' '}
                                            <span className="font-semibold">
                                                Akhir
                                            </span>{' '}
                                            Pembayaran : {loan.loan_end_date}
                                        </div>
                                        <div className="text-xl font-semibold">
                                            Total : Rp.{' '}
                                            {(
                                                Number(loan?.loan_value) +
                                                Number(loan?.loan_interest) +
                                                Number(loan?.handling_fee)
                                            ).toLocaleString()}{' '}
                                        </div>
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
                                        Nama Kontrak :{' '}
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
                                        Nilai Kontrak : Rp.{' '}
                                        {loan.contract_value}
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
                                <div className="text-gray-600 font-bold">
                                    Aksi
                                </div>
                                {(loan.status === 'LOAN_PROPOSED' ||
                                    loan.status === 'LOAN_WAITING_TRANSFERED' ||
                                    loan.status === 'LOAN_PAYMENT_VERIFY' ||
                                    loan.status === 'LOAN_REJECTED' ||
                                    loan.status ===
                                        'LOAN_PAYMENT_VERIFIED') && (
                                    <span className="text-gray-500 font-light mt-4">
                                        Tidak ada aksi yang di butuhkan
                                    </span>
                                )}
                                {loan.status === 'LOAN_APPROVED' && (
                                    <div className="mt-4 flex flex-col space-y-2">
                                        <button
                                            className="bg-blue-200 hover:bg-opacity-75 text-blue-500 py-2 px-4 rounded-full w-full shadow-sm"
                                            onClick={toggleModal}>
                                            Terima Pinjaman
                                        </button>
                                        <button
                                            className="bg-red-200 hover:bg-opacity-75 text-red-500 py-2 px-4 rounded-full w-full shadow-sm"
                                            onClick={handleReject}>
                                            Tolak Pinjaman
                                        </button>
                                    </div>
                                )}
                                {loan.status === 'LOAN_RUNNING' && (
                                    <div className="mt-4 flex flex-col space-y-2">
                                        <button
                                            className="bg-blue-200 hover:bg-opacity-75 text-blue-500 py-2 px-4 rounded-full w-full shadow-sm"
                                            onClick={toggleModal}>
                                            Bayar Pinjaman
                                        </button>
                                        {moment(loan.loan_end_date)
                                            .add(-7, 'days')
                                            .format('YYYY-MM-DD') <=
                                            moment().format('YYYY-MM-DD') && (
                                            <button
                                                className="bg-red-200 hover:bg-opacity-75 text-red-500 py-2 px-4 rounded-full w-full shadow-sm"
                                                onClick={toggleModalRenewal}>
                                                Perpanjang
                                            </button>
                                        )}
                                    </div>
                                )}
                                {loan.status === 'LOAN_PAYMENT_PROBLEM' && (
                                    <div className="mt-4 flex flex-col space-y-2">
                                        <button
                                            className="bg-blue-200 hover:bg-opacity-75 text-blue-500 py-2 px-4 rounded-full w-full shadow-sm"
                                            onClick={toggleModal}>
                                            Upload Ulang
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </AppLayout>
            {loan.status === 'LOAN_APPROVED' && (
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        open={isOpen}
                        as="div"
                        className="relative z-10"
                        onClose={toggleModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95">
                                    <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900">
                                            Proses Pinjaman
                                        </Dialog.Title>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mt-2">
                                                <div className="text-gray-600">
                                                    <div className="border-b-2 border-gray-100 py-2">
                                                        Pinjaman telah disetujui
                                                        Admin. Apakah Anda yakin
                                                        akan menerima pinjaman
                                                        ini?
                                                    </div>
                                                    <div className="mt-4">
                                                        <div className="flex items-center mb-4">
                                                            <input
                                                                onChange={e =>
                                                                    setContract(
                                                                        {
                                                                            ...contract,
                                                                            accept: !contract.accept,
                                                                        },
                                                                    )
                                                                }
                                                                id="default-checkbox"
                                                                type="checkbox"
                                                                defaultValue=""
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                            />
                                                            <label
                                                                htmlFor="default-checkbox"
                                                                className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                                                                Saya telah
                                                                membaca dan
                                                                menyetujui{' '}
                                                                <span className="font-semibold">
                                                                    Syarat dan
                                                                    Ketentuan
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex justify-end space-x-2">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                    onClick={toggleModal}>
                                                    Batal
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                    Simpan Data
                                                </button>
                                            </div>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
            {loan.status === 'LOAN_RUNNING' && (
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        open={isOpen}
                        as="div"
                        className="relative z-10"
                        onClose={toggleModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>
                        {modalType === 'renewal' ? (
                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95">
                                        <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900">
                                                Perbarui Kontrak
                                            </Dialog.Title>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mt-2">
                                                    <div className="text-gray-600">
                                                        <div className="mt-4">
                                                            <div className="border-2 border-gray-200 p-2 rounded-lg  text-gray-600">
                                                                <div className="font-semibold text-gray-700 mb-2 border-b-2">
                                                                    Rincian
                                                                    Pinjaman
                                                                    Awal
                                                                </div>
                                                                <div>
                                                                    Tanggal
                                                                    Pinjaman :{' '}
                                                                    <span className="font-semibold">
                                                                        {
                                                                            loan?.loan_date
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    Tenor :{' '}
                                                                    <span className="font-semibold">
                                                                        {
                                                                            loan?.tenor
                                                                        }{' '}
                                                                        Hari
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    Tanggal
                                                                    Jatuh Tempo
                                                                    :{' '}
                                                                    <span className="font-semibold">
                                                                        {
                                                                            loan?.loan_end_date
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    Pinjaman :
                                                                    Rp.{' '}
                                                                    <span className="font-semibold">
                                                                        {Number(
                                                                            loan?.loan_value,
                                                                        ).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    Bunga : Rp.{' '}
                                                                    <span className="font-semibold">
                                                                        {Number(
                                                                            loan?.loan_interest,
                                                                        ).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    Biaya
                                                                    Penanganan :
                                                                    Rp.{' '}
                                                                    <span className="font-semibold">
                                                                        {Number(
                                                                            loan?.handling_fee,
                                                                        ).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    Total
                                                                    Tagihan :
                                                                    Rp.{' '}
                                                                    <span className="font-semibold">
                                                                        {(
                                                                            Number(
                                                                                loan?.loan_value,
                                                                            ) +
                                                                            Number(
                                                                                loan?.loan_interest,
                                                                            ) +
                                                                            Number(
                                                                                loan?.handling_fee,
                                                                            )
                                                                        ).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <div className="border-2 border-gray-200 p-2 rounded-lg  text-gray-600">
                                                                <div className="font-semibold text-gray-700 mb-2 border-b-2">
                                                                    Rincian
                                                                    Pinjaman
                                                                    Setelah
                                                                    Diperbarui
                                                                </div>
                                                                <div>
                                                                    Tanggal
                                                                    Pinjaman :{' '}
                                                                    <span className="font-semibold">
                                                                        {
                                                                            loan?.loan_date
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    Tenor :{' '}
                                                                    <span className="font-semibold">
                                                                        {
                                                                            loan?.tenor
                                                                        }{' '}
                                                                        + 30
                                                                        Hari
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    Tanggal
                                                                    Jatuh Tempo
                                                                    :{' '}
                                                                    <span className="font-semibold">
                                                                        {moment(
                                                                            loan.loan_end_date,
                                                                        )
                                                                            .add(
                                                                                30,
                                                                                'days',
                                                                            )
                                                                            .format(
                                                                                'YYYY-MM-DD',
                                                                            )}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    Pinjaman :
                                                                    Rp.{' '}
                                                                    <span className="font-semibold">
                                                                        {Number(
                                                                            loan?.loan_value,
                                                                        ).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    Bunga : Rp.{' '}
                                                                    <span className="font-semibold">
                                                                        {Number(
                                                                            loan?.loan_interest,
                                                                        ).toLocaleString()}{' '}
                                                                        + Rp.{' '}
                                                                        {Number(
                                                                            (loan.loan_value *
                                                                                1) /
                                                                                100,
                                                                        ).toLocaleString(
                                                                            undefined,
                                                                            {
                                                                                minimumFractionDigits: 0,
                                                                                maximumFractionDigits: 0,
                                                                            },
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    Biaya
                                                                    Penanganan :
                                                                    Rp.{' '}
                                                                    <span className="font-semibold">
                                                                        {Number(
                                                                            loan?.loan_interest,
                                                                        ).toLocaleString()}{' '}
                                                                        + Rp.
                                                                        5,000
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <div className=" text-lg border-2 border-violet-500 p-2 rounded-lg bg-violet-100 text-violet-600">
                                                                Total Tagihan
                                                                Akhir : Rp.{' '}
                                                                <span className="font-semibold">
                                                                    {(
                                                                        Number(
                                                                            loan?.loan_value,
                                                                        ) +
                                                                        Number(
                                                                            loan?.loan_interest,
                                                                        ) +
                                                                        Number(
                                                                            loan?.handling_fee,
                                                                        ) +
                                                                        (Number(
                                                                            (loan.loan_value *
                                                                                1) /
                                                                                100,
                                                                        ) +
                                                                            Number(
                                                                                5000,
                                                                            ))
                                                                    ) // handling fee
                                                                        .toLocaleString(
                                                                            undefined,
                                                                            {
                                                                                minimumFractionDigits: 0,
                                                                                maximumFractionDigits: 0,
                                                                            },
                                                                        )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex justify-end space-x-2">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                        onClick={toggleModal}>
                                                        Batal
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                        Simpan Data
                                                    </button>
                                                </div>
                                            </form>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        ) : (
                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95">
                                        <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900">
                                                Bayar Pinjaman
                                            </Dialog.Title>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mt-2">
                                                    <div className="text-gray-600">
                                                        <div className="mt-4">
                                                            <div className=" text-lg border-2 border-violet-500 p-2 rounded-lg bg-violet-100 text-violet-600">
                                                                Total Tagihan :
                                                                Rp.{' '}
                                                                <span className="font-semibold">
                                                                    {(
                                                                        Number(
                                                                            loan?.loan_value,
                                                                        ) +
                                                                        Number(
                                                                            loan?.loan_interest,
                                                                        ) +
                                                                        Number(
                                                                            loan?.handling_fee,
                                                                        )
                                                                    ).toLocaleString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 flex flex-col space-y-4">
                                                            <InputSelect
                                                                id="payment_method"
                                                                label={
                                                                    'Pilih Metode Pembayaran'
                                                                }
                                                                placeholder={
                                                                    'Pilih Metode Pembayaran'
                                                                }
                                                                error={
                                                                    validation.payment_method && (
                                                                        <span className="text-red-500 text-sm">
                                                                            {
                                                                                validation.payment_method
                                                                            }
                                                                        </span>
                                                                    )
                                                                }
                                                                onChange={e =>
                                                                    setPayment({
                                                                        ...payment,
                                                                        payment_method:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    })
                                                                }>
                                                                <option value="Bank Jatim">
                                                                    Bank Jatim -
                                                                    1234567890 -
                                                                    a/n PT.
                                                                    Biartha
                                                                </option>
                                                                <option value="Bank Jateng">
                                                                    Bank Jateng
                                                                    - 1234567890
                                                                    - a/n PT.
                                                                    Biartha
                                                                </option>
                                                            </InputSelect>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <InputWithLabel
                                                                    id="paymentAccountName"
                                                                    label={
                                                                        'Nama Bank Pengirim'
                                                                    }
                                                                    placeholder={
                                                                        'PT Langgeng Jaya'
                                                                    }
                                                                    type="text"
                                                                    onChange={e =>
                                                                        setPayment(
                                                                            {
                                                                                ...payment,
                                                                                payment_account_name:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            },
                                                                        )
                                                                    }
                                                                    value={
                                                                        payment.payment_account_name
                                                                    }
                                                                    error={
                                                                        validation.payment_account_name && (
                                                                            <span className="text-red-500 text-sm">
                                                                                {
                                                                                    validation.payment_account_name
                                                                                }
                                                                            </span>
                                                                        )
                                                                    }
                                                                />
                                                                <InputWithLabel
                                                                    id="paymentAccountNumber"
                                                                    label={
                                                                        'Nomor Bank Pengirim'
                                                                    }
                                                                    placeholder={
                                                                        '1234567890'
                                                                    }
                                                                    type="number"
                                                                    onChange={e =>
                                                                        setPayment(
                                                                            {
                                                                                ...payment,
                                                                                payment_account_no:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            },
                                                                        )
                                                                    }
                                                                    value={
                                                                        payment.payment_account_no
                                                                    }
                                                                    error={
                                                                        validation.payment_account_no && (
                                                                            <span className="text-red-500 text-sm">
                                                                                {
                                                                                    validation.payment_account_no
                                                                                }
                                                                            </span>
                                                                        )
                                                                    }
                                                                />
                                                                <InputWithLabel
                                                                    id="paymentTransferDate"
                                                                    label={
                                                                        'Tanggal Transfer'
                                                                    }
                                                                    type="date"
                                                                    onChange={e =>
                                                                        setPayment(
                                                                            {
                                                                                ...payment,
                                                                                payment_date:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            },
                                                                        )
                                                                    }
                                                                    value={
                                                                        payment.payment_date
                                                                    }
                                                                    error={
                                                                        validation.payment_date && (
                                                                            <span className="text-red-500 text-sm">
                                                                                {
                                                                                    validation.payment_date
                                                                                }
                                                                            </span>
                                                                        )
                                                                    }
                                                                />
                                                                <InputWithLabel
                                                                    id="cardImage"
                                                                    label={
                                                                        'Upload Bukti Bayar'
                                                                    }
                                                                    type="file"
                                                                    onChange={
                                                                        uploadFile
                                                                    }
                                                                    defaultValue=""
                                                                    accept="image/*, .pdf"
                                                                    helper={
                                                                        <p
                                                                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                                                            id="file_input_help">
                                                                            PNG,
                                                                            JPG,
                                                                            atau
                                                                            PDF
                                                                            (Maks
                                                                            5MB)
                                                                        </p>
                                                                    }
                                                                    error={
                                                                        validation.file_doc && (
                                                                            <span className="text-red-500 text-sm">
                                                                                {
                                                                                    validation.file_doc
                                                                                }
                                                                            </span>
                                                                        )
                                                                    }>
                                                                    {uploadProgress >
                                                                        0 && (
                                                                        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                                                            <div
                                                                                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                                                                style={{
                                                                                    width: `${uploadProgress}%`,
                                                                                }}>
                                                                                {
                                                                                    uploadProgress
                                                                                }

                                                                                %
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </InputWithLabel>
                                                            </div>

                                                            <input
                                                                hidden
                                                                type="text"
                                                                value={
                                                                    contract.payment_file ||
                                                                    ''
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex justify-end space-x-2">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                        onClick={toggleModal}>
                                                        Batal
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                        Simpan Data
                                                    </button>
                                                </div>
                                            </form>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        )}
                    </Dialog>
                </Transition>
            )}
            {loan.status === 'LOAN_PAYMENT_PROBLEM' && (
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        open={isOpen}
                        as="div"
                        className="relative z-10"
                        onClose={toggleModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95">
                                    <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900">
                                            Bayar Pinjaman
                                        </Dialog.Title>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mt-2">
                                                <div className="text-gray-600">
                                                    <div className="mt-4">
                                                        <div className=" text-lg border-2 border-violet-500 p-2 rounded-lg bg-violet-100 text-violet-600">
                                                            Total Tagihan : Rp.{' '}
                                                            <span className="font-semibold">
                                                                {(
                                                                    Number(
                                                                        loan?.loan_value,
                                                                    ) +
                                                                    Number(
                                                                        loan?.loan_interest,
                                                                    ) +
                                                                    Number(
                                                                        loan?.handling_fee,
                                                                    )
                                                                ).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 flex flex-col space-y-4">
                                                        <InputSelect
                                                            id="payment_method"
                                                            label={
                                                                'Pilih Metode Pembayaran'
                                                            }
                                                            placeholder={
                                                                'Pilih Metode Pembayaran'
                                                            }
                                                            error={
                                                                validation.payment_method && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.payment_method
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                            onChange={e =>
                                                                setPayment({
                                                                    ...payment,
                                                                    payment_method:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }>
                                                            <option value="Bank Jatim">
                                                                Bank Jatim -
                                                                1234567890 - a/n
                                                                PT. Biartha
                                                            </option>
                                                            <option value="Bank Jateng">
                                                                Bank Jateng -
                                                                1234567890 - a/n
                                                                PT. Biartha
                                                            </option>
                                                        </InputSelect>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <InputWithLabel
                                                                id="paymentAccountName"
                                                                label={
                                                                    'Nama Bank Pengirim'
                                                                }
                                                                placeholder={
                                                                    'PT Langgeng Jaya'
                                                                }
                                                                type="text"
                                                                onChange={e =>
                                                                    setPayment({
                                                                        ...payment,
                                                                        payment_account_name:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    })
                                                                }
                                                                value={
                                                                    payment.payment_account_name
                                                                }
                                                                error={
                                                                    validation.payment_account_name && (
                                                                        <span className="text-red-500 text-sm">
                                                                            {
                                                                                validation.payment_account_name
                                                                            }
                                                                        </span>
                                                                    )
                                                                }
                                                            />
                                                            <InputWithLabel
                                                                id="paymentAccountNumber"
                                                                label={
                                                                    'Nomor Bank Pengirim'
                                                                }
                                                                placeholder={
                                                                    '1234567890'
                                                                }
                                                                type="number"
                                                                onChange={e =>
                                                                    setPayment({
                                                                        ...payment,
                                                                        payment_account_no:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    })
                                                                }
                                                                value={
                                                                    payment.payment_account_no
                                                                }
                                                                error={
                                                                    validation.payment_account_no && (
                                                                        <span className="text-red-500 text-sm">
                                                                            {
                                                                                validation.payment_account_no
                                                                            }
                                                                        </span>
                                                                    )
                                                                }
                                                            />
                                                            <InputWithLabel
                                                                id="paymentTransferDate"
                                                                label={
                                                                    'Tanggal Transfer'
                                                                }
                                                                type="date"
                                                                onChange={e =>
                                                                    setPayment({
                                                                        ...payment,
                                                                        payment_date:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    })
                                                                }
                                                                value={
                                                                    payment.payment_date
                                                                }
                                                                error={
                                                                    validation.payment_date && (
                                                                        <span className="text-red-500 text-sm">
                                                                            {
                                                                                validation.payment_date
                                                                            }
                                                                        </span>
                                                                    )
                                                                }
                                                            />
                                                            <InputWithLabel
                                                                id="cardImage"
                                                                label={
                                                                    'Upload Bukti Bayar'
                                                                }
                                                                type="file"
                                                                onChange={
                                                                    uploadFile
                                                                }
                                                                defaultValue=""
                                                                accept="image/*, .pdf"
                                                                helper={
                                                                    <p
                                                                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                                                        id="file_input_help">
                                                                        PNG,
                                                                        JPG,
                                                                        atau PDF
                                                                        (Maks
                                                                        5MB)
                                                                    </p>
                                                                }
                                                                error={
                                                                    validation.file_doc && (
                                                                        <span className="text-red-500 text-sm">
                                                                            {
                                                                                validation.file_doc
                                                                            }
                                                                        </span>
                                                                    )
                                                                }>
                                                                {uploadProgress >
                                                                    0 && (
                                                                    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                                                        <div
                                                                            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                                                            style={{
                                                                                width: `${uploadProgress}%`,
                                                                            }}>
                                                                            {
                                                                                uploadProgress
                                                                            }
                                                                            %
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </InputWithLabel>
                                                        </div>

                                                        <input
                                                            hidden
                                                            type="text"
                                                            value={
                                                                contract.payment_file ||
                                                                ''
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex justify-end space-x-2">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                    onClick={toggleModal}>
                                                    Batal
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                    Simpan Data
                                                </button>
                                            </div>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </div>
    )
}
