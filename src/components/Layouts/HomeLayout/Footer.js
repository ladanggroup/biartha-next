import ApplicationLogoText from '@/components/ApplicationLogoText'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-white p-4 dark:bg-gray-900 sm:p-6">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <Link href="/" className="flex items-center">
                        <ApplicationLogoText className="block w-auto h-10" />
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <div>
                        <div className="font-semibold">Telp.</div>
                        <div className="text-gray-500">+62 813-3381-8062</div>
                    </div>
                    <div>
                        <div className="font-semibold">Email.</div>
                        <div className="text-gray-500">
                            support@biartha.co.id
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
                    © {new Date().getFullYear()}{' '}
                    <a href="/" className="hover:underline">
                        {process.env.appName}
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}
