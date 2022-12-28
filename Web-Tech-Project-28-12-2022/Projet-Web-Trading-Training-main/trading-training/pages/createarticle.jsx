import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CreateArticlePage from '../components/CreateArticlePage'

import FinancialCandleStick from '../public/js/FinancialCandleStick'

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import Header from '../components/Header'

export const revalidate = 1

const Createarticle = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const couleur = ({"rgb":{"r":18,"g":18,"b":18}});

  return (
    <div>
      <Header></Header>



      <div className="">
        <div className="">
          {!session ? (
            <div className="">
            <FinancialCandleStick couleur={couleur}></FinancialCandleStick>
            <div className="flex flex-col mx-[25%] justify-center min-h-screen py-2">
              <Auth supabaseClient={supabase} providers={['github']} appearance={{
                theme: ThemeSupa, style: {
                  button: { background: '#0e0e0e', color: '#46DBC4', borderRadius: '10px', fontFamily: 'Poppins' },
                  anchor: { color: 'white',fontFamily: 'Poppins' },
                  input: { background: 'black', color: 'white', borderRadius: '10px',fontFamily: 'Poppins' },
                  divider: { background: '#46DBC4'},
                  
                  //..
                },
              }} theme="default" />
            </div>
          </div>

          ) : (
            <div className=''>
              <CreateArticlePage session={session} />
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Createarticle
