import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import { useState } from 'react'

export default function USeStateReact() {

    const [count, setCount] = useState(0);

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Use State
        </h1>

        <p className={styles.description}>
          Click on the button to increment the counter 
          < button className={styles.Button} onClick={() => setCount(count + 1)}> Increment </button>   
          {count}  
        </p>

       
      </main>

     
    </div>
  )
}
