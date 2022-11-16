import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Header from '../components/Header'

export default function About() {
  return (
    <div className={styles.container}>
      
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          About Page
        </h1>

        <p className={styles.description}>
          You can acces from this page to our articles pages or our contact pages        
        </p>

        <div className={styles.grid}>
          <a href="http://localhost:3000/articles" className={styles.card}>
            <h2>Article</h2>
            <p>Find all of our recent Articles</p>
          </a>

          <a href="http://localhost:3000/contacts" className={styles.card}>
            <h2>Contacts</h2>
            <p>Learn more about us</p>
          </a>         
        </div>
      </main>

     
    </div>
  )
}
