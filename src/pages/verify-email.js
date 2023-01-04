import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import LoadingUser from '@/components/LoadingUser'
import ApplicationLogoText from '@/components/ApplicationLogoText'
import { useRouter } from 'next/router'

const VerifyEmail = () => {
    const router = useRouter()
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState(null)
    const { user } = useAuth({ middleware: 'auth' })

    useEffect(() => {
        if (!router.isReady) return
    }, [router.isReady, user])

    return (
        <>
            <GuestLayout>
                <AuthCard
                    logo={
                        <Link href="/">
                            <ApplicationLogoText className="block w-auto h-20" />
                        </Link>
                    }>
                    <div className="mb-4 text-sm text-gray-600">
                        Terimakasih sudah bergabung bersama{' '}
                        {process.env.appName}. Sebelum melanjutkan, silahkan cek
                        email Anda untuk verifikasi akun Anda. Jika Anda tidak
                        menerima email, kami akan mengirimkan ulang.
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            A new verification link has been sent to the email
                            address you provided during registration.
                        </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                        <Button
                            onClick={() =>
                                resendEmailVerification({ setStatus })
                            }>
                            Kirim Ulang Email Verifikasi
                        </Button>

                        <button
                            type="button"
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                            onClick={logout}>
                            Logout
                        </button>
                    </div>
                </AuthCard>
            </GuestLayout>
        </>
    )
}

export default VerifyEmail
