import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const { data: user, error, mutate } = useSWR(
        '/borrower/user',
        () =>
            axios
                .get('/borrower/user')
                .then(res => res.data)
                .catch(error => {
                    if (error.response.status !== 409) throw error
                    router.push('/verify-email')
                }),
        {
            // onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            //     // Never retry on 401.
            //     if (error.status === 401) return

            //     // Never retry for a specific key.
            //     if (key === '/borrower/user') return

            //     // Only retry up to 10 times.
            //     if (retryCount >= 10) return

            //     // Retry after 5 seconds.
            //     setTimeout(() => revalidate({ retryCount }), 10000)
            // },
            revalidateIfStale: false,
            revalidateOnFocus: false,
        },
    )
    // if (error.response.status === 401) {
    //     router.push('/login')
    // }

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/borrower/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/borrower/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/borrower/password/email', { email })
            .then(response => setStatus(response.data.message))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/borrower/password/reset', {
                token: router.query.token,
                ...props,
            })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.message)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const verifiedEmail = async ({
        setErrors,
        setStatus,
        expires,
        signature,
    }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios({
            method: 'get',
            url:
                '/borrower/email/verify/' +
                router.query.id +
                '/' +
                router.query.token +
                '?expires=' +
                expires +
                '&signature=' +
                signature,
        })
            .then(response => router.push('/profile/create'))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/borrower/email/resend')
            .then(response => setStatus(response.data.message))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/borrower/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
        if (user && !user.company_id) router.push('/profile/create')
        if (
            user &&
            user?.company_id &&
            window.location.pathname === '/profile/create'
        )
            router.push('/dashboard')
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        verifiedEmail,
    }
}
