import styles from '../styles/Home.module.css'
import { useState } from 'react'


export default function Footer() {

    // use a state to change the color of the text
    const [color, setColor] = useState('invisible')

    // function is he click on a button
    const HasClick = () => {
        setColor('visible text-xs')
    }

    return (
        <div className={styles.footerHome}>
            <hr className="my-6  mx-auto h-1 bg-second-bg rounded border-0 md:my-10 dark:bg-gray-700"></hr>




            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">


                <div className="m-5">
                    <div>
                        <div className="text-2xl">
                            let&apos;s
                        </div>
                        <div className="text-3xl font-bold py-5 hover:text-white">
                            talk together
                        </div>
                    </div>
                    <p className="text-main-green font-lg">
                        email-us
                    </p>
                    <div className='opacity-60'>
                        <div className="grid grid-cols-2 gap-2 py-7">
                            <div className="h-12 rounded-xl bg-second-bg p-3 font-lg">

                                mail

                            </div>
                            <div className=" h-12 rounded-xl bg-second-bg p-3 font-lg">

                                name

                            </div>
                        </div>
                        <div className="h-12 rounded-xl bg-second-bg p-3 font-lg">

                            object

                        </div>
                        <div className="h-32 rounded-xl bg-second-bg my-5 p-3 font-lg">
                            content

                        </div>
                    </div>


                    <div className='flex'>
                        <button onClick={HasClick} className="bg-second-bg hover:text-white text-main-green w-32 h-12 border border-main-green rounded-full">
                            send
                        </button>

                        <div className='px-5 pt-1'>
                            <p className={color}>
                                This functionality is not yet available please for email use my email address on the right
                            </p>
                        </div>


                    </div>



                </div>

                <div className="m-5">
                    <div className="text-right">
                        <div className="text-2xl">
                            on
                        </div>
                        <div className="text-3xl font-bold py-5 hover:text-white">
                            social media
                        </div>
                    </div>
                    <p className="text-main-green font-lg text-right">
                        contact us
                    </p>
                    <div className=" text-right text-xl pt-9 ">
                        <a href="mailto:clement.delbarre@edu.ece.fr" className='hover:text-white hover:underline'>
                            clement.delbarre@edu.ece.fr
                        </a>
                        <br />
                        <a href="mailto:martin.huck@edu.ece.fr" className='hover:text-white hover:underline'>
                            martin.huck@edu.ece.fr
                        </a>
                    </div>






                </div>
            </div>
            <div className="text-center font-extralight text-sm opacity-60">

                @Copyright-Clement Delbarre & Martin Huck 2022 - inspiration website : <span> <a href="https://clement-delbarre-web-site.vercel.app/" className="text-main-green"> Clement Delbarre </a> </span>

            </div>
        </div>
    )
}


