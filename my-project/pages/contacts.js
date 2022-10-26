import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../Components/Layout'

export default function Contacts() {
    return (
        <Layout>
            <main className="px-2 flex-1 flex-col flex justify-center items-center mt-12 ">
                <h1 className="m-0 leading-5 text-6xl mb-12 mt-2">
                    Contact Page
                </h1>
                <br>
                </br>
                <br>
                </br>
                <div className="text-center">

                    <h2 className="text-5xl mt-6 mb-12"> Who we are </h2>
                    <p className="text-2xl mt-10 mb-12">
                        We are two engineers from ECE check our mail:
                        <a href="mailto:clement.delbarre@edu.ece.fr" className="text-sky-500 italic"> Clement </a>
                        and
                        <a href="mailto:martin.huck@edu.ece.fr" className="text-sky-500 italic"> Martin </a>
                    </p>

                    <h2 className="text-5xl mt-6"> Our project </h2>
                    <p className="text-2xl mt-10 mb-12">
                        We are currently working on a responsive React App
                    </p>

                </div>
            </main>



        </Layout>
    )
}
