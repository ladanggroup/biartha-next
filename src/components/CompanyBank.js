import axios from '@/lib/axios'
import { Dialog, Transition } from '@headlessui/react'
import { Toast } from 'flowbite-react'
import React, { Fragment, use, useEffect } from 'react'
import { toast } from 'react-toastify'
import InputWithLabel from './InputWithLabel'
import LoadingUser from './LoadingUser'

export default function CompanyBank() {
    const [bank, setBank] = React.useState([])
    const [newBank, setNewBank] = React.useState({
        bank_name: '',
        account_name: '',
        account_number: '',
        status: false,
    })
    const [loading, setLoading] = React.useState(true)
    const [validation, setValidation] = React.useState(false)
    const [toggleModal, setToggleModal] = React.useState(false)

    const getBank = async () => {
        setLoading(true)
        const res = await axios({
            method: 'GET',
            url: '/api/company/bank',
        }).then(res => {
            setBank(res.data.data)
            setLoading(false)
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await axios({
            method: 'POST',
            url: '/api/company/bank',
            data: newBank,
        }).then(res => {
            setNewBank({})
            toast.success(res.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            getBank()
            setToggleModal(false)
        })
    }

    const setBankStatus = async id => {
        const res = await axios({
            method: 'PUT',
            url: `/api/company/bank/update-status/${id}`,
        }).then(res => {
            getBank()
        })
    }
    useEffect(() => {
        getBank()
    }, [])

    return (
        <div>
            {loading === true ? (
                <LoadingUser />
            ) : (
                <div className="w-full space-y-4">
                    <div className="h-fit rounded-lg bg-white shadow-sm">
                        <div className="p-6">
                            <div className="text-sm text-gray-600">
                                <div className="mb-2 flex justify-between border-b-2 pb-2 ">
                                    <div className="text-xl font-semibold text-gray-700">
                                        Bank
                                    </div>

                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => setToggleModal(true)}>
                                        Tambah Bank
                                    </button>
                                </div>
                                <>
                                    <ul className="grid gap-6 w-full md:grid-cols-2">
                                        {bank.map((item, index) => (
                                            <li key={index}>
                                                <input
                                                    type="radio"
                                                    id={item.id}
                                                    name="hosting"
                                                    className="hidden peer"
                                                    value={item.id}
                                                    checked={item.status}
                                                    onChange={() =>
                                                        setBankStatus(item.id)
                                                    }
                                                />
                                                <label
                                                    htmlFor={item.id}
                                                    className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                    <div className="block">
                                                        <div className="w-full text-lg font-semibold">
                                                            {item.bank_name}
                                                        </div>
                                                        <div className="w-full">
                                                            {
                                                                item.account_number
                                                            }{' '}
                                                            a/n.{' '}
                                                            {item.account_name}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {item.status
                                                            ? 'Utama'
                                                            : 'Jadikan Utama'}
                                                    </div>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Transition appear show={toggleModal} as={Fragment}>
                <Dialog
                    open={toggleModal}
                    as="div"
                    className="relative z-10"
                    onClose={() => setToggleModal(false)}>
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
                                        Ubah Data Anda
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mt-2">
                                            <InputWithLabel
                                                id="bankName"
                                                label={'Nama Bank'}
                                                placeholder={'BCA'}
                                                type="text"
                                                onChange={e =>
                                                    setNewBank({
                                                        ...newBank,
                                                        bank_name:
                                                            e.target.value,
                                                    })
                                                }
                                                value={newBank.bank_name}
                                                error={
                                                    validation.bank_name && (
                                                        <span className="text-red-500 text-sm">
                                                            {
                                                                validation.bank_name
                                                            }
                                                        </span>
                                                    )
                                                }
                                            />
                                            <div className="grid grid-cols-2 gap-4 mt-4">
                                                <InputWithLabel
                                                    id="bankAccountNumber"
                                                    label={'Nomor Rekening'}
                                                    placeholder={'1234567890'}
                                                    type="number"
                                                    onChange={e =>
                                                        setNewBank({
                                                            ...newBank,
                                                            account_number:
                                                                e.target.value,
                                                        })
                                                    }
                                                    value={
                                                        newBank.account_number
                                                    }
                                                    error={
                                                        validation.account_number && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.account_number
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                />
                                                <InputWithLabel
                                                    id="bankAccountName"
                                                    label={
                                                        'Nama Pemilik Rekening'
                                                    }
                                                    placeholder={
                                                        'PT. Karya Utama'
                                                    }
                                                    type="text"
                                                    onChange={e =>
                                                        setNewBank({
                                                            ...newBank,
                                                            account_name:
                                                                e.target.value,
                                                        })
                                                    }
                                                    value={newBank.account_name}
                                                    error={
                                                        validation.account_name && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.account_name
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-end space-x-2">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                onClick={() =>
                                                    setToggleModal(false)
                                                }>
                                                Batal
                                            </button>
                                            <button
                                                type="submit"
                                                className="disabled:bg-opacity-50 disabled:text-opacity-50 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
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
        </div>
    )
}
