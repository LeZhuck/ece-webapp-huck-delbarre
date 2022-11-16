import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Header from '../components/Header'

let URL = "http://localhost:3000/articles/"






export default function Artciles({ articles }) {
    return (
        <div className={styles.container}>
            
            <Header />


            <main className={styles.main}>
                <h1 className={styles.title}>
                    Our Articles
                </h1>

                <div className={styles.grid}>


                    {articles.map(articles => <a key={articles.id} href={URL + articles.id} className={styles.card} > <h2>{`${articles.title}, ${articles.date} `}</h2> </a>)}

                    <p>Find all of our recent Articles</p>



                </div>
            </main>





        </div>
    )
}



export async function getStaticProps() {
    const res = await fetch("http://localhost:3000/api/articles");
    const {articles} = await res.json();
    console.log(articles);
    return {
        props: {
            articles,
        }
    }
}
