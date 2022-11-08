import { useRouter } from 'next/router'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

import Header from '../../styles/layout/Header'



const getTitle = (id, db) => {
    const ID =  id
    for (let i = 0; i < db['articles'].length; i++) {
        if (db["articles"][i].id == ID) {
            return db["articles"][i].title
        }
    }
}

const getContent = (id, db) => {
    const ID =  id
    for (let i = 0; i < db['articles'].length; i++) {
        if (db["articles"][i].id == ID) {
            return db["articles"][i].content
        }
    }
}
const getAuthor = (id, db) => {
    const ID =  id
    for (let i = 0; i < db['articles'].length; i++) {
        if (db["articles"][i].id == ID) {
            return db["articles"][i].author
        }
    }
}
const getDate = (id,db) => {
    const ID =  id
    for (let i = 0; i < db['articles'].length; i++) {
        if (db["articles"][i].id == ID) {
            return db["articles"][i].date
        }
    }
}







export default function Article({db}) {

    const router = useRouter()
    const { id } = router.query

    return (
        <div className={styles.container}>
           
           <Header />

            <br>
            </br>
            <br>
            </br>
            <h2 className={styles.title}>
                {getTitle(id, db)}
            </h2>
            <br>
            </br>


            <div >
                <h1 className={styles.description} > Ecrit par: {getAuthor(id, db)}, le {getDate(id,db)} </h1>
                <p className={styles.description}>
                    {getContent(id,db)}
                </p>
            </div>


        </div>
    )
}


export async function getStaticPaths() {


    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } },
            { params: { id: '3' } },
            { params: { id: '4' } },
        ],
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch("http://localhost:3000/api/articles");
    const db = await res.json();
    //console.log(db);

    return {
        props: {
            db,
        }
    }
}









