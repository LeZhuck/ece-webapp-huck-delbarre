import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import Image from 'next/image';
import "@fontsource/poppins";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'



// get the current url and use the active class to highlight the current nav link with taillwind css



export default function NavBarDefault( {pathname, username} ) {

    
    const supabase = useSupabaseClient()

    // if pathname is 

    const isActive = (r) => {
        if (r === pathname) {
            return "mr-2 mt-5 py-5 pr-4 pl-3 text-parag-color  rounded md:bg-transparent md:text-white md:p-0 dark:text-white font-bold";
        } else {
            return "mr-2 mt-5 py-5 pr-4 pl-3 text-parag-color rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
        }
    };

    
    


    return (
        <div className={styles.HeadHome} >


            <nav className="py-1">
                <div className="container flex justify-between ">

                    <div className='flex'>
                    <Link href="/" className="flex items-center h-[70px] w-[70px] ">

                        <img className=' mt-[16px] h-[70px] w-[70px]  hover:scale-125 duration-1000' src="/assets/images/Logo.png" />

                    </Link>
                    <div className="flex items-center px-2 text-lg font-light md:font-medium">
                        {username && <p className="">Hello {username}</p>}

                       
                    </div>
                    </div>
                    
                    

                    <div className="hidden w-full md:block md:w-auto " id="navbar-default">
                        <ul className="text-left flex flex-row py-5 mt-5 text-lg font-light font-poppins rounded-lg border border-gray-100 md:flex-row md:space-x-12 md:mt-0 md:font-medium md:border-0 ">
                            <li className={isActive("/")}>
                                <Link href="/"  >home</Link>                               

                            </li>
                            <li className={isActive("/blog")}>
                                <Link href="/blog"  >blog</Link>                               

                            </li>
                            <li className={isActive("/account")}>
                                <Link href="/account"  >account</Link>                               

                            </li>
                            <li>
                                
                            <button className="bg-second-bg hover:text-white text-main-green px-6  py-5 border border-main-green rounded-full" onClick={() => supabase.auth.signOut()}>
                                    <Link href="/"  >Logout</Link> 
                            </button>
                                
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>


        </div>
    );
}



