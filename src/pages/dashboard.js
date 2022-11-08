import AppLayout from '@/components/Layouts/AppLayout'
import LoadingUser from '@/components/LoadingUser'
import { useAuth } from '@/hooks/auth'
import { Breadcrumb } from 'flowbite-react'
import Head from 'next/head'
import Link from 'next/link'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
    return (
        <>
            {!user && <LoadingUser />}
            {user && (
                <>
                    <Head>
                        <title>{`${process.env.appName} - Dashboard`}</title>
                    </Head>
                    <AppLayout
                        header={
                            <h2 className="flex justify-between text-xl font-semibold leading-tight text-gray-800">
                                <div>Dashboard</div>
                                <div>
                                    <nav class="flex" aria-label="Breadcrumb">
                                        <ol class="inline-flex items-center space-x-1 md:space-x-3">
                                            <li class="inline-flex items-center">
                                                <Link
                                                    href="/dashboard"
                                                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                                    <svg
                                                        class="mr-2 h-4 w-4"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                                    </svg>
                                                    Home
                                                </Link>
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </h2>
                        }>
                        <div className="py-12">
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="border-b border-gray-200 bg-white p-6">
                                        <h6 className="text-lg">
                                            Halo,{' '}
                                            <span className="text-primary font-semibold">
                                                {' '}
                                                {user?.name}
                                            </span>
                                        </h6>
                                        <p className="font-light">
                                            Dashboard ini sedang dalam
                                            pengembangan, namun kamu masih dapat
                                            menggunakan menu lainya.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AppLayout>
                </>
            )}
        </>
    )
}

export default Dashboard
