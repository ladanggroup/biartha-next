import axios from '@/lib/axios'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import InputWithLabel from './InputWithLabel'

export default function UserDetail() {
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
        <div>
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
                                    <div className="w-64">Nomor Hp</div>
                                    <div className="">
                                        {userDetail?.phone || '-'}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-64">Nomor KTP</div>
                                    <div className="">
                                        {userDetail?.card_number || '-'}
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
                                        {userDetail?.company_position || '-'}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-64">Jenis Perusahan</div>
                                    <div className="">
                                        {userDetail?.company_division || '-'}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-64">Kode POS</div>
                                    <div className="">
                                        {userDetail?.postal_code || '-'}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-64">Alamat</div>
                                    <div className="">
                                        {userDetail?.address || '-'}
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
                                                <InputWithLabel
                                                    id="email"
                                                    label={'Email'}
                                                    placeholder={
                                                        'emailanda@gmail.com'
                                                    }
                                                    type="email"
                                                    onChange={e =>
                                                        setEmail(e.target.value)
                                                    }
                                                    value={email}
                                                />
                                                <InputWithLabel
                                                    id="phone"
                                                    label={'Nomor Hp'}
                                                    placeholder={'08123456789'}
                                                    type="tel"
                                                    onChange={e =>
                                                        setPhone(e.target.value)
                                                    }
                                                    value={phone}
                                                />
                                                <InputWithLabel
                                                    id="cardNumber"
                                                    label={'Nomor KTP'}
                                                    placeholder={'1234567890'}
                                                    type="number"
                                                    onChange={e =>
                                                        setCardNumber(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={cardNumber}
                                                />
                                                <InputWithLabel
                                                    id="cardImage"
                                                    label={'Foto KTP'}
                                                    placeholder={'Foto KTP'}
                                                    type="file"
                                                    onChange={e =>
                                                        setCardImage(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={cardImage}
                                                    accept="image/*"
                                                />
                                                <InputWithLabel
                                                    id="companyPosition"
                                                    label={
                                                        'Posisi di Perusahaan'
                                                    }
                                                    placeholder={'Manager'}
                                                    type="text"
                                                    onChange={e =>
                                                        setCompanyPosition(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={companyPosition}
                                                />
                                                <InputWithLabel
                                                    id="companyDevision"
                                                    label={'Jenis Perusahaan'}
                                                    placeholder={
                                                        'Penjualan & Retail'
                                                    }
                                                    type="text"
                                                    onChange={e =>
                                                        setCompanyDevision(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={companyDevision}
                                                />
                                                <InputWithLabel
                                                    id="provinceId"
                                                    label={'Provinsi'}
                                                    placeholder={'Jawa Timur'}
                                                    type="number"
                                                    onChange={e =>
                                                        setProvinceId(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={provinceId}
                                                />
                                                <InputWithLabel
                                                    id="cityId"
                                                    label={'Kabupaten/Kota'}
                                                    placeholder={'Surabaya'}
                                                    type="number"
                                                    onChange={e =>
                                                        setCityId(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={cityId}
                                                />
                                                <InputWithLabel
                                                    id="districtId"
                                                    label={'Kecaamatan'}
                                                    placeholder={'Gayungan'}
                                                    type="number"
                                                    onChange={e =>
                                                        setDistrictId(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={districtId}
                                                />
                                                <InputWithLabel
                                                    id="postalCode"
                                                    label={'Kode Pos'}
                                                    placeholder={'60231'}
                                                    type="text"
                                                    onChange={e =>
                                                        setPostalCode(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={postalCode}
                                                />
                                                <InputWithLabel
                                                    id="address"
                                                    label={'Alamat Lengkap'}
                                                    placeholder={
                                                        'Jln, Raya Gayungan No. 1'
                                                    }
                                                    type="text"
                                                    onChange={e =>
                                                        setAddress(
                                                            e.target.value,
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
            <ToastContainer />
        </div>
    )
}
