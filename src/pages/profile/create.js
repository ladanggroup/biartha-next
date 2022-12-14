import InputSelect from '@/components/InputSelect'
import InputWithLabel from '@/components/InputWithLabel'
import AppLayout from '@/components/Layouts/AppLayout'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import React, { use, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function createCompany() {
    const { user } = useAuth({ middleware: 'auth' })
    const [userDetail, setUserDetail] = React.useState({
        user_id: '',
        phone: '',
        card_number: '',
        card_image: '',
        company_position: '',
        address: '',
        province_id: '',
        city_id: '',
        district_id: '',
        postal_code: '',
        is_filled: false,
    })
    const [company, setCompany] = React.useState({
        companyName: '',
        companyType: '',
        companyAddress: '',
        companyPhone: '',
        companyIndustry: '',
        employeeCount: '',
        foundingDate: '',
        companyProvinceId: '',
        companyCityId: '',
        companyDistrictId: '',
        companyDescription: '',
        companyPostalCode: '',
        bank_name: '',
        bank_account_number: '',
        bank_account_name: '',
    })
    const [province, setProvince] = React.useState([])
    const [city, setCity] = React.useState([])
    const [district, setDistrict] = React.useState([])
    const [validation, setValidation] = React.useState([])
    const router = useRouter()
    const [uploadProgress, setUploadProgress] = React.useState(0)
    const handleSubmit = async e => {
        e.preventDefault()
        // setValidation([])
        const formData = new FormData()
        if (userDetail.is_filled === true) {
            formData.append('name', company.companyName)
            formData.append('type', company.companyType)
            formData.append('address', company.companyAddress)
            formData.append('phone', company.companyPhone)
            formData.append('company_industry', company.companyIndustry)
            formData.append('employee_count', company.employeeCount)
            formData.append('founding_date', company.foundingDate)
            formData.append('province_id', company.companyProvinceId)
            formData.append('city_id', company.companyCityId)
            formData.append('district_id', company.companyDistrictId)
            formData.append('description', company.companyDescription)
            formData.append('postal_code', company.companyPostalCode)
        } else {
            formData.append('user_id', userDetail.user_id)
            formData.append('phone', userDetail.phone)
            formData.append('card_number', userDetail.card_number)
            formData.append('card_image', userDetail.card_image)
            formData.append('company_position', userDetail.company_position)
            formData.append('address', userDetail.address)
            formData.append('province_id', userDetail.province_id)
            formData.append('city_id', userDetail.city_id)
            formData.append('district_id', userDetail.district_id)
            formData.append('postal_code', userDetail.postal_code)
        }
        try {
            await axios({
                method: 'POST',
                url:
                    userDetail.is_filled === true
                        ? '/api/company'
                        : '/api/user/details',
                data: formData,
            }).then(res => {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
                window.location.reload()
            })
        } catch (err) {
            setValidation(err.response.data.errors)
        }
    }

    const getPronvince = async () => {
        const res = await axios({
            method: 'GET',
            url: '/api/get/province',
        })
            .then(res => {
                setProvince(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getCity = async id => {
        const res = await axios({
            method: 'GET',
            url: '/api/get/city/' + id,
        }).then(res => {
            setCity(res.data)
        })
    }

    const getDistrict = async id => {
        const res = await axios({
            method: 'GET',
            url: '/api/get/district/' + id,
        }).then(res => {
            setDistrict(res.data)
        })
    }

    const getUserDetail = async () => {
        const res = await axios({
            method: 'GET',
            url: '/api/user/details',
        })
            .then(res => {
                setUserDetail({
                    ...userDetail,
                    is_filled: true,
                })
            })
            .catch(err => {
                setUserDetail({
                    ...userDetail,
                    is_filled: false,
                })
            })
    }

    const uploadFile = async e => {
        e.preventDefault()
        const file = e.target.files[0]
        setUploadProgress(0)
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
                setUserDetail({
                    ...userDetail,
                    card_image: res.data.data.file_url,
                })
            })
        }
    }

    useEffect(() => {
        if (!router.isReady) return
        getPronvince()
        getUserDetail()
        if (user?.company_id) {
            router.push('/dashboard')
        }
    }, [router.isReady])
    return (
        <AppLayout
            header={
                <h2 className="flex justify-between text-xl font-semibold leading-tight text-gray-800">
                    <div> Silahkan Melengkapi Data Anda Terlebih dahulu</div>
                </h2>
            }>
            <div className="py-12">
                <div className="mx-auto flex max-w-7xl space-x-4 sm:px-6 lg:px-8">
                    <div className="w-full space-y-4">
                        <div className="h-fit overflow-hidden rounded-lg bg-white shadow-sm">
                            {!userDetail.is_filled && (
                                <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                    <div className="text-xl font-semibold text-gray-700">
                                        Informasi Pribadi
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mt-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputWithLabel
                                                    id="phone"
                                                    label={'Nomor Hp'}
                                                    placeholder={'08123456789'}
                                                    type="tel"
                                                    onChange={e =>
                                                        setUserDetail({
                                                            ...userDetail,
                                                            phone:
                                                                e.target.value,
                                                        })
                                                    }
                                                    value={userDetail.phone}
                                                    error={
                                                        validation.phone && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.phone
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                    required
                                                    maxLength="14"
                                                />
                                                <InputWithLabel
                                                    id="cardNumber"
                                                    label={'Nomor KTP'}
                                                    placeholder={'1234567890'}
                                                    type="number"
                                                    onChange={e =>
                                                        setUserDetail({
                                                            ...userDetail,
                                                            card_number:
                                                                e.target.value,
                                                        })
                                                    }
                                                    value={
                                                        userDetail.card_number
                                                    }
                                                    error={
                                                        validation.card_number && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.card_number
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputWithLabel
                                                    id="cardImage"
                                                    label={'Foto KTP'}
                                                    placeholder={'Foto KTP'}
                                                    type="file"
                                                    onChange={uploadFile}
                                                    accept="image/*"
                                                    helper={
                                                        <p
                                                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                                            id="file_input_help">
                                                            PNG atau JPG (MAX.
                                                            2mb)
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
                                                    {uploadProgress > 0 && (
                                                        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                                            <div
                                                                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                                                style={{
                                                                    width: `${uploadProgress}%`,
                                                                }}>
                                                                {uploadProgress}
                                                                %
                                                            </div>
                                                        </div>
                                                    )}
                                                </InputWithLabel>

                                                <input
                                                    hidden
                                                    type="text"
                                                    value={
                                                        setUserDetail.card_image ||
                                                        ''
                                                    }
                                                />
                                                <InputWithLabel
                                                    id="companyPosition"
                                                    label={
                                                        'Posisi di Perusahaan'
                                                    }
                                                    placeholder={'Manager'}
                                                    type="text"
                                                    onChange={e =>
                                                        setUserDetail({
                                                            ...userDetail,
                                                            company_position:
                                                                e.target.value,
                                                        })
                                                    }
                                                    value={
                                                        userDetail.company_position
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
                                                <InputSelect
                                                    id="provinceId"
                                                    label={'Provinsi'}
                                                    placeholder={
                                                        'Pilih Provinsi'
                                                    }
                                                    value={
                                                        userDetail.province_id
                                                    }
                                                    onChange={e => {
                                                        setUserDetail({
                                                            ...userDetail,
                                                            province_id:
                                                                e.target.value,
                                                        }),
                                                            getCity(
                                                                e.target.value,
                                                            )
                                                    }}
                                                    error={
                                                        validation.province_id && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.province_id
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                    required>
                                                    {province.map(
                                                        (item, index) => (
                                                            <option
                                                                key={index}
                                                                value={item.id}>
                                                                {item.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </InputSelect>

                                                <InputSelect
                                                    id="cityId"
                                                    label={'Kabupaten/Kota'}
                                                    placeholder={
                                                        'Pilih Kabupaten/Kota'
                                                    }
                                                    onChange={e => {
                                                        setUserDetail({
                                                            ...userDetail,
                                                            city_id:
                                                                e.target.value,
                                                        }),
                                                            getDistrict(
                                                                e.target.value,
                                                            )
                                                    }}
                                                    value={userDetail.city_id}
                                                    error={
                                                        validation.city_id && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.city_id
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                    required>
                                                    {city.map((item, index) => (
                                                        <option
                                                            key={index}
                                                            value={item.id}>
                                                            {item.type}{' '}
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </InputSelect>

                                                <InputSelect
                                                    id="districtId"
                                                    label={'Kecamatan'}
                                                    placeholder={
                                                        'Pilih Kecamatan'
                                                    }
                                                    onChange={e =>
                                                        setUserDetail({
                                                            ...userDetail,
                                                            district_id:
                                                                e.target.value,
                                                        })
                                                    }
                                                    value={
                                                        userDetail.district_id
                                                    }
                                                    error={
                                                        validation.district_id && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.district_id
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                    required>
                                                    {district.map(
                                                        (item, index) => (
                                                            <option
                                                                key={index}
                                                                value={item.id}>
                                                                {item.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </InputSelect>

                                                <InputWithLabel
                                                    id="postalCode"
                                                    label={'Kode Pos'}
                                                    placeholder={'60231'}
                                                    type="text"
                                                    onChange={e =>
                                                        setUserDetail({
                                                            ...userDetail,
                                                            postal_code:
                                                                e.target.value,
                                                        })
                                                    }
                                                    value={
                                                        userDetail.postal_code
                                                    }
                                                    error={
                                                        validation.postal_code && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.postal_code
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                    maxLength={5}
                                                    required
                                                />
                                                <InputWithLabel
                                                    id="address"
                                                    label={'Alamat Lengkap'}
                                                    placeholder={
                                                        'Jln, Raya Gayungan No. 1'
                                                    }
                                                    type="text"
                                                    onChange={e =>
                                                        setUserDetail({
                                                            ...userDetail,
                                                            address:
                                                                e.target.value,
                                                        })
                                                    }
                                                    value={userDetail.address}
                                                    error={
                                                        validation.address && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.address
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-end space-x-2">
                                            <button
                                                disabled={
                                                    uploadProgress > 0 &&
                                                    uploadProgress < 100
                                                        ? true
                                                        : false
                                                }
                                                type="submit"
                                                className="disabled:bg-opacity-50 disabled:text-opacity-50 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                Simpan Data
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                            {userDetail.is_filled && (
                                <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                    <div className="text-xl font-semibold text-gray-700">
                                        Informasi Perusahaan
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mt-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputSelect
                                                    id="companyType"
                                                    label={'Jenis Perusahaan'}
                                                    placeholder={
                                                        'Pilih Jenis Perusahaan'
                                                    }
                                                    onChange={e =>
                                                        setCompany({
                                                            ...company,
                                                            companyType:
                                                                e.target.value,
                                                        })
                                                    }
                                                    error={
                                                        validation.type && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.type
                                                                }
                                                            </span>
                                                        )
                                                    }>
                                                    <option value="PT">
                                                        PT
                                                    </option>
                                                    <option value="CV">
                                                        CV
                                                    </option>
                                                    <option value="UD">
                                                        UD
                                                    </option>
                                                </InputSelect>
                                                <InputWithLabel
                                                    id="companyName"
                                                    label={'Nama Perusahaan'}
                                                    placeholder={
                                                        'Lancar Selalu'
                                                    }
                                                    type="text"
                                                    onChange={e =>
                                                        setCompany({
                                                            ...company,
                                                            companyName:
                                                                e.target.value,
                                                        })
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
                                                    id="companyIndustry"
                                                    label={'Bidang Usaha'}
                                                    placeholder={
                                                        'Penjualan & Retail'
                                                    }
                                                    type="text"
                                                    onChange={e =>
                                                        setCompany({
                                                            ...company,
                                                            companyIndustry:
                                                                e.target.value,
                                                        })
                                                    }
                                                    error={
                                                        validation.company_industry && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.company_industry
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                />
                                                <InputWithLabel
                                                    id="phone"
                                                    label={'Nomor Hp'}
                                                    placeholder={'08123456789'}
                                                    type="tel"
                                                    onChange={e =>
                                                        setCompany({
                                                            ...company,
                                                            companyPhone:
                                                                e.target.value,
                                                        })
                                                    }
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
                                                    id="employeeCount"
                                                    label={'Jumlah Karyawan'}
                                                    placeholder={'50'}
                                                    type="number"
                                                    onChange={e =>
                                                        setCompany({
                                                            ...company,
                                                            employeeCount:
                                                                e.target.value,
                                                        })
                                                    }
                                                    error={
                                                        validation.employee_count && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.employee_count
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                />
                                                <InputWithLabel
                                                    id="foundingDate"
                                                    label={
                                                        'Tanggal Berdiri Perusahaan'
                                                    }
                                                    placeholder={'1990-01-01'}
                                                    type="date"
                                                    onChange={e =>
                                                        setCompany({
                                                            ...company,
                                                            foundingDate:
                                                                e.target.value,
                                                        })
                                                    }
                                                    error={
                                                        validation.founding_date && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.founding_date
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                />
                                                <InputWithLabel
                                                    id="companyDescription"
                                                    label={
                                                        'Deskripsi Perusahaan'
                                                    }
                                                    placeholder={
                                                        'Perusahaan yang bergerak di bidang pertambangan'
                                                    }
                                                    type="text"
                                                    onChange={e =>
                                                        setCompany({
                                                            ...company,
                                                            companyDescription:
                                                                e.target.value,
                                                        })
                                                    }
                                                    error={
                                                        validation.description && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.description
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
                                                    onChange={e => {
                                                        setCompany({
                                                            ...company,
                                                            companyProvinceId:
                                                                e.target.value,
                                                        })
                                                        getCity(e.target.value)
                                                    }}
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
                                                        (item, index) => (
                                                            <option
                                                                key={index}
                                                                value={item.id}>
                                                                {item.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </InputSelect>

                                                <InputSelect
                                                    id="cityId"
                                                    label={'Kabupaten/Kota'}
                                                    placeholder={
                                                        'Pilih Kabupaten/Kota'
                                                    }
                                                    onChange={e => {
                                                        setCompany({
                                                            ...company,
                                                            companyCityId:
                                                                e.target.value,
                                                        })
                                                        getDistrict(
                                                            e.target.value,
                                                        )
                                                    }}
                                                    error={
                                                        validation.city_id && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.city_id
                                                                }
                                                            </span>
                                                        )
                                                    }>
                                                    {city.map((item, index) => (
                                                        <option
                                                            key={index}
                                                            value={item.id}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </InputSelect>
                                                <InputSelect
                                                    id="districtId"
                                                    label={'Kecamatan'}
                                                    placeholder={
                                                        'Pilih Kecamatan'
                                                    }
                                                    onChange={e =>
                                                        setCompany({
                                                            ...company,
                                                            companyDistrictId:
                                                                e.target.value,
                                                        })
                                                    }
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
                                                        (item, index) => (
                                                            <option
                                                                key={index}
                                                                value={item.id}>
                                                                {item.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </InputSelect>
                                                <InputWithLabel
                                                    id="postalCode"
                                                    label={'Kode Pos'}
                                                    placeholder={'60231'}
                                                    type="text"
                                                    onChange={e =>
                                                        setCompany({
                                                            ...company,
                                                            companyPostalCode:
                                                                e.target.value,
                                                        })
                                                    }
                                                    value={
                                                        company.companyPostalCode
                                                    }
                                                    error={
                                                        validation.postal_code && (
                                                            <span className="text-red-500 text-sm">
                                                                {
                                                                    validation.postal_code
                                                                }
                                                            </span>
                                                        )
                                                    }
                                                    maxLength="5"
                                                />
                                                <InputWithLabel
                                                    id="address"
                                                    label={'Alamat Lengkap'}
                                                    placeholder={
                                                        'Jln, Raya Gayungan No. 1'
                                                    }
                                                    type="text"
                                                    onChange={e =>
                                                        setCompany({
                                                            ...company,
                                                            companyAddress:
                                                                e.target.value,
                                                        })
                                                    }
                                                    value={
                                                        company.companyAddress
                                                    }
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
                                                type="submit"
                                                className=" inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                Simpan Data
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
