import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import ArticlesPage from '../../components/ArticlesPage'

import { useRouter } from 'next/router'

import FinancialCandleStick from '../../public/js/FinancialCandleStick'

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import Header from '../../components/Header'

import { supabaseData } from '../../components/api'

export const revalidate = 1

const Articles = ({Articles,Comments}) => {
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
              <ArticlesPage session={session} Articles={Articles} Comments = {Comments}/>
            </div>
          )}
        </div>
      </div>
    </div>  
    
  )
}
/*
export const getStaticPaths = async () => {
  
  
  const {data : Articles } = await supabaseData.from("articles").select("id_article");

  const Paths = Articles.map(({id_article}) => ({
    params: {
      id : id_article.toString(),
    }
  }) )

  return {
    paths: Paths,
    fallback : false,
  }

};
*/

// use a get static prop and return the data from the database of the article and the comments of the article


export const getServerSideProps = async ({req, res, params: {id}}) => {  

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=1'
  )

  const {data : Articles } = await supabaseData.from("articles").select("*").eq("id_article", id).single();
  const {data : Comments } = await supabaseData.from("comments").select("*").eq("id_article", id).order("created_at", {ascending: false});
  //for each comment, get the user data from the user table
  const { data: Categories } = await supabaseData.from("categories").select("*").eq("id_article", Articles.id_article).single();
  Articles.categories = Categories;
  for (let i = 0; i < Comments.length; i++) {
    const {data : User } = await supabaseData.from("profiles").select("*").eq("id", Comments[i].id_profile).single();
    Comments[i].user = User;
    
  }
  //console.log(Comments);
  /*if(Comments.length == 0){
    Comments = [{}];
  }*/

  //for each article get the username and the avatar url from the profiles table
  const {data : User } = await supabaseData.from("profiles").select("username").eq("id", Articles.id_auteur).single();
  //console.log(User);
 Articles.user = User;    

  return {
    props: {
      Articles,
      Comments,
    }
  }

}

export default Articles
