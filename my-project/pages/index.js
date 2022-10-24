import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div class = "p-6">
      <Head>
        <title>WebApp React</title>        
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
