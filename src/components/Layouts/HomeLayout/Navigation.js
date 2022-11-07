import Link from 'next/dist/client/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
function Navigation(props) {
    const [colorChange, setColorchange] = useState(false)
    const [open, setOpen] = useState(false)
    const changeNavbarColor = () => {
        if (window.scrollY >= 80) {
            setColorchange(true)
        } else {
            setColorchange(false)
        }
    }
    if (typeof window === 'object') {
        window.addEventListener('scroll', changeNavbarColor)
    }
    console.log(colorChange)
    return (
        <nav
            className={`${
                colorChange ? 'bg-white shadow-md' : 'bg-transparent'
            } duration-400 fixed top-0 left-0 z-20 w-full px-2 py-2.5 transition-all  dark:border-gray-600 dark:bg-gray-900 sm:px-4`}>
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <a href="https://flowbite.com/" className="flex items-center">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        {process.env.appName}
                    </span>
                </a>
                <div className="flex space-x-2 md:order-2">
                    <Link
                        href={'/login'}
                        className="btn rounded-full text-white">
                        Masuk
                    </Link>
                    <button
                        onClick={() => setOpen(!open)}
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
                        aria-controls="navbar-sticky"
                        aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="h-6 w-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className={`${
                        open ? '' : 'hidden'
                    } w-full items-center justify-between md:order-1 md:flex md:w-auto`}
                    id="navbar-sticky">
                    <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
                        <li>
                            <a
                                href="#"
                                className="block rounded bg-blue-700 py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
                                aria-current="page">
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                Tentang Kami
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                Layanan
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                Hubungi Kami
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navigation
