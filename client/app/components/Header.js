import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect, useContext } from 'react';

import { UserContext } from './UserContext';


let URL = "http://localhost:3000/articles/"





export default function Header() {

    

    
    const user = useContext(UserContext)

    return (
        <div>
        <Head>
            <title>Clement Tinmar</title>
            <link rel="icon" href="/favicon.ico" />
            
        </Head>
        <div className={styles.HeaderText}>
                Hello {user.username} your email is {user.mail}
        </div>

        <div>
        <form action="login-controlled">
    <input type="submit" value="Login" />
</form>
        </div>
        </div>
    )
}

/*


    // use a useEffect funtion which fetch data from profile api et change the document title with the username and email
    useEffect(() => {

        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/api/profile");
            const  data  = await res.json();
            console.log(data);
            setUser(data);

        };

        fetchData();


       

    }, [])

    return (

        <div >
        <Head>
            <title>Clement Tinmar</title>
            <link rel="icon" href="/favicon.ico" />
            
        </Head>
        <div className={styles.HeaderText}>
                Hello {user.username} your email is {user.mail}
            </div>

        </div>
        



    )
    */




