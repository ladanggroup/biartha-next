import CompanyDocument from '@/components/CompanyDocument'
import InputWithLabel from '@/components/InputWithLabel'
import AppLayout from '@/components/Layouts/AppLayout'
import LoadingUser from '@/components/LoadingUser'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { Dialog, Transition } from '@headlessui/react'
import Head from 'next/head'
import Link from 'next/link'
import React, { Fragment, useEffect } from 'react'
import { toast } from 'react-toastify'
import CreatableSelect from 'react-select/creatable'
import { useRouter } from 'next/router'
import InputSelect from '@/components/InputSelect'

export default function create() {
    const { user } = useAuth({ middleware: 'auth' })
    const [validation, setValidation] = React.useState([])
    const [show, setShow] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const [document, setDocument] = React.useState({
        loan_id: '',
        type: '',
        name: '',
        number: '',
        file_doc: '',
    })
    const [loan, setLoan] = React.useState({
        contract_name: '',
        contract_number: '',
        contract_start_date: '',
        contract_end_date: '',
        contract_value: '',
        tenor: '',
        pic_name: '',
        pic_phone: '',
        pic_position: '',
    })
    const [listDocument, setListDocument] = React.useState([])
    const router = useRouter()
    const loan_id = router.query.loan_id

    const handleSubmit = async event => {
        event.preventDefault()
        setValidation([])
        const formData = new FormData()
        if (document.loan_id) {
            formData.append('status', 'PROCCESS')
            formData.append('_method', 'PUT')
            await axios({
                method: 'POST',
                url: '/api/loan/edit/' + loan_id,
                data: formData,
            })
                .then(res => {
                    toast.success(
                        'Pinjaman Berhasil di ajukan dan menunggu konfirmasi oleh admin.',
                        {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        },
                    )
                    router.push('/loan')
                    setDocument({})
                    // router.push({
                    //     pathname: '/loan',
                    // })
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error
                    setValidation(error.response.data.errors)
                    setShow(false)
                })
        } else {
            formData.append('contract_name', loan.contract_name)
            formData.append('contract_number', loan.contract_number)
            formData.append('contract_start_date', loan.contract_start_date)
            formData.append('contract_end_date', loan.contract_end_date)
            formData.append('contract_value', loan.contract_value)
            formData.append('pic_name', loan.pic_name)
            formData.append('pic_phone', loan.pic_phone)
            formData.append('tenor', loan.tenor)
            formData.append('pic_position', loan.pic_position)
            await axios({
                method: 'POST',
                url: '/api/loan',
                data: formData,
            })
                .then(res => {
                    toast.success(res.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                    setDocument({})
                    router.push({
                        pathname: '/loan/create',
                        query: { loan_id: res.data.data.loan_id },
                    })
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error
                    setValidation(error.response.data.errors)
                    setShow(false)
                })
        }
    }
    function toggleModal() {
        setIsOpen(isOpen => !isOpen)
    }

    const uploadFile = async e => {
        e.preventDefault()
        const file = e.target.files[0]
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
            const folder = 'customer/company/document'
            const formData = new FormData()
            formData.append('file', file)
            formData.append('folder', folder)
            const res = await axios({
                method: 'POST',
                url: '/api/upload-file',
                data: formData,
            }).then(res => {
                setDocument({ ...document, file_doc: res.data.data.file_url })
            })
        }
    }

    const handleDocument = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('type', document.type)
        formData.append('name', document.name)
        formData.append('number', document.number)
        formData.append('file_doc', document.file_doc)
        await axios({
            method: 'POST',
            url: '/api/loan/document' + '/' + document.loan_id,
            data: formData,
        })
            .then(res => {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
                setDocument({
                    ...document,
                    type: '',
                    name: '',
                    number: '',
                    file_doc: '',
                })
                toggleModal()
                getDocument()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setValidation(error.response.data.errors)
            })
    }

    const getDocument = async () => {
        if (document.loan_id) {
            await axios({
                method: 'GET',
                url: '/api/loan/document' + '/' + document.loan_id,
            })
                .then(res => {
                    setListDocument(res.data.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    useEffect(() => {
        if (loan_id) {
            setDocument(document => ({ ...document, loan_id: loan_id }))
        }
    }, [loan_id])

    useEffect(() => {
        getDocument()
    }, [document.loan_id])

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
                                                    <Link
                                                        href="/loan"
                                                        className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2">
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
                        }>
                        {!document.loan_id && (
                            <div className="py-12">
                                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                        <div className="border-b border-gray-200 bg-white p-6">
                                            <div className="text-xl font-semibold text-gray-700">
                                                Form Pengajuan Pinjaman
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mt-2">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <InputWithLabel
                                                            id="contractName"
                                                            label={
                                                                'Nama Kontrak'
                                                            }
                                                            placeholder={
                                                                'Proyek SIPLah SMK Negeri 2 Surabaya'
                                                            }
                                                            type="text"
                                                            onChange={e =>
                                                                setLoan({
                                                                    ...loan,
                                                                    contract_name:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            value={
                                                                loan.contract_name
                                                            }
                                                            error={
                                                                validation.contract_name && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.contract_name
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                        <InputWithLabel
                                                            id="contractNumber"
                                                            label={
                                                                'Nomor Kontrak'
                                                            }
                                                            placeholder={
                                                                'PO/2021/0001'
                                                            }
                                                            type="text"
                                                            onChange={e =>
                                                                setLoan({
                                                                    ...loan,
                                                                    contract_number:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            value={
                                                                loan.contract_number
                                                            }
                                                            error={
                                                                validation.contract_number && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.contract_number
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                        <InputWithLabel
                                                            id="contractStartDate"
                                                            label={
                                                                'Tanggal Mulai Kontrak'
                                                            }
                                                            placeholder={''}
                                                            type="date"
                                                            onChange={e =>
                                                                setLoan({
                                                                    ...loan,
                                                                    contract_start_date:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            value={
                                                                loan.contract_start_date
                                                            }
                                                            error={
                                                                validation.contract_start_date && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.contract_start_date
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                        <InputWithLabel
                                                            id="contractEndDate"
                                                            label={
                                                                'Tanggal Akhir Kontrak'
                                                            }
                                                            placeholder={''}
                                                            type="date"
                                                            onChange={e =>
                                                                setLoan({
                                                                    ...loan,
                                                                    contract_end_date:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            value={
                                                                loan.contract_end_date
                                                            }
                                                            error={
                                                                validation.contract_end_date && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.contract_end_date
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                        <InputWithLabel
                                                            id="contractValue"
                                                            label={
                                                                'Nilai Kontrak'
                                                            }
                                                            placeholder={
                                                                '100000000'
                                                            }
                                                            type="number"
                                                            onChange={e =>
                                                                setLoan({
                                                                    ...loan,
                                                                    contract_value:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            value={
                                                                loan.contract_value
                                                            }
                                                            error={
                                                                validation.contract_value && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.contract_value
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                        <InputSelect
                                                            id="tenor"
                                                            label={
                                                                'Tenor Pinjaman'
                                                            }
                                                            placeholder={
                                                                'Pilih Tenor'
                                                            }
                                                            onChange={e =>
                                                                setLoan({
                                                                    ...loan,
                                                                    tenor:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            error={
                                                                validation.tenor && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.tenor
                                                                        }
                                                                    </span>
                                                                )
                                                            }>
                                                            <option value={30}>
                                                                30 Hari - Bunga
                                                                1%
                                                            </option>
                                                            <option value={60}>
                                                                60 Hari - Bunga
                                                                1.5%
                                                            </option>
                                                        </InputSelect>
                                                        <InputWithLabel
                                                            id="picName"
                                                            label={'Nama PIC'}
                                                            placeholder={
                                                                'Budi Santoso'
                                                            }
                                                            type="text"
                                                            onChange={e =>
                                                                setLoan({
                                                                    ...loan,
                                                                    pic_name:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            value={
                                                                loan.pic_name
                                                            }
                                                            error={
                                                                validation.pic_name && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.pic_name
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                        <InputWithLabel
                                                            id="picPhone"
                                                            label={
                                                                'Nomor Telepon PIC'
                                                            }
                                                            placeholder={
                                                                '081234567890'
                                                            }
                                                            type="text"
                                                            onChange={e =>
                                                                setLoan({
                                                                    ...loan,
                                                                    pic_phone:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            value={
                                                                loan.pic_phone
                                                            }
                                                            error={
                                                                validation.pic_phone && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.pic_phone
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                        <InputWithLabel
                                                            id="picPosition"
                                                            label={
                                                                'Jabatan PIC'
                                                            }
                                                            placeholder={
                                                                'Wakil Direktur'
                                                            }
                                                            type="text"
                                                            onChange={e =>
                                                                setLoan({
                                                                    ...loan,
                                                                    pic_position:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            value={
                                                                loan.pic_position
                                                            }
                                                            error={
                                                                validation.pic_position && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.pic_position
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex justify-end space-x-2">
                                                    <button
                                                        type="submit"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                        Simpan Data
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {document.loan_id && (
                            <div className="py-12">
                                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                        <div className="border-b border-gray-200 bg-white p-6">
                                            <div className="text-xl font-semibold text-gray-700">
                                                Form Pengajuan Pinjaman
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 w-full text-gray-600 font-medium text-sm">
                                                {listDocument.map(
                                                    (item, index) => (
                                                        <div
                                                            className="flex space-x-2"
                                                            key={index}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="w-6 h-6">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                                />
                                                            </svg>
                                                            <div>
                                                                {item.type} -{' '}
                                                                {item.name} -
                                                                No.
                                                                {item.number}
                                                            </div>
                                                            <BtnShow link={item.file_doc} />
                                                        </div>
                                                    ),
                                                )}

                                                <button
                                                    onClick={toggleModal}
                                                    type="button"
                                                    className="border-2 border-gray-300 p-5 border-dashed rounded-lg text-center col-span-2 hover:shadow-md">
                                                    Tambahkan dokumen lainnya
                                                </button>
                                            </div>
                                            <div className="mt-4 flex justify-end space-x-2">
                                                <button
                                                    onClick={handleSubmit}
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                    Ajukan Pinjaman
                                                </button>
                                            </div>
                                            <Transition
                                                appear
                                                show={isOpen}
                                                as={Fragment}>
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
                                                                        Tambahkan
                                                                        Dokumen
                                                                    </Dialog.Title>
                                                                    <form
                                                                        onSubmit={
                                                                            handleDocument
                                                                        }>
                                                                        <div className="mt-2">
                                                                            <div className="grid grid-cols-2 gap-4">
                                                                                <InputWithLabel
                                                                                    id="type"
                                                                                    label={
                                                                                        'Jenis Dokumen'
                                                                                    }
                                                                                    placeholder={
                                                                                        'SPK, SPPBJ, dll'
                                                                                    }
                                                                                    type="text"
                                                                                    value={
                                                                                        document.type
                                                                                    }
                                                                                    onChange={e =>
                                                                                        setDocument(
                                                                                            {
                                                                                                ...document,
                                                                                                type:
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                            },
                                                                                        )
                                                                                    }
                                                                                    error={
                                                                                        validation.type && (
                                                                                            <span className="text-red-500 text-sm">
                                                                                                {
                                                                                                    validation.type
                                                                                                }
                                                                                            </span>
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <InputWithLabel
                                                                                    id="name"
                                                                                    label={
                                                                                        'Nama Dokumen'
                                                                                    }
                                                                                    placeholder={
                                                                                        'SIPLah 2021'
                                                                                    }
                                                                                    type="text"
                                                                                    value={
                                                                                        document.name
                                                                                    }
                                                                                    onChange={e =>
                                                                                        setDocument(
                                                                                            {
                                                                                                ...document,
                                                                                                name:
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                            },
                                                                                        )
                                                                                    }
                                                                                    error={
                                                                                        validation.name && (
                                                                                            <span className="text-red-500 text-sm">
                                                                                                {
                                                                                                    validation.name
                                                                                                }
                                                                                            </span>
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <InputWithLabel
                                                                                    id="number"
                                                                                    label={
                                                                                        'Nomor Dokumen'
                                                                                    }
                                                                                    placeholder={
                                                                                        '123abc-123abc-123abc'
                                                                                    }
                                                                                    type="text"
                                                                                    value={
                                                                                        document.number
                                                                                    }
                                                                                    onChange={e =>
                                                                                        setDocument(
                                                                                            {
                                                                                                ...document,
                                                                                                number:
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                            },
                                                                                        )
                                                                                    }
                                                                                    error={
                                                                                        validation.number && (
                                                                                            <span className="text-red-500 text-sm">
                                                                                                {
                                                                                                    validation.number
                                                                                                }
                                                                                            </span>
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <InputWithLabel
                                                                                    id="cardImage"
                                                                                    label={
                                                                                        'Upload Dokumen'
                                                                                    }
                                                                                    type="file"
                                                                                    onChange={
                                                                                        uploadFile
                                                                                    }
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
                                                                                    }
                                                                                />
                                                                                <input
                                                                                    hidden
                                                                                    type="text"
                                                                                    value={
                                                                                        document.file_doc ||
                                                                                        ''
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="mt-4 flex justify-end space-x-2">
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                                                onClick={
                                                                                    toggleModal
                                                                                }>
                                                                                Batal
                                                                            </button>
                                                                            <button
                                                                                type="submit"
                                                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                                                Simpan
                                                                                Data
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                </Dialog.Panel>
                                                            </Transition.Child>
                                                        </div>
                                                    </div>
                                                </Dialog>
                                            </Transition>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </AppLayout>
                </>
            )}
        </>
    )
}

function BtnShow({ link }) {
    return (
        <a
            href={link}
            target={'_blank'}
            className="text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full text-xs hover:bg-blue-200 flex justify-between items-center space-x-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
            <div>Lihat Dokumen</div>
        </a>
    )
}
