import Navbar from "./Navbar"
import Footer from "./Footer"
import Head from 'next/head'

function Layout({ children }) {
    return (
        <div className= "py-8">
        <Head>
            <title >WebApp React</title>
        </Head>
        <header>
            <Navbar />
        </header>
        <div> {children}        
</div>
<Footer />
        </div>


    );
}
export default Layout;