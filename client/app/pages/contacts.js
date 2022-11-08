import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../styles/layout/Header'

export default function Contacts() {
    return (
        <div className={styles.container}>
            <Header />
            
            <h1 className={styles.title}>
                Contact Page
            </h1>
            <main className={styles.main}>

                <br>
                </br>
                <div styles="text-align: center;">



                    <p className={styles.title} > Who we are </p>
                    <p className={styles.description}>
                        We are two engineers from ECE check our mail:
                        <a href="mailto:clement.delbarre@edu.ece.fr"> Clement </a>
                        and
                        <a href="mailto:martin.huck@edu.ece.fr"> Martin </a>
                    </p>

                    <p className={styles.title} > Our project </p>
                    <p className={styles.description}>
                        We are currently working on a responsive React App
                    </p>

                </div>
            </main>



        </div>
    )
}
