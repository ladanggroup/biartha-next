import Head from 'next/head'
import AppLayout from '@/components/Layouts/HomeLayout/AppLayout'
import { Accordion } from 'flowbite-react'
import Link from 'next/link'
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
                <div className="relative overflow-hidden" id="home">
                    <div className="flex h-screen items-center">
                        <img
                            className="absolute inset-0 h-full w-full object-cover"
                            src="/banner1-min.png"
                            alt=""
                        />
                        {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-75"></div> */}
                        <div className="relative grid grid-cols-1 px-6 md:grid-cols-2 md:px-20">
                            <div className="space-y-4">
                                <h1 className="text-5xl font-bold tracking-wide text-gray-800">
                                    Butuh Modal Jualan / Usaha?
                                </h1>
                                <h2 className="text-lg font-light tracking-wide text-gray-800 ">
                                    Segera ajukan ke {process.env.appName} dan
                                    dapatkan modal usaha Anda sekarang juga!
                                </h2>
                                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2">
                                    <a
                                        href="#"
                                        className="text-primary border-primary rounded-full border-2 bg-white py-1 px-4 text-center font-medium tracking-wide shadow-lg">
                                        Lihat Caranya
                                    </a>
                                    <Link
                                        href="/register"
                                        className="border-primary hover:bg-opacity-75 bg-primary rounded-full border-2 py-1 px-4 text-center font-medium tracking-wide text-white shadow-lg">
                                        Daftar Sekarang
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-24 pt-16 px-6">
                    <div className="flex flex-col justify-between space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 md:px-16">
                        <div className="flex max-w-sm flex-col justify-center rounded-lg p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img
                                src="/icon-money.png"
                                alt=""
                                className="h-28 w-auto mx-auto"
                            />
                            <div className="text-center">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Pencairan Dana Cepat
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    Proses analisa dan pencairan yang cepat
                                    memudahkan Anda untuk dapat segera bekerja
                                </p>
                            </div>
                        </div>

                        <div className=" flex max-w-sm flex-col justify-center rounded-lg p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img
                                src="/icon-money2.png"
                                alt=""
                                className="h-28 w-auto mx-auto"
                            />
                            <div className="text-center">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Tenor Flexibel
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    Pilih dan sesuaikan sendiri tenor pinjaman
                                    Anda di {process.env.appName}.
                                </p>
                            </div>
                        </div>

                        <div className="flex max-w-sm flex-col justify-center rounded-lg p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img
                                src="/icon-money3.png"
                                alt=""
                                className="h-28 w-auto mx-auto"
                            />
                            <div className="text-center">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Pembayaran mudah
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    Lakukan pembayaran pinjaman dengan mudah dan
                                    bantuan customer service yang responsif.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div id="tentang-kami" className="py-20">
                        <div className="grid grid-cols-1 bg-white md:grid-cols-2 md:space-x-4 md:px-16">
                            <div className="order-2 space-y-4 md:order-1 md:pr-20">
                                <div className="border-primary rounded-l-md border-l-4 pl-2 text-2xl font-bold text-gray-800">
                                    Biartha adalah fintech yang terdaftar resmi
                                    dan sudah menjadi{' '}
                                    <span className="text-primary text-3xl">
                                        mitra permodalan terpercaya
                                    </span>{' '}
                                    untuk untuk para UMKM
                                </div>
                                <div className="text-gray-600">
                                    Dengan semangat UMKM naik kelas,{' '}
                                    {process.env.appName}
                                    hadir di tengah-tengah pelaku usaha kecil
                                    dan menengah untuk memberikan support
                                    permodalan untuk mereka dapat menangkap
                                    peluang-peluang yang lebih luas dengan
                                    jaminan yang mudah dan bunga yang rendah.
                                </div>
                            </div>
                            <div className="order-1 mb-4 flex justify-end md:order-2 md:mb-0">
                                <img
                                    src="/caracter.png"
                                    alt=""
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary mt-10 space-y-4 rounded-lg px-4 pt-10 pb-10 md:mx-16 md:space-y-10 md:px-28 md:pb-20">
                        <div className="text-center text-2xl font-semibold text-white md:text-4xl">
                            Kami Siap Membantu Bisnis Anda
                        </div>
                        <div className="flex space-x-4 md:space-x-24">
                            <div className="w-64 items-center font-light text-white">
                                <div className="w-16 border-b-2 text-2xl font-semibold md:text-5xl">
                                    98%
                                </div>
                                <div className="text-xs font-light tracking-wide">
                                    Pinjaman yang telah disetujui
                                </div>
                            </div>
                            <div className="w-64 items-center font-light text-white">
                                <div className="w-16 border-b-2 text-2xl font-semibold md:text-5xl">
                                    99%
                                </div>
                                <div className="text-xs">
                                    Dana sukses disalurkan
                                </div>
                            </div>
                            <div className="w-64 items-center font-light text-white">
                                <div className="w-16 border-b-2 text-2xl font-semibold md:text-5xl">
                                    100%
                                </div>
                                <div className="text-xs">
                                    Peminjam puas dengan layanan kami
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="grid grid-cols-1 space-x-0 space-y-2 md:grid-cols-2 md:flex-row md:space-x-4 md:space-y-0 md:p-16"
                        id="layanan">
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
                                src="/caracter3.png"
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
                                            {process.env.appName} adalah fintech
                                            yang menyediakan jasa permodalan
                                            bagi para pelaku usaha baik individu
                                            maupun badan usaha yang memiliki
                                            toko di Ladang Group, dengan jaminan
                                            dan bunga yang kompetitif diharapkan
                                            pelaku usaha yang tergabung di
                                            Ladang Group tidak akan mengalami
                                            kesulitan permodalan lagi dalam
                                            bekerja memenuhi kebutuhan konsumen.
                                        </p>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        Bagaimana cara mengajukan pinjaman?
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            Pengajuan pinjaman bisa langsung
                                            menghubungi nomor yang tertera di
                                            web atau bisa datang langsung ke
                                            kantor kami
                                        </p>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        Apakah {process.env.appName} terdaftar
                                        resmi?
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            {process.env.appName} terdaftar
                                            resmi dan diawasi oleh OJK serta
                                            memiliki perizinan yang lengkap.
                                            Jadi jangan khawatir ya sobat
                                            Bi"Artha
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
