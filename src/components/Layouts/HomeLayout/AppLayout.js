import React from 'react'
import Footer from './Footer'
import Navigation from './Navigation'

export default function HomeLayout({ children }) {
    return (
        <div>
            <Navigation />
            <div className="min-h-screen">{children}</div>
            <Footer />
        </div>
    )
}
