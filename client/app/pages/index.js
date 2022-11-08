import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../styles/layout/Header'

export default function AboHomeut() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Home Page
        </h1>

        <p className={styles.description}>
          If you want to discover all available fonctionality 
          <a href="http://localhost:3000/about" class={styles.href}> click here  </a>     
        </p>

       
      </main>

     
    </div>
  )
}
