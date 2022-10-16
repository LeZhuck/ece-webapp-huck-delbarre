import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Artciles() {
  return (
    <div className={styles.container}>
      <Head>
        <title>WebApp React</title>        
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
        <h1 className={styles.title}>
          Articles
        </h1>

        <p className={styles.description}>
            
        </p>

        
      

     
    </div>
  )
}
