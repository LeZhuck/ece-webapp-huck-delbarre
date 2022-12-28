import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HomePage from '../components/HomePage'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'


import { Auth, ThemeMinimal, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
//import Articles from './articles/[id]'

import { supabaseData } from '../components/api'

import FinancialCandleStick from '../public/js/FinancialCandleStick'

import Header from '../components/Header'

export const revalidate = 1

const Home = ({ data, Articles }) => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const couleur = ({"rgb":{"r":18,"g":18,"b":18}});


  return (
    // flex center
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
              <HomePage session={session} data={data} Articles={Articles} />
            </div>
          )}
        </div>
      </div>





    </div>
  )
}

// get static props
export async function getServerSideProps({ req, res }) {
  // get the data from the binance api
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=1'
  )

  // get the data from the binance api
  const resp = await fetch('https://api.binance.us/api/v3/ticker/24hr')
  const CryptoData = await resp.json()

  // only keep the USDT pairs without filters

  //const data = CryptoData.filter((item) => item.symbol.includes('USDT'))
  
  CryptoData.length = 100
  // only keep the first 100 pairs
  const data = CryptoData
  // supabase select most recent articles

  const { data: Articles } = await supabaseData.from("articles").select("*").order('created_at', { ascending: false });
  for (let i = 0; i < Articles.length; i++) {
    const { data: User } = await supabaseData.from("profiles").select("*").eq("id", Articles[i].id_auteur).single();
    Articles[i].user = User;
    const { data: Categories } = await supabaseData.from("categories").select("*").eq("id_article", Articles[i].id_article).single();
    Articles[i].categories = Categories;
  }


  

  // only keep the first 8 articles (most recent)
  if(Articles.length > 8)
    Articles.length = 8;

  //console.log(Articles)



  // return the data
  return {
    props: { data, Articles },
  }
}

export default Home


