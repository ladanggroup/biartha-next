import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function verifiedEmail() {
    const router = useRouter()

    const { verifiedEmail } = useAuth({ middleware: 'auth' })

    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [signature, setSignature] = useState('')
    const [expires, setExpires] = useState('')
    // const { id } = router.query
    // const { token } = router.query
    // const csrf = () => axios.get('/sanctum/csrf-cookie')
    // const verify = event => {
    //     csrf()
    //     axios
    //         .get('/borrower/email/verify/' + id + '/' + token)
    //         .then(response =>
    //             router.push('/dashboard=' + btoa(response.data.message)),
    //         )
    //         .catch(error => {
    //             if (error.response.status !== 422) throw error

    //             setErrors(error.response.data.errors)
    //         })
    // }

    const verify = async event => {
        verifiedEmail({
            signature,
            expires,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setSignature(router.query.signature || '')
        setExpires(router.query.expires || '')
    }, [router.query.signature, router.query.expires])

    useEffect(() => {
        if (signature && expires) {
            verify()
        }
    }, [signature, expires])
}
