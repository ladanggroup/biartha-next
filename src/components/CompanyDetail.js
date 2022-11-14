import axios from '@/lib/axios'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import InputWithLabel from './InputWithLabel'

export default function CompanyDetail() {
    let [isOpen, setIsOpen] = useState(false)
    const [companyId, setCompanyId] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [companyType, setCompanyType] = useState('')
    const [companyIndustry, setCompanyIndustry] = useState('')
    const [employeeCount, setEmployeeCount] = useState('')
    const [foundingDate, setFoundingDate] = useState('')
    const [companyPhone, setCompanyPhone] = useState('')
    const [companyDescription, setCompanyDescription] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [companyProvinceId, setCompanyProvinceId] = useState('')
    const [companyCityId, setCompanyCityId] = useState('')
    const [companyDistrictId, setCompanyDistrictId] = useState('')
    const [companyPostalCode, setCompanyPostalCode] = useState('')

    const getCompanyDetail = async () => {
        try {
            const res = await axios({
                method: 'GET',
                url: `/api/company`,
            }).then(res => {
                setCompanyId(res.data.data.id)
                setCompanyName(res.data.data.name)
                setCompanyType(res.data.data.type)
                // this company industry still typo and need to be fixed
                setCompanyIndustry(res.data.data.company_indutry)
                setEmployeeCount(res.data.data.employee_count)
                setFoundingDate(res.data.data.founding_date)
                setCompanyPhone(res.data.data.phone)
                setCompanyDescription(res.data.data.description)
                setCompanyAddress(res.data.data.address)
                setCompanyProvinceId(res.data.data.province_id)
                setCompanyCityId(res.data.data.city_id)
                setCompanyDistrictId(res.data.data.district_id)
                setCompanyPostalCode(res.data.data.postal_code)
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
        formData.append('name', companyName)
        formData.append('type', companyType)
        formData.append('company_indutry', companyIndustry)
        formData.append('employee_count', employeeCount)
        formData.append('founding_date', foundingDate)
        formData.append('phone', companyPhone)
        formData.append('description', companyDescription)
        formData.append('address', companyAddress)
        formData.append('province_id', companyProvinceId)
        formData.append('city_id', companyCityId)
        formData.append('district_id', companyDistrictId)
        formData.append('postal_code', companyPostalCode)

        console.log(formData)

        await axios({
            method: 'POST',
            url: `/api/company`,
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

    useEffect(() => {
        getCompanyDetail()
    }, [])

    return (
        <div>
            <div className="w-full space-y-4">
                <div className="h-fit rounded-lg bg-white shadow-sm">
                    <div className="p-6">
                        <div className="text-sm text-gray-600">
                            <div className="mb-2 flex justify-between border-b-2 pb-2 ">
                                <div className="text-xl font-semibold text-gray-700">
                                    Informasi Perusahaan
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
                                    <div className="w-64">Nama Perusahaan</div>
                                    <div className="">{companyName || '-'}</div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-64">Jenis Perusahaan</div>
                                    <div className="">{companyType || '-'}</div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-64">
                                        Bidang Usaha Perusahaan
                                    </div>
                                    <div className="">
                                        {companyIndustry || '-'}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-64">Jumlah Karyawan</div>
                                    <div className="">
                                        {employeeCount || '-'}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-64">
                                        Tanggal Berdiri Perusahaan
                                    </div>
                                    <div className="">
                                        {foundingDate || '-'}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-64">Telp Perusahaan</div>
                                    <div className="">
                                        {companyPhone || '-'}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-64">
                                        Deskripsi Perusahaan
                                    </div>
                                    <div className="">
                                        {companyDescription || '-'}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-64">
                                        Alamat Perusahaan
                                    </div>
                                    <div className="">
                                        {companyAddress || '-'}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-64">Kode POS</div>
                                    <div className="">
                                        {companyPostalCode || '-'}
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
                                                    id="CompanyType"
                                                    label={'Jenis Perusahaan'}
                                                    placeholder={
                                                        'PT/CV/UD/Perorangan'
                                                    }
                                                    type="text"
                                                    onChange={e =>
                                                        setCompanyType(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={companyType}
                                                />
                                                <InputWithLabel
                                                    id="companyName"
                                                    label={'Nama Perusahaan'}
                                                    placeholder={
                                                        'Lancar Selalu'
                                                    }
                                                    type="text"
                                                    onChange={e =>
                                                        setCompanyName(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={companyName}
                                                />
                                                <InputWithLabel
                                                    id="companyIndustry"
                                                    label={
                                                        'Bidang Usaha Perusahaan'
                                                    }
                                                    placeholder={'Pertambangan'}
                                                    type="text"
                                                    onChange={e =>
                                                        setCompanyIndustry(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={companyIndustry}
                                                />
                                                <InputWithLabel
                                                    id="employeeCount"
                                                    label={'Jumlah Karyawan'}
                                                    placeholder={'50'}
                                                    type="number"
                                                    onChange={e =>
                                                        setEmployeeCount(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={employeeCount}
                                                />
                                                <InputWithLabel
                                                    id="foundingDate"
                                                    label={
                                                        'tanggal Berdiri Perusahaan'
                                                    }
                                                    placeholder={'1990-01-01'}
                                                    type="date"
                                                    onChange={e =>
                                                        setFoundingDate(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={foundingDate}
                                                />
                                                <InputWithLabel
                                                    id="companyPhone"
                                                    label={
                                                        'Nomor Telepon Perusahaan'
                                                    }
                                                    placeholder={'081234567890'}
                                                    type="tel"
                                                    onChange={e =>
                                                        setCompanyPhone(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={companyPhone}
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
                                                        setCompanyDescription(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={companyDescription}
                                                />
                                                <InputWithLabel
                                                    id="companyProvinceId"
                                                    label={'Provinsi'}
                                                    placeholder={'Jawa Timur'}
                                                    type="number"
                                                    onChange={e =>
                                                        setCompanyPostalCode(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={companyPostalCode}
                                                />
                                                <InputWithLabel
                                                    id="companyCityId"
                                                    label={'Kota/Kabupaten'}
                                                    placeholder={'Surabaya'}
                                                    type="number"
                                                    onChange={e =>
                                                        setCompanyCityId(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={companyCityId}
                                                />
                                                <InputWithLabel
                                                    id="companyDistrictId"
                                                    label={'Kecaamatan'}
                                                    placeholder={'Sukolilo'}
                                                    type="number"
                                                    onChange={e =>
                                                        setCompanyDistrictId(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={companyDistrictId}
                                                />
                                                <InputWithLabel
                                                    id="companyPostalCode"
                                                    label={
                                                        'Kode POS Perusahaan'
                                                    }
                                                    placeholder={'123'}
                                                    type="text"
                                                    onChange={e =>
                                                        setCompanyPostalCode(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={companyPostalCode}
                                                />
                                                <InputWithLabel
                                                    id="companyAddress"
                                                    label={'Alamat Perusahaan'}
                                                    placeholder={
                                                        'Jl. Jalan No. 1'
                                                    }
                                                    type="text"
                                                    onChange={e =>
                                                        setCompanyAddress(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={companyAddress}
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
    )
}
