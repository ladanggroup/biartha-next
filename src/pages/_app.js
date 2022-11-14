import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import NextNProgress from 'nextjs-progressbar'
export default function App({ Component, pageProps }) {
    return (
        <>
            <NextNProgress />
            <Component {...pageProps} />
        </>
    )
}
