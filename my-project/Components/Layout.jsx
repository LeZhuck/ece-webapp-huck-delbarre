import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Head from 'next/head'

function Layout({ children }) {
    return (
        <div class= "py-8">
        <Head>
            <title >WebApp React</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
           <Navbar />
        </header>
        <div> {children}</div>
        <Footer />
        </div>


    );
}
export default Layout;