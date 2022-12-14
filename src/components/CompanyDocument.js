import axios from '@/lib/axios'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect } from 'react'
import { toast } from 'react-toastify'
import InputWithLabel from './InputWithLabel'
import CreatableSelect from 'react-select/creatable'
import LoadingUser from './LoadingUser'
import { useRouter } from 'next/router'

export default function CompanyDocument() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [type, setType] = React.useState('')
    const [doc, setDoc] = React.useState('')
    const [number, setNumber] = React.useState('')
    const [activeDate, setActiveDate] = React.useState('')
    const [inActiveDate, setInActiveDate] = React.useState('')
    const [validation, setValidation] = React.useState([])
    const [companyDocument, setCompanyDocument] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [uploadProgress, setUploadProgress] = React.useState(0)
    const router = useRouter()
    const filterDocument = ['NPWP', 'SIUP']
    const documentOption = [
        { value: 'NPWP', label: 'NPWP' },
        { value: 'SIUP', label: 'SIUP' },
        {
            value: 'other',
            label: 'Ketikkan untuk dokumen lainnya',
            isDisabled: true,
        },
    ]

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
            const folder = 'customer/company/document'
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
                setDoc(res.data.data.file_url)
            })
        }
    }

    function toggleModal() {
        setIsOpen(isOpen => !isOpen)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setValidation([])
        const formData = new FormData()
        formData.append('type', type)
        formData.append('file_doc', doc)
        formData.append('number', number)
        formData.append('active_date', activeDate)
        formData.append('inactive_date', inActiveDate)
        await axios({
            method: 'POST',
            url: '/api/company/document',
            data: formData,
        })
            .then(res => {
                toggleModal()
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
                getCompanyDocument()
                setType('')
                setDoc('')
                setNumber('')
                setActiveDate('')
                setInActiveDate('')
            })
            .catch(err => {
                setValidation(err.response.data.errors)
            })
    }

    const deleteDocument = async id => {
        await axios({
            method: 'DELETE',
            url: `/api/company/document`,
            data: {
                id: id,
            },
        })
            .then(res => {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
                getCompanyDocument()
            })
            .catch(err => {
                toast.error(err.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            })
    }

    // const getCompanyDocument = async () => {
    //     try {
    //         const res = await axios({
    //             method: 'GET',
    //             url: '/api/company/document',
    //         }).then(res => {
    //             setCompanyDocument(res.data.data)
    //         })
    //     } catch (error) {
    //         console.log(loading)
    //         setLoading(false)
    //     }
    // }

    const getCompanyDocument = async () => {
        try {
            const res = await axios({
                method: 'GET',
                url: '/api/company/document',
            })
                .then(res => {
                    setCompanyDocument(res.data.data)
                    if (res.data.data.length === 0) {
                        setLoading(false)
                    }
                })
                .catch(e => {
                    setLoading(false)
                })
        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (!router.isReady) return
        getCompanyDocument()
    }, [router.isReady])

    return (
        <div>
            {companyDocument.length === 0 && loading === true ? (
                <LoadingUser />
            ) : (
                <div>
                    <div className="w-full space-y-4">
                        <div className="h-fit rounded-lg bg-white shadow-sm">
                            <div className="p-6">
                                <div className="text-sm text-gray-600">
                                    <div className="mb-2 flex justify-between border-b-2 pb-2 ">
                                        <div className="text-xl font-semibold text-gray-700">
                                            Dokumen Perusahaan
                                        </div>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={toggleModal}>
                                            Tambah Dokumen
                                        </button>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        {companyDocument.filter(i =>
                                            i.type
                                                .split(',')
                                                .some(filter =>
                                                    filterDocument.includes(
                                                        filter,
                                                    ),
                                                ),
                                        ).length > 0 ? (
                                            companyDocument
                                                .filter(i =>
                                                    i.type
                                                        .split(',')
                                                        .some(filter =>
                                                            filterDocument.includes(
                                                                filter,
                                                            ),
                                                        ),
                                                )
                                                .map((item, index) => (
                                                    <ItemDocument
                                                        key={index}
                                                        name={item.type}
                                                        number={item.number}
                                                        activeDate={
                                                            item.active_date
                                                        }
                                                        inActiveDate={
                                                            item.inactive_date
                                                        }>
                                                        <div className="flex space-x-2">
                                                            <BtnShow
                                                                link={
                                                                    item.file_doc
                                                                }
                                                            />
                                                            <BtnDelete
                                                                onClick={() =>
                                                                    deleteDocument(
                                                                        item.id,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </ItemDocument>
                                                ))
                                        ) : (
                                            <div className="text-center text-gray-500">
                                                Anda belum upload dokumen NPWP
                                                dan PKP, silahkan upload
                                                terlebih dahulu.
                                            </div>
                                        )}
                                        <hr />
                                        {companyDocument.filter(i =>
                                            i.type
                                                .split(',')
                                                .some(
                                                    filter =>
                                                        !filterDocument.includes(
                                                            filter,
                                                        ),
                                                ),
                                        ).length > 0 ? (
                                            companyDocument
                                                .filter(i =>
                                                    i.type
                                                        .split(',')
                                                        .some(
                                                            filter =>
                                                                !filterDocument.includes(
                                                                    filter,
                                                                ),
                                                        ),
                                                )
                                                .map((item, index) => (
                                                    <ItemDocument
                                                        key={index}
                                                        name={item.type}
                                                        number={item.number}
                                                        activeDate={
                                                            item.active_date
                                                        }
                                                        inActiveDate={
                                                            item.inactive_date
                                                        }>
                                                        <div className="flex space-x-2">
                                                            <BtnShow
                                                                link={
                                                                    item.file_doc
                                                                }
                                                            />
                                                            <BtnDelete
                                                                onClick={() =>
                                                                    deleteDocument(
                                                                        item.id,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </ItemDocument>
                                                ))
                                        ) : (
                                            <div className="text-center text-gray-500">
                                                Untuk menambahkan dokumen
                                                lainnya silahkan klik tombol
                                                tambah dokumen.
                                            </div>
                                        )}{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                                Tambahkan Dokumen
                                            </Dialog.Title>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mt-2">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="">
                                                            <label
                                                                htmlFor={'type'}
                                                                className="block mb-2 text-sm font-medium text-gray-600">
                                                                Tipe Dokumen
                                                            </label>
                                                            <CreatableSelect
                                                                id={'type'}
                                                                isClearable
                                                                options={
                                                                    documentOption
                                                                }
                                                                onChange={e =>
                                                                    setType(
                                                                        e.value,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <InputWithLabel
                                                            id="number"
                                                            label={
                                                                'Nomor Dokumen'
                                                            }
                                                            placeholder={
                                                                '123abc-123abc-123abc'
                                                            }
                                                            type="text"
                                                            onChange={e =>
                                                                setNumber(
                                                                    e.target
                                                                        .value,
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
                                                            id="activeDate"
                                                            label={
                                                                'Tanggal Mulai Berlaku'
                                                            }
                                                            placeholder={
                                                                '13/12/2021'
                                                            }
                                                            type="date"
                                                            onChange={e =>
                                                                setActiveDate(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            error={
                                                                validation.active_date && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.active_date
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                        <InputWithLabel
                                                            id="inactiveDate"
                                                            label={
                                                                'Tanggal Akhir Berlaku'
                                                            }
                                                            placeholder={
                                                                '13/12/2021'
                                                            }
                                                            type="date"
                                                            onChange={e =>
                                                                setInActiveDate(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            error={
                                                                validation.inactive_date && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.inactive_date
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
                                                                    class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                                                    id="file_input_help">
                                                                    PNG, JPG,
                                                                    atau PDF
                                                                    (Maks 5MB)
                                                                </p>
                                                            }
                                                            error={
                                                                validation.card_image && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.card_image
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
                                                        <input
                                                            hidden
                                                            type="text"
                                                            value={doc}
                                                        />
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
                </div>
            )}
        </div>
    )
}

function ItemDocument({ name, number, activeDate, inActiveDate, children }) {
    return (
        <>
            <div className="flex space-x-2 items-center">
                <div className="w-64">{name}</div>
                <div className="flex-1">{number}</div>
                <div className="flex-1">{activeDate}</div>
                <div className="flex-1">{inActiveDate}</div>
                <div className="">{children}</div>
            </div>
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

function BtnDelete({ ...props }) {
    return (
        <button
            {...props}
            type="button"
            className="text-red-500 bg-red-100 px-2 py-0.5 rounded-full text-xs hover:bg-red-200 flex justify-between space-x-1 items-center">
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
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
            </svg>
            <div>Hapus</div>
        </button>
    )
}

function Popup({ handleDeleteTrue }) {
    return (
        <div className="modal">
            <div className="modal_box">
                <p>You sure you wanna delete?</p>
                <button className="modal_buttonCancel">Cancel</button>
                <button
                    onClick={handleDeleteTrue}
                    className="modal_buttoDelete">
                    Confirm
                </button>
            </div>
        </div>
    )
}
