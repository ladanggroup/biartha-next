import axios from '@/lib/axios'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import InputSelect from './InputSelect'
import InputWithLabel from './InputWithLabel'
import LoadingUser from './LoadingUser'

export default function UserDetail() {
    let [isOpen, setIsOpen] = useState(false)
    const [validation, setValidation] = useState([])
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
    const [loading, setLoading] = useState(true)
    const [province, setProvince] = useState([])
    const [city, setCity] = useState([])
    const [district, setDistrict] = useState([])

    const getPronvince = async () => {
        const res = await axios({
            method: 'GET',
            url: '/api/get/province',
        }).then(res => {
            setProvince(res.data)
        })
    }

    const getCity = async id => {
        try {
            if (id) {
                const res = await axios({
                    method: 'GET',
                    url: `/api/get/city/${id}`,
                }).then(res => {
                    setCity(res.data)
                })
            }
        } catch (error) {
            console.log(error)
        }

        // const res = await axios({
        //     method: 'GET',
        //     url: '/api/get/city/' + id,
        // }).then(res => {
        //     setCity(res.data)
        // })
    }

    const getDistrict = async id => {
        try {
            if (id) {
                const res = await axios({
                    method: 'GET',
                    url: '/api/get/district/' + id,
                }).then(res => {
                    setDistrict(res.data)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const uploadFile = async e => {
        e.preventDefault()
        const file = e.target.files[0]
        if (file.size > 2000000) {
            e.target.value = null
            toast.error('Ukuran file tidak boleh lebih dari 2mb', {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        } else if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            e.target.value = null
            toast.error('Format file tidak didukung', {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        } else {
            const folder = 'customer/card_image'
            const formData = new FormData()
            formData.append('file', file)
            formData.append('folder', folder)
            const res = await axios({
                method: 'POST',
                url: '/api/upload-file',
                data: formData,
            }).then(res => {
                setCardImage(res.data.data.file_url)
            })
        }
    }

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
            setLoading(false)
        }
    }
    function toggleModal() {
        setIsOpen(isOpen => !isOpen)

        if (province.length === 0) {
            getPronvince()
        }
        if (city.length === 0) {
            getCity(provinceId)
        }
        if (district.length === 0) {
            getDistrict(cityId)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('card_number', cardNumber)
        formData.append('card_image', cardImage)
        formData.append('company_position', companyPosition)
        formData.append('company_division', companyDevision)
        formData.append('province_id', provinceId)
        formData.append('city_id', cityId)
        formData.append('district_id', districtId)
        formData.append('postal_code', postalCode)
        formData.append('address', address)
        formData.append('_method', 'PUT')

        if (userDetail) {
            try {
                await axios({
                    method: 'POST',
                    url: `/api/user/details/${userDetail.id}`,
                    data: formData,
                }).then(res => {
                    getUserDetail()
                    toggleModal()
                    toast.success(res.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                })
            } catch (err) {
                setValidation(err.response.data.errors)
            }
        } else {
            await axios({
                method: 'POST',
                url: `/api/user/details`,
                data: formData,
            })
                .then(res => {
                    getUserDetail()
                    toggleModal()
                    toast.success(res.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                })
                .catch(err => {
                    setValidation(err.response.data.errors)
                })
        }
    }
    useEffect(() => {
        getUserDetail()
    }, [])

    return (
        <>
            {userDetail.length === 0 && loading === true ? (
                <LoadingUser />
            ) : (
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
                                            <div className="w-64">
                                                Nomor KTP
                                            </div>
                                            <div className="">
                                                {userDetail?.card_number || '-'}
                                            </div>
                                            {userDetail?.card_image && (
                                                <a
                                                    href={
                                                        userDetail?.card_image
                                                    }
                                                    target={'_blank'}
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
                                        <div className="flex space-x-2">
                                            <div className="w-64">
                                                Kecamatan
                                            </div>
                                            <div className="">
                                                {userDetail?.district || '-'}
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <div className="w-64">
                                                Kabupaten/Kota
                                            </div>
                                            <div className="">
                                                {userDetail?.city || '-'}
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <div className="w-64">Provinsi</div>
                                            <div className="">
                                                {userDetail?.province || '-'}
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
                                                        {/* <InputWithLabel
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
                                                    error={
                                                        validation.email && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.email
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                /> */}
                                                        <InputWithLabel
                                                            id="phone"
                                                            label={'Nomor Hp'}
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
                                                            error={
                                                                validation.phone && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.phone
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                        <InputWithLabel
                                                            id="cardNumber"
                                                            label={'Nomor KTP'}
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
                                                            value={cardNumber}
                                                            error={
                                                                validation.card_number && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.card_number
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                        <InputWithLabel
                                                            id="cardImage"
                                                            label={'Foto KTP'}
                                                            placeholder={
                                                                'Foto KTP'
                                                            }
                                                            type="file"
                                                            onChange={
                                                                uploadFile
                                                            }
                                                            accept="image/*"
                                                            helper={
                                                                <p
                                                                    class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                                                    id="file_input_help">
                                                                    PNG atau JPG
                                                                    (MAX. 2mb)
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
                                                            }
                                                        />
                                                        <InputWithLabel
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
                                                            error={
                                                                validation.company_position && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.company_position
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                        <InputWithLabel
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
                                                            error={
                                                                validation.company_division && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.company_division
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                        <InputSelect
                                                            id="provinceId"
                                                            label={'Provinsi'}
                                                            placeholder={
                                                                'Pilih Provinsi'
                                                            }
                                                            onChange={e =>
                                                                setProvinceId(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            value={provinceId}
                                                            error={
                                                                validation.province_id && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.province_id
                                                                        }
                                                                    </span>
                                                                )
                                                            }>
                                                            {province.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            item.id
                                                                        }
                                                                        onClick={e =>
                                                                            getCity(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }>
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                        </InputSelect>

                                                        <InputSelect
                                                            id="cityId"
                                                            label={
                                                                'Kabupaten/Kota'
                                                            }
                                                            placeholder={
                                                                'Pilih Kabupaten/Kota'
                                                            }
                                                            onChange={e =>
                                                                setCityId(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            value={cityId}
                                                            error={
                                                                validation.city_id && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.city_id
                                                                        }
                                                                    </span>
                                                                )
                                                            }>
                                                            {city.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            item.id
                                                                        }
                                                                        onClick={e =>
                                                                            getDistrict(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }>
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                        </InputSelect>
                                                        <InputSelect
                                                            id="districtId"
                                                            label={'Kecamatan'}
                                                            placeholder={
                                                                'Pilih Kecamatan'
                                                            }
                                                            onChange={e =>
                                                                setDistrictId(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            value={districtId}
                                                            error={
                                                                validation.district_id && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.district_id
                                                                        }
                                                                    </span>
                                                                )
                                                            }>
                                                            {district.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            item.id
                                                                        }>
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                        </InputSelect>
                                                        <InputWithLabel
                                                            id="postalCode"
                                                            label={'Kode Pos'}
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
                                                            value={postalCode}
                                                            error={
                                                                validation.postal_code && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.postal_code
                                                                        }
                                                                    </span>
                                                                )
                                                            }
                                                        />
                                                        <InputWithLabel
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
                                                            error={
                                                                validation.address && (
                                                                    <span className="text-red-500 text-sm">
                                                                        {
                                                                            validation.address
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
        </>
    )
}
