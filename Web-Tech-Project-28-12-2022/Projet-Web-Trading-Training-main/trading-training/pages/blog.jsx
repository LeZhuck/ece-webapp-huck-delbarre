import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BlogPage from '../components/BlogPage'


import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import { supabaseData } from '../components/api'

import FinancialCandleStick from '../public/js/FinancialCandleStick'

import Header from '../components/Header'

export const revalidate = 1

const Blog = ({Articles}) => {
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
              <BlogPage session={session} Articles={Articles}/>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export const getServerSideProps = async ({req, res }) => {
  
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=1'
  )

  const {data : Articles } = await supabaseData.from("articles").select("*");
  for (let i = 0; i < Articles.length; i++) {
    const {data : User } = await supabaseData.from("profiles").select("*").eq("id", Articles[i].id_auteur).single();
    Articles[i].user = User;
    const { data: Categories } = await supabaseData.from("categories").select("*").eq("id_article", Articles[i].id_article).single();
    Articles[i].categories = Categories;

  }

  return {
    props: {
      Articles,
    }
  }

}

export default Blog
