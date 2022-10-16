import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Contatcs() {
    return (
        <div className={styles.container}>
            <Head>
                <title>WebApp React</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <h1 className={styles.title}>
                Contact Page
            </h1>
            <br>
            </br>
            <div >
                <h1 > Who we are </h1>
                <p className={styles.description}>
                    We are two engineer from ECE check our mail:
                    <a href="mailto:clement.delbarre@edu.ece.fr"> Clement </a>
                    and
                    <a href="mailto:martin.huck@edu.ece.fr"> Martin </a>
                </p>
            </div>
            <div >
                <h1 > Our project </h1>
                <p className={styles.description}>
                    We are currently working on a responsive React App
                </p>
            </div>



        </div>
    )
}
