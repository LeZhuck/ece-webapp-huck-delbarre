import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import Image from 'next/image';
import "@fontsource/poppins";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'


// get the current url and use the active class to highlight the current nav link with taillwind css



export default function NavBarMobile() {

    const router = useRouter();
    const { pathname } = router;
    const supabase = useSupabaseClient()

    const [showMenu, setShowMenu] = useState(false);

    // if pathname is
    async function ActivationMenu() {
        setShowMenu(!showMenu);
    }


    return (
        <div className="" >


            <nav className="py-1 static">
                <div className="flex">
                    <div className="left-0 w-1/2">
                        <Link href="/" className="flex items-center h-[70px] w-[70px] ">

                            <img className=' mt-[16px] h-[70px] w-[70px]  hover:scale-125 duration-1000' src="/assets/images/Logo.png" />

                        </Link>
                    </div>

                    <div className="w-1/2 mt-3 flex justify-end">
                        <div className="fixed">

                            <button onClick={ActivationMenu}>

                                <div className="space-y-2">
                                    <div className="w-8 h-0.5 bg-gray-600"></div>
                                    <div className="w-8 h-0.5 bg-gray-600"></div>
                                    <div className="w-8 h-0.5 bg-gray-600"></div>
                                </div>
                            </button>


                            {showMenu ? (
                                <div className="text-white">
                                    <div className="absolute top-[-36px] right-[-18px] w-36 h-screen bg-second-bg shadow-inner shadow-slate-700">
                                        <div className="">

                                            <div className='p-5 flex justify-center'>
                                                <button onClick={ActivationMenu}>

                                                    <div className='text-3xl animate-pulse'>
                                                        X
                                                    </div>


                                                </button>
                                            </div>

                                            <div className="mx-2">
                                                <ul className="grid grid-cols-1 place-items-center gap-y-8">
                                                    <li >
                                                        <Link href="/"  >home</Link>

                                                    </li>
                                                    <li >
                                                        <Link href="/blog"  >blog</Link>

                                                    </li>
                                                    <li >
                                                        <Link href="/account"  >account</Link>

                                                    </li>

                                                    <li >
                                                        <button className="" onClick={() => supabase.auth.signOut()}>
                                                            <Link href="/"  >Logout</Link>
                                                        </button>

                                                    </li>


                                                </ul>
                                            </div>

                                        </div>


                                    </div>
                                </div>
                            )
                                : null}





                        </div>




                    </div>

                </div>

            </nav>


        </div>
    );
}



