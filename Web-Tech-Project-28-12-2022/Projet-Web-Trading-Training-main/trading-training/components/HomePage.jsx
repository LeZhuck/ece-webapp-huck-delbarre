import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import Footer from './Footer'
import NavBar from './NavBar'
import Gravatar from 'react-gravatar'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

// get the components from the ../public/js/FinancialMonitor.jsx
import FinanceMonitor from '../public/js/FinancialMonitor'
import FinancialCandleStick from '../public/js/FinancialCandleStick'




export default function Account({ session, data, Articles }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [email, setEmail] = useState(null)
  const [color, setColor] = useColor({ "rgb": { "r": 18, "g": 18, "b": 18 } });
  const [themeClick, setThemeClick] = useState(false)

  if (user.email == null)
    insertemail();

  //console.log(Articles)
  //console.log(data)



  async function insertemail() {
    try {
      const updates = {
        id: user.id,
        updated_at: new Date().toISOString(),
        username: user.username,
        avatar_url: user.avatar_url,
        email: user.email,
      }
      //console.log(updates)
      let { error } = await supabase.from('profiles').upsert(updates)
      setEmail(user.email)
      if (error) throw error
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  /*useEffect(() => {
    getProfile()
    console.log(user)
  }, [session])*/

  async function DisplayColour() {
    let value = themeClick;
    setThemeClick(!value);
  }

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
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
    <div className='p-5'>
      <FinancialCandleStick couleur={color} />

      <NavBar username={user.username} />
      <div className='pt-12'>

        <hr className=" mx-auto h-1 bg-white rounded border-0 dark:bg-gray-700  mt-4"></hr>

        <div id='test' className='y-[150]'>

          <FinanceMonitor data={data} />
        </div>

        <hr className=" mx-auto h-1 bg-white rounded border-0 dark:bg-gray-700"></hr>
        <div className='flex justify-center text-white text-center font-medium text-[45px] py-[2%] sm:text-[68px]'>
          Trading -<span className='text-main-green'>-Training</span>
        </div>
        <div className='flex justify-center text-[#e0e0e0] text-center font-ligth text-24 py-4 mx-[25%] '>
          We are a community of traders who are passionate about trading and helping others learn to trade.
          They are willing to help you learn to trade by posting articles.
        </div>

        {themeClick ? (
          <div className='flex justify-center text-white text-center font-medium text-[45px] py-[2%] sm:text-[68px]'>
            <ColorPicker width={228} height={114} color={color} onChange={setColor} hideHSV dark />
          </div>
        ) :
          null}
        <div className='flex justify-center  text-center'>
          <input type='button' value="Color" className="bg-second-bg hover:text-white text-main-green px-4 py-2 border border-main-green rounded-full" onClick={DisplayColour} ></input>
        </div>
      </div>



      <div className='px-[7%] text-[#e0e0e0] pt-[5%]'>

        <div className='text-xl'>
          recent
        </div>
        <div className='text-3xl mt-2 hover:text-white mb-3 pb-10 font-bold'>
          Articles
        </div>

        <div className='grid grid-cols-1 gap-4  place-items-center  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>

          {Articles && Articles.map((article) => (
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
                        article.content != null ? article.content.length > 50 ? article.categories != null ? article.content.slice(0, 90) + '...': article.content.slice(0, 160) + '...'  : article.content : 'No content'}

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

      </div>




      <Footer />

    </div>

  )
}

