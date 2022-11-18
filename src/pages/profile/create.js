import InputSelect from '@/components/InputSelect'
import InputWithLabel from '@/components/InputWithLabel'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Link from 'next/link'
import { Router } from 'next/router'
import React, { use, useEffect } from 'react'

export default function createCompany() {
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
    })
    const [province, setProvince] = React.useState([])
    const [city, setCity] = React.useState([])
    const [district, setDistrict] = React.useState([])
    const [validation, setValidation] = React.useState([])

    const handleSubmit = async e => {
        e.preventDefault()
        setValidation([])
        const formData = new FormData()
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

        await axios({
            method: 'POST',
            url: `/api/company`,
            data: formData,
        })
            .then(res => {
                Router.push('/dashboard')
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            })
            .catch(err => {
                setValidation(err.response.data.errors)
            })
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

    useEffect(() => {
        getPronvince()
    }, [])
    return (
        <AppLayout
            header={
                <h2 className="flex justify-between text-xl font-semibold leading-tight text-gray-800">
                    <div> Silahkan Melengkapi Data Anda Terlebih dahulu</div>
                </h2>
            }>
            <div className="container mx-auto px-6 flex flex-col justify-center w-screen py-4 space-y-4">
                <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="text-xl font-semibold text-gray-700">
                        Informasi Perusahaan
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-2">
                            <div className="grid grid-cols-2 gap-4">
                                <InputWithLabel
                                    id="companyType"
                                    label={'Jenis Perusahaan'}
                                    placeholder={'PT, CV, UD'}
                                    type="text"
                                    onChange={e =>
                                        setCompany({
                                            ...company,
                                            companyType: e.target.value,
                                        })
                                    }
                                    error={
                                        validation.type && (
                                            <span className="text-red-500 text-sm">
                                                {validation.type}
                                            </span>
                                        )
                                    }
                                />
                                <InputWithLabel
                                    id="companyName"
                                    label={'Nama Perusahaan'}
                                    placeholder={'Lancar Selalu'}
                                    type="text"
                                    onChange={e =>
                                        setCompany({
                                            ...company,
                                            companyName: e.target.value,
                                        })
                                    }
                                    error={
                                        validation.name && (
                                            <span className="text-red-500 text-sm">
                                                {validation.name}
                                            </span>
                                        )
                                    }
                                />
                                <InputWithLabel
                                    id="companyIndustry"
                                    label={'Bidang Usaha'}
                                    placeholder={'Penjualan & Retail'}
                                    type="text"
                                    onChange={e =>
                                        setCompany({
                                            ...company,
                                            companyIndustry: e.target.value,
                                        })
                                    }
                                    error={
                                        validation.company_industry && (
                                            <span className="text-red-500 text-sm">
                                                {validation.company_industry}
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
                                            companyPhone: e.target.value,
                                        })
                                    }
                                    error={
                                        validation.phone && (
                                            <span className="text-red-500 text-sm">
                                                {validation.phone}
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
                                            employeeCount: e.target.value,
                                        })
                                    }
                                    error={
                                        validation.employee_count && (
                                            <span className="text-red-500 text-sm">
                                                {validation.employee_count}
                                            </span>
                                        )
                                    }
                                />
                                <InputWithLabel
                                    id="foundingDate"
                                    label={'Tanggal Berdiri Perusahaan'}
                                    placeholder={'1990-01-01'}
                                    type="date"
                                    onChange={e =>
                                        setCompany({
                                            ...company,
                                            foundingDate: e.target.value,
                                        })
                                    }
                                    error={
                                        validation.founding_date && (
                                            <span className="text-red-500 text-sm">
                                                {validation.founding_date}
                                            </span>
                                        )
                                    }
                                />
                                <InputWithLabel
                                    id="companyDescription"
                                    label={'Deskripsi Perusahaan'}
                                    placeholder={
                                        'Perusahaan yang bergerak di bidang pertambangan'
                                    }
                                    type="text"
                                    onChange={e =>
                                        setCompany({
                                            ...company,
                                            companyDescription: e.target.value,
                                        })
                                    }
                                    error={
                                        validation.description && (
                                            <span className="text-red-500 text-sm">
                                                {validation.description}
                                            </span>
                                        )
                                    }
                                />
                                <InputSelect
                                    id="provinceId"
                                    label={'Provinsi'}
                                    placeholder={'Pilih Provinsi'}
                                    onChange={e =>
                                        setCompany({
                                            ...company,
                                            companyProvinceId: e.target.value,
                                        })
                                    }
                                    error={
                                        validation.province_id && (
                                            <span className="text-red-500 text-sm">
                                                {validation.province_id}
                                            </span>
                                        )
                                    }>
                                    {province.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item.id}
                                            onClick={e =>
                                                getCity(e.target.value)
                                            }>
                                            {item.name}
                                        </option>
                                    ))}
                                </InputSelect>

                                <InputSelect
                                    id="cityId"
                                    label={'Kabupaten/Kota'}
                                    placeholder={'Pilih Kabupaten/Kota'}
                                    onChange={e =>
                                        setCompany({
                                            ...company,
                                            companyCityId: e.target.value,
                                        })
                                    }
                                    error={
                                        validation.city_id && (
                                            <span className="text-red-500 text-sm">
                                                {validation.city_id}
                                            </span>
                                        )
                                    }>
                                    {city.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item.id}
                                            onClick={e =>
                                                getDistrict(e.target.value)
                                            }>
                                            {item.name}
                                        </option>
                                    ))}
                                </InputSelect>
                                <InputSelect
                                    id="districtId"
                                    label={'Kecamatan'}
                                    placeholder={'Pilih Kecamatan'}
                                    onChange={e =>
                                        setCompany({
                                            ...company,
                                            companyDistrictId: e.target.value,
                                        })
                                    }
                                    error={
                                        validation.district_id && (
                                            <span className="text-red-500 text-sm">
                                                {validation.district_id}
                                            </span>
                                        )
                                    }>
                                    {district.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </InputSelect>
                                <InputWithLabel
                                    id="postalCode"
                                    label={'Kode Pos'}
                                    placeholder={'60231'}
                                    type="text"
                                    onChange={e =>
                                        setCompany({
                                            ...company,
                                            companyPostalCode: e.target.value,
                                        })
                                    }
                                    value={company.companyPostalCode}
                                    error={
                                        validation.postal_code && (
                                            <span className="text-red-500 text-sm">
                                                {validation.postal_code}
                                            </span>
                                        )
                                    }
                                />
                                <InputWithLabel
                                    id="address"
                                    label={'Alamat Lengkap'}
                                    placeholder={'Jln, Raya Gayungan No. 1'}
                                    type="text"
                                    onChange={e =>
                                        setCompany({
                                            ...company,
                                            companyAddress: e.target.value,
                                        })
                                    }
                                    value={company.companyAddress}
                                    error={
                                        validation.address && (
                                            <span className="text-red-500 text-sm">
                                                {validation.address}
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
        </AppLayout>
    )
}
