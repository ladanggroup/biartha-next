import ApplicationLogo from '@/components/ApplicationLogo'
import ApplicationLogoText from '@/components/ApplicationLogoText'
import Link from 'next/dist/client/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
function Navigation(props) {
    const [colorChange, setColorchange] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()
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
    const handleClickScroll = targetElement => {
        const element = '#services'
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }
    return (
        <nav
            className={`${
                colorChange ? 'bg-white shadow-md' : 'bg-transparent'
            } duration-400 fixed top-0 left-0 z-20 w-full px-2 py-2.5 transition-all  dark:border-gray-600 dark:bg-gray-900 sm:px-4`}>
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Link href="/" className="flex items-center">
                    <ApplicationLogoText className="block h-10 w-auto" />
                    {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        {process.env.appName}
                    </span> */}
                </Link>
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
                            <Link
                                href={'/#tentang-kami'}
                                className={`${
                                    router.asPath === '/#tentang-kami'
                                        ? ' bg-blue-700  text-white dark:text-white md:bg-transparent md:text-blue-700'
                                        : '  text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white'
                                } block rounded py-2 pr-4 pl-3 md:p-0`}>
                                Tentang Kami
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/#layanan'}
                                className={`${
                                    router.asPath === '/#layanan'
                                        ? ' bg-blue-700  text-white dark:text-white md:bg-transparent md:text-blue-700'
                                        : '  text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white'
                                } block rounded py-2 pr-4 pl-3 md:p-0`}>
                                Layanan
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/hubungi-kami"
                                className={`${
                                    router.asPath === '/hubungi-kami'
                                        ? ' bg-blue-700  text-white dark:text-white md:bg-transparent md:text-blue-700'
                                        : '  text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white'
                                } block rounded py-2 pr-4 pl-3 md:p-0`}>
                                Hubungi Kami
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navigation
