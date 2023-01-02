import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import LoadingUser from '@/components/LoadingUser'
import ApplicationLogoText from '@/components/ApplicationLogoText'

const VerifyEmail = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState(null)
    const { user } = useAuth({ middleware: 'auth' })
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
                        Thanks for signing up! Before getting started, could
                        you verify your email address by clicking on the
                        link we just emailed to you? If you didn't receive
                        the email, we will gladly send you another.
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            A new verification link has been sent to the
                            email address you provided during registration.
                        </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                        <Button
                            onClick={() =>
                                resendEmailVerification({ setStatus })
                            }>
                            Resend Verification Email
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
