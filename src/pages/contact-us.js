import Head from 'next/head'
import AppLayout from '@/components/Layouts/HomeLayout/AppLayout'
import React from 'react'

export default function ContactUs() {
    return (
        <div>
            <Head>
                <title>{`${process.env.appName} | Hubungi Kami`}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <AppLayout>
                <div className="space-y-10 pt-24 px-6 mx-16">
                    <h2 className="font-bold text-gray-900 text-4xl">
                        Hubungi Kami
                    </h2>
                    <div className="flex flex-row justify-between space-x-10">
                        <div className="w-96 flex flex-col space-y-2">
                            <div className="font-semibold text-gray-800 text-xl">
                                Kontak dan Layanan Informasi
                            </div>
                            <div className="text-gray-600">
                                <div className="font-semibold">Alamat</div>
                                <div className="font-light">
                                    Kutisari 11 No.11F, Surabaya, Jawa Timur
                                </div>
                            </div>
                            <div className="text-gray-600">
                                <div className="font-semibold">Telp</div>
                                <div className="font-light">
                                    +62 813-3381-8062
                                </div>
                            </div>
                            <div className="text-gray-600">
                                <div className="font-semibold">Email</div>
                                <div className="font-light">
                                    support@biartha.co.id
                                </div>
                            </div>
                            <div className="text-gray-600">
                                <div className="font-semibold">Jam Kerja</div>
                                <div className="font-light">
                                    Senin - Jumat: 08.00 - 17.00 WIB
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d509.1441071331195!2d112.74218601282104!3d-7.331632038552844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb3ede899e4f%3A0xb158942d1358645d!2s!5e0!3m2!1sen!2sid!4v1671162570901!5m2!1sen!2sid"
                                width="800"
                                height="400"
                                style={{ border: 0 }}
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </div>
    )
}
