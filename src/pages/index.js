import Head from 'next/head'
import AppLayout from '@/components/Layouts/HomeLayout/AppLayout'
import { Accordion } from 'flowbite-react'
export default function Home() {
    return (
        <>
            <Head>
                <title>
                    {`${process.env.appName} | Mitra Permodalan Terpercaya`}
                </title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <AppLayout>
                {/* hero */}
                <div className="relative h-full w-screen overflow-hidden">
                    <div className="flex h-screen items-center">
                        <img
                            className="absolute inset-0 h-full w-full object-cover"
                            src="/banner1.png"
                            alt=""
                        />
                        {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-75"></div> */}
                        <div className="relative grid grid-cols-1 px-6 md:grid-cols-2 md:px-20">
                            <div className="space-y-4">
                                <h1 className="text-5xl font-bold tracking-wide text-gray-800">
                                    Butuh Modal Jualan / Usaha?
                                </h1>
                                <h2 className="text-lg font-light tracking-wide text-gray-800 ">
                                    Segera ajukan ke Bi'artha dan dapatkan modal usaha Anda sekarang juga!
                                </h2>
                                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2">
                                    <a
                                        href="#"
                                        className="text-primary border-primary rounded-full border-2 bg-white py-1 px-4 text-center font-medium tracking-wide shadow-lg">
                                        Lihat Caranya
                                    </a>
                                    <a
                                        href="#"
                                        className="border-primary bg-primary rounded-full border-2 py-1 px-4 text-center font-medium tracking-wide text-white shadow-lg">
                                        Daftar Sekarang
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-full w-screen space-y-24 py-16 px-6">
                    <div className="flex flex-col justify-between space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 md:px-16">
                        <div className="flex max-w-sm flex-col justify-center rounded-lg p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img
                                src="/icon-money.svg"
                                alt=""
                                className="h-28 w-auto"
                            />
                            <div className="text-center">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Pencairan Dana Cepat
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    Here are the biggest enterprise technology
                                    acquisitions of 2021 so far, in reverse
                                    chronological order.
                                </p>
                            </div>
                        </div>

                        <div className="flex max-w-sm flex-col justify-center rounded-lg p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img
                                src="/icon-money2.svg"
                                alt=""
                                className="h-28 w-auto"
                            />
                            <div className="text-center">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Tenor Flexibel
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    Here are the biggest enterprise technology
                                    acquisitions of 2021 so far, in reverse
                                    chronological order.
                                </p>
                            </div>
                        </div>

                        <div className="flex max-w-sm flex-col justify-center rounded-lg p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img
                                src="/icon-money3.svg"
                                alt=""
                                className="h-28 w-auto"
                            />
                            <div className="text-center">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Pembayaran mudah
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    Here are the biggest enterprise technology
                                    acquisitions of 2021 so far, in reverse
                                    chronological order.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 bg-white md:grid-cols-2 md:space-x-4 md:px-16">
                        <div className="order-2 space-y-4 md:order-1 md:pr-20">
                            <div className="border-primary rounded-l-md border-l-4 pl-2 text-2xl font-bold text-gray-800">
                                Biartha adalah fintech yang terdaftar resmi dan
                                sudah menjadi{' '}
                                <span className="text-primary text-3xl">
                                    mitra permodalan terpercaya
                                </span>{' '}
                                untuk untuk para UMKM
                            </div>
                            <div className="text-gray-600">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Laboriosam consequuntur
                                quisquam voluptas dolor eos. Quidem commodi
                                fugiat temporibus impedit iure necessitatibus
                                perferendis fugit tempore repudiandae rem, rerum
                                natus quas debitis assumenda sed? Eius
                                repudiandae deserunt quo laborum amet delectus
                                eos. Itaque nemo aspernatur natus earum modi
                                excepturi, corrupti ea quam quas recusandae ad
                                perferendis facilis illum? Fugiat iusto ipsa
                                dolore, ratione animi vitae aperiam et ullam
                                iure recusandae provident.
                            </div>
                        </div>
                        <div className="order-1 mb-4 flex justify-end md:order-2 md:mb-0">
                            <img
                                src="/caracter.svg"
                                alt=""
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="bg-primary mt-10 space-y-4 rounded-lg px-4 pt-10 pb-10 md:mx-16 md:space-y-10 md:px-28 md:pb-20">
                        <div className="text-center text-2xl font-semibold text-white md:text-4xl">
                            Kami Siap Membantu Bisnis Anda
                        </div>
                        <div className="flex space-x-4 md:space-x-24">
                            <div className="w-64 items-center font-light text-white">
                                <div className="w-16 border-b-2 text-2xl font-semibold md:text-5xl">
                                    85%
                                </div>
                                <div className="text-xs font-light tracking-wide">
                                    Lorem ipsum dolor sit amet Lorem ipsum dolor
                                    sit amet
                                </div>
                            </div>
                            <div className="w-64 items-center font-light text-white">
                                <div className="w-16 border-b-2 text-2xl font-semibold md:text-5xl">
                                    85%
                                </div>
                                <div className="text-xs">
                                    Lorem ipsum dolor sit amet Lorem ipsum dolor
                                    sit amet
                                </div>
                            </div>
                            <div className="w-64 items-center font-light text-white">
                                <div className="w-16 border-b-2 text-2xl font-semibold md:text-5xl">
                                    85%
                                </div>
                                <div className="text-xs">
                                    Lorem ipsum dolor sit amet Lorem ipsum dolor
                                    sit amet
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 space-x-0 space-y-2 md:grid-cols-2 md:flex-row md:space-x-4 md:space-y-0 md:p-16">
                        <div className="col-span-2 mb-4 text-center md:mb-16">
                            <div className="text-4xl font-bold text-gray-800">
                                FAQ
                            </div>
                            <div className="text-gray-600">
                                Ada pertanyaan? Lihat pertanyaan umum kami untuk
                                menemukan jawaban Anda.
                            </div>
                        </div>
                        <div className="">
                            <img
                                src="/caracter3.svg"
                                alt=""
                                className="w-full"
                            />
                        </div>
                        <div className="">
                            <Accordion alwaysOpen={true}>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        Apa itu {process.env.appName}?
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            {process.env.appName} is an
                                            open-source library of interactive
                                            components built on top of Tailwind
                                            CSS including buttons, dropdowns,
                                            modals, navbars, and more.
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Check out this guide to learn how to
                                            and start developing websites even
                                            faster with components on top of
                                            Tailwind CSS.
                                        </p>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        Bagaimana cara mengajukan pinjaman?
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            {process.env.appName} is first
                                            conceptualized and designed using
                                            the Figma software so everything you
                                            see in the library has a design
                                            equivalent in our Figma file.
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Check out the based on the utility
                                            classes from Tailwind CSS and
                                            components from Flowbite.
                                        </p>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        Apakah Bi'Artha terdaftar resmi?
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            The main difference is that the core
                                            components from Flowbite are open
                                            source under the MIT license,
                                            whereas Tailwind UI is a paid
                                            product. Another difference is that
                                            Flowbite relies on smaller and
                                            standalone components, whereas
                                            Tailwind UI offers sections of
                                            pages.
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            However, we actually recommend using
                                            both Flowbite, Flowbite Pro, and
                                            even Tailwind UI as there is no
                                            technical reason stopping you from
                                            using the best of two worlds.
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            Learn more about these technologies:
                                        </p>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}
