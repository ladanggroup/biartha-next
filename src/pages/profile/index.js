import AppLayout from '@/components/Layouts/AppLayout'
import LoadingUser from '@/components/LoadingUser'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { Dialog, Transition } from '@headlessui/react'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState, Fragment } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function register() {
    const { user } = useAuth({ middleware: 'auth' })

    //get user detail
    let [isOpen, setIsOpen] = useState(false)
    const [userDetail, setUserDetail] = useState([])
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardImage, setCardImage] = useState('')
    const [companyPosition, setCompanyPosition] = useState('')
    const [companyDevision, setCompanyDevision] = useState('')
    const [provinceId, setProvinceId] = useState('')
    const [cityId, setCityId] = useState('')
    const [districtId, setDistrictId] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [address, setAddress] = useState('')

    const getUserDetail = async () => {
        try {
            const res = await axios({
                method: 'GET',
                url: `/api/user/details`,
            }).then(res => {
                setUserDetail(res.data.data)
                setPhone(res.data.data.phone)
                setCardNumber(res.data.data.card_number)
                setCardImage(res.data.data.card_image)
                setCompanyPosition(res.data.data.company_position)
                setCompanyDevision(res.data.data.company_division)
                setProvinceId(res.data.data.province_id)
                setCityId(res.data.data.city_id)
                setDistrictId(res.data.data.district_id)
                setPostalCode(res.data.data.postal_code)
                setAddress(res.data.data.address)
            })
        } catch (e) {
            console.log(e.message)
        }
    }
    function toggleModal() {
        setIsOpen(isOpen => !isOpen)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('card_number', cardNumber)
        formData.append('company_position', companyPosition)
        formData.append('company_division', companyDevision)
        formData.append('province_id', provinceId)
        formData.append('city_id', cityId)
        formData.append('district_id', districtId)
        formData.append('postal_code', postalCode)
        formData.append('address', address)
        formData.append('_method', 'PUT')

        console.log(formData)
        if (userDetail) {
            try {
                await axios({
                    method: 'POST',
                    url: `/api/user/details/${userDetail.id}`,
                    data: formData,
                }).then(res => {
                    console.log(res)
                    toggleModal()
                    toast.success(res.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                })
            } catch (e) {
                console.log(e.message)
            }
        } else {
            await axios({
                method: 'POST',
                url: `/api/user/details`,
                data: formData,
            })
                .then(res => {
                    toggleModal()
                    toast.success(res.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    useEffect(() => {
        getUserDetail()
    }, [])

    return (
        <>
            {!user && <LoadingUser />}
            {user && (
                <>
                    <Head>
                        <title>{`${process.env.appName} - Profil`}</title>
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
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-400">
                                                2d ago
                                            </span>
                                            <span className="text-emerald-400">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                        <div className="mx-auto mt-6 w-fit">
                                            <img
                                                src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
                                                className="w-28 rounded-full "
                                                alt="profile picture"
                                            />
                                        </div>
                                        <div className="mt-4 text-center">
                                            <h2 className="text-2xl font-bold tracking-wide text-white">
                                                {user?.name}
                                            </h2>
                                            <p className="mt-1.5 font-semibold text-gray-400">
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
                                    <div className="h-fit rounded-lg bg-white shadow-sm">
                                        <div className="p-6">
                                            <div className="text-sm text-gray-600">
                                                <div className="mb-2 flex justify-between border-b-2 pb-2 ">
                                                    <div className="text-xl font-semibold text-gray-700">
                                                        Informasi Pribadi
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={toggleModal}>
                                                        Ubah Data
                                                    </button>
                                                </div>
                                                <div className="flex flex-col space-y-2">
                                                    <div className="flex space-x-2">
                                                        <div className="w-64">
                                                            Nomor Hp
                                                        </div>
                                                        <div className="">
                                                            {userDetail?.phone ||
                                                                '-'}
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <div className="w-64">
                                                            Nomor KTP
                                                        </div>
                                                        <div className="">
                                                            {userDetail?.card_number ||
                                                                '-'}
                                                        </div>
                                                        {userDetail?.card_image && (
                                                            <a
                                                                href="#"
                                                                className="text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full text-xs hover:bg-blue-200 flex justify-between space-x-2">
                                                                Lihat Foto KTP
                                                            </a>
                                                        )}
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <div className="w-64">
                                                            Posisi di Perusahaan
                                                        </div>
                                                        <div className="">
                                                            {userDetail?.company_position ||
                                                                '-'}
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <div className="w-64">
                                                            Jenis Perusahan
                                                        </div>
                                                        <div className="">
                                                            {userDetail?.company_division ||
                                                                '-'}
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <div className="w-64">
                                                            Kode POS
                                                        </div>
                                                        <div className="">
                                                            {userDetail?.postal_code ||
                                                                '-'}
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <div className="w-64">
                                                            Alamat
                                                        </div>
                                                        <div className="">
                                                            {userDetail?.address ||
                                                                '-'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
                                            <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-gray-900">
                                                    Ubah Data Anda
                                                </Dialog.Title>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="mt-2">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <Input
                                                                id="email"
                                                                label={'Email'}
                                                                placeholder={
                                                                    'emailanda@gmail.com'
                                                                }
                                                                type="email"
                                                                onChange={e =>
                                                                    setEmail(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                value={email}
                                                            />
                                                            <Input
                                                                id="phone"
                                                                label={
                                                                    'Nomor Hp'
                                                                }
                                                                placeholder={
                                                                    '08123456789'
                                                                }
                                                                type="tel"
                                                                onChange={e =>
                                                                    setPhone(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                value={phone}
                                                            />
                                                            <Input
                                                                id="cardNumber"
                                                                label={
                                                                    'Nomor KTP'
                                                                }
                                                                placeholder={
                                                                    '1234567890'
                                                                }
                                                                type="number"
                                                                onChange={e =>
                                                                    setCardNumber(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                value={
                                                                    cardNumber
                                                                }
                                                            />
                                                            <Input
                                                                id="cardImage"
                                                                label={
                                                                    'Foto KTP'
                                                                }
                                                                placeholder={
                                                                    'Foto KTP'
                                                                }
                                                                type="file"
                                                                onChange={e =>
                                                                    setCardImage(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                value={
                                                                    cardImage
                                                                }
                                                                accept="image/*"
                                                            />
                                                            <Input
                                                                id="companyPosition"
                                                                label={
                                                                    'Posisi di Perusahaan'
                                                                }
                                                                placeholder={
                                                                    'Manager'
                                                                }
                                                                type="text"
                                                                onChange={e =>
                                                                    setCompanyPosition(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                value={
                                                                    companyPosition
                                                                }
                                                            />
                                                            <Input
                                                                id="companyDevision"
                                                                label={
                                                                    'Jenis Perusahaan'
                                                                }
                                                                placeholder={
                                                                    'Penjualan & Retail'
                                                                }
                                                                type="text"
                                                                onChange={e =>
                                                                    setCompanyDevision(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                value={
                                                                    companyDevision
                                                                }
                                                            />
                                                            <Input
                                                                id="provinceId"
                                                                label={
                                                                    'Provinsi'
                                                                }
                                                                placeholder={
                                                                    'Jawa Timur'
                                                                }
                                                                type="number"
                                                                onChange={e =>
                                                                    setProvinceId(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                value={
                                                                    provinceId
                                                                }
                                                            />
                                                            <Input
                                                                id="cityId"
                                                                label={
                                                                    'Kabupaten/Kota'
                                                                }
                                                                placeholder={
                                                                    'Surabaya'
                                                                }
                                                                type="number"
                                                                onChange={e =>
                                                                    setCityId(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                value={cityId}
                                                            />
                                                            <Input
                                                                id="districtId"
                                                                label={
                                                                    'Kecaamatan'
                                                                }
                                                                placeholder={
                                                                    'Gayungan'
                                                                }
                                                                type="number"
                                                                onChange={e =>
                                                                    setDistrictId(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                value={
                                                                    districtId
                                                                }
                                                            />
                                                            <Input
                                                                id="postalCode"
                                                                label={
                                                                    'Kode Pos'
                                                                }
                                                                placeholder={
                                                                    '60231'
                                                                }
                                                                type="text"
                                                                onChange={e =>
                                                                    setPostalCode(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                value={
                                                                    postalCode
                                                                }
                                                            />
                                                            <Input
                                                                id="address"
                                                                label={
                                                                    'Alamat Lengkap'
                                                                }
                                                                placeholder={
                                                                    'Jln, Raya Gayungan No. 1'
                                                                }
                                                                type="text"
                                                                onChange={e =>
                                                                    setAddress(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                value={address}
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
                        <ToastContainer />
                    </AppLayout>
                </>
            )}
        </>
    )
}

function Input({ placeholder, id, label, value, ...props }) {
    return (
        <div className="">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-600">
                {label}
            </label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id={id}
                placeholder={placeholder}
                value={value}
                {...props}
            />
        </div>
    )
}
