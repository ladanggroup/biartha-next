import React from 'react'
import InputWithLabel from './InputWithLabel'
import axios from '@/lib/axios'

export default function CreateCompanyDocument() {
    const [companyDocument, setCompanyDocument] = React.useState({
        akta_pendirian_usaha: '',
        no_akta_pendirian_usaha: '',
        npwp_perusahaan: '',
        no_npwp_perusahaan: '',
        siup: '',
        no_siup: '',
        nib: '',
        no_nib: '',
        ktp_pemilik: '',
        no_ktp_pemilik: '',
        npwp_pemilik: '',
        no_npwp_pemilik: '',
        buku_tabungan: '',
        foto_owner: '',
    })
    const [uploadProgress, setUploadProgress] = React.useState(0)

    const uploadFile = async e => {
        e.preventDefault()
        const file = e.target.files[0]
        const type = e.target.id
        console.log(type)
        setUploadProgress(0)
        if (file?.size > 2000000) {
            e.target.value = null
            toast.error('Ukuran file tidak boleh lebih dari 2mb', {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        } else if (file?.type !== 'image/jpeg' && file?.type !== 'image/png') {
            e.target.value = null
            toast.error('Format file tidak didukung', {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        } else {
            const folder = 'company_document'
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
                setCompanyDocument({
                    ...companyDocument,
                    file_doc: res.data.data.file_url,
                })
            })
        }
    }
    return (
        <div className="grid grid-cols-2 gap-4 my-4">
            <InputWithLabel
                id="number"
                label={'Nomor KTP*'}
                placeholder={'12352462'}
                type="text"
                // value={document.number}
                // onChange={e =>
                //     setDocument({
                //         ...document,
                //         number: e.target.value,
                //     })
                // }
                // error={
                //     validation.number && (
                //         <span className="text-red-500 text-sm">
                //             {validation.number}
                //         </span>
                //     )
                // }
            />
            <InputWithLabel
                id="ktp_owner"
                label={'Foto KTP Pemilik Perusahaan*'}
                placeholder={''}
                type="file"
                onChange={uploadFile}
                accept="image/*"
                helper={
                    <p
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help">
                        PNG atau JPG (MAX. 2mb)
                    </p>
                }>
                {uploadProgress > 0 && (
                    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                        <div
                            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                            style={{
                                width: `${uploadProgress}%`,
                            }}>
                            {uploadProgress}%
                        </div>
                    </div>
                )}
            </InputWithLabel>

            <input
                hidden
                type="text"
                value={companyDocument.foto_owner || ''}
            />
        </div>
    )
}
