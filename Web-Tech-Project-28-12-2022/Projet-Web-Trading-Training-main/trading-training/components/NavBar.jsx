import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Image from 'next/image';
import "@fontsource/poppins";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

import NavBarDefault from './NavBar/NavDefault';
import NavBarMobile from './NavBar/NavMobile';

// get the current url and use the active class to highlight the current nav link with taillwind css



export default function NavBar({username}) {

    const router = useRouter();
    const { pathname } = router;
    const supabase = useSupabaseClient()

    // if pathname is 

    

    const [showMobile, setShowMobile] = useState(false);

    // Actualise the isActive function when the page change
    useEffect(() => {
        const isActive = (r) => {
            if (r === pathname) {
                return "mr-2 mt-5 py-5 pr-4 pl-3 text-parag-color  rounded md:bg-transparent md:text-white md:p-0 dark:text-white font-bold";
            } else {
                return "mr-2 mt-5 py-5 pr-4 pl-3 text-parag-color rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
            }
        };
        isActive(pathname);
    }, [pathname]);

    // get the width of the screen every time it change
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setShowMobile(true);
            } else {
                setShowMobile(false);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    

    



    return (
        <div className="" >

            {showMobile ? <NavBarMobile username={username} /> : <NavBarDefault pathname={pathname} username={username}  />}
            

        </div>
    );
}



