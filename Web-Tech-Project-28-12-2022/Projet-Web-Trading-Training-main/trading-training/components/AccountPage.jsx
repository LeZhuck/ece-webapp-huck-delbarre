import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import NavBar from './NavBar'
import Footer from './Footer'
import Link from 'next/link'
import Gravatar from 'react-gravatar'



export default function AccountPage({ session, Articles }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  //call the function getArticles() when the page is loaded
  Articles = getArticles()

  useEffect(() => {
    getProfile()
  }, [session])

  //function that gets only the Article with the same id_auteur that the user id
  function getArticles() {
    return Articles.filter((article) => article.id_auteur === user.id)
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

  async function updateProfile({ username, avatar_url }) {
    try {
      setLoading(true)
      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      }
      //console.log(updates)
      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      //console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (

    <div className='p-5 bg-[#121212]'>

      <NavBar />

      <div className='p-4 font-poppins text-white'>

        <div className="">
          <div className="grid grid-cols-1 gap-2 place-items-center lg:grid-cols-3 ">
            <div >
              <div className='mt-10 m-5 pt-5  px-5 '>
                <label className='font-bold' htmlFor="email">Email: </label>
                <br />
                <input className='bg-second-bg h-12 text-left m-5 px-3 rounded-xl overflow-x-auto' id="email" type="text" value={session.user.email} disabled />


              </div>
              <div className='m-5  px-5'>
                <label className='font-bold' htmlFor="username">Username</label>
                <br />
                <input
                  className='bg-second-bg h-12 text-left m-5 px-3 rounded-xl '
                  id="username"
                  type="text"
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>


              <div>
                <div className='px-5 text-center'>
                  <button
                    className="bg-second-bg hover:text-white text-main-green px-6 py-5 border border-main-green rounded-full"
                    onClick={() => updateProfile({ username, avatar_url })}
                    disabled={loading}
                  >
                    {loading ? 'Loading ...' : 'Update'}
                  </button>
                </div>
              </div>
            </div>
            <div className='col-span-2 mx-12'>

              <div className='grid grid-cols-1 gap-4 mt-20 pt-10 place-items-center xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 h-80 w-150 overflow-auto'>

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
          </div>
        </div>
      </div>

      <Footer />

    </div>


  )
}