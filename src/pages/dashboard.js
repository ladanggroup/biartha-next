import AppLayout from '@/components/Layouts/AppLayout'
import LoadingUser from '@/components/LoadingUser'
import { useAuth } from '@/hooks/auth'
import Head from 'next/head'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
    return (
        <>
            {!user && <LoadingUser />}
            {user && (
                <AppLayout
                    header={
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Dashboard
                        </h2>
                    }>
                    <Head>
                        <title>Laravel - Dashboard</title>
                    </Head>

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    {user?.name} You're logged in!
                                </div>
                            </div>
                        </div>
                    </div>
                </AppLayout>
            )}
        </>
    )
}

export default Dashboard
