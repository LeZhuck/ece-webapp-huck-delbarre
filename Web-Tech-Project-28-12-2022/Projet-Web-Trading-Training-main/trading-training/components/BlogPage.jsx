import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import NavBar from './NavBar'
import Footer from './Footer'
import Gravatar from 'react-gravatar'
import Link from 'next/link'

import { supabaseData } from './api'


export default function BlogPage({ session, Articles }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  const [moreArticles, setMoreArticles] = useState(true)
  const [lessArticles, setLessArticles] = useState(false)

  const [numberOfArticles, setNumberOfArticles] = useState(5)
  const [allArticles, setAllArticles] = useState(false)
  



  useEffect(() => {
    //getProfile()    

    const slicedArray = Articles.slice(0, numberOfArticles);
    setAllArticles(slicedArray)
    
  }, [session])

  useEffect(() => {
    const slicedArray = Articles.slice(0, numberOfArticles);
    setAllArticles(slicedArray)
  }, [numberOfArticles])

  async function showMoreArticles() {    

    if (numberOfArticles + 5 >= Articles.length) {
      setNumberOfArticles(Articles.length)
      setMoreArticles(false)
    } else {
      setNumberOfArticles(numberOfArticles + 5)
      setLessArticles(true)
    }

  }
  async function showLessArticles() {

    if (numberOfArticles - 5 <= 5) {
      setNumberOfArticles(5)
      setLessArticles(false)
    } else {
      setNumberOfArticles(numberOfArticles - 5)
      setMoreArticles(true)
    }

  }



  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabaseData
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      //console.log(error)
    } finally {
      setLoading(false)
    }
  }


  return (

    <div className='p-5 bg-[#121212]'>

      <NavBar username={username}/>

      <div className='px-[5%] pt-16 text-white font-poppins'>

        <div>
          <button className="bg-second-bg hover:text-white text-main-green px-6 py-5 border border-main-green rounded-full ">
            <Link href="/createarticle"  >Create Article +</Link>
          </button>
        </div>

        <div className='grid grid-cols-1 gap-4 pt-10 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>

        {allArticles && allArticles.map((article) => (
            <div key={article.id_article}>
              <Link href={`/articles/${article.id_article}`} >

                <div className='max-w-[310px] min-w-[275px] h-[250px] bg-second-bg rounded-3xl p-4 mx-7 mb-6 shadow-inner shadow-slate-700 hover:scale-105 duration-1000'>

                  <div className='h-1/3'>
                    <div className=''>
                      <h1 className='text-md font-bold first-letter:text-3xl'>{article.title}</h1>
                    </div>
                  </div>

                  <div className='h-1/4'>
                    <div className='py-1'>

                      <h1 className='text-xs text-[##e0e0e0]'>{
                        //only display the first 50 characters of the article if the content is not null
                        article.content != null ? article.content.length > 50 ? article.categories != null ? article.content.slice(0, 95) + '...': article.content.slice(0, 160) + '...'  : article.content : 'No content'}

                      </h1>

                    </div>
                  </div>
                  
                  <div className='h-1/6 text-xs pt-2 font-bold'>{
                    // display article.categories.categorie if not null                   
                    
                    article.categories != null ?  "Tags: " + article.categories.categorie : ''

                  
                    }
          
                  </div>

                  <div className='h-1/5'>

                    <div className='pb-2 flex justify-center h-12'>
                      <div className='w-1/5'>
                        <Gravatar className='rounded-full h-12 CustomAvatar-image' email={article.user.email} size={45} rating="pg" default="identicon" />
                      </div>
                      <div className='w-4/5 pl-2 pt-1'>
                        <h1 className='text-xs  '>by <span className='text-main-green'>{article.user.username}</span> </h1>
                        <p className='pt-1 text-[12px]'> the {
                          // display the date of the article in a readable format
                          new Date(article.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })

                        } </p>

                      </div>

                    </div>

                  </div>

                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className='flex justify-center font-bold'>

          <div className='px-2'>
          {
            moreArticles && <input type='button' value="Show More +" className="bg-second-bg hover:text-white text-main-green px-6 py-5 border border-main-green rounded-full " onClick={showMoreArticles}></input>
           
          
          }
          </div>
          <div className='px-2'>
          {
            
            lessArticles && <input type='button' value="Show Less -" className="bg-second-bg hover:text-white text-main-green px-6 py-5 border border-main-green rounded-full " onClick={showLessArticles}></input>

          }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}







