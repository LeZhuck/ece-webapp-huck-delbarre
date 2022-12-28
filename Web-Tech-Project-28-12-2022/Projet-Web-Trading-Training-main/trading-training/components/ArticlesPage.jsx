import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import NavBar from './NavBar'
import Footer from './Footer'
import { supabaseData } from './api'



export default function ArticlesPage({ session, Articles, Comments }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  //initialisation an array of comments with the data from the DB
  const [comments, setComments] = useState(Comments)
  const [commentaire, setCommentaire] = useState(null)
  const [content, setContent] = useState(Articles.content)
  const [title, setTitle] = useState(Articles.title)
   addBreakLine(Articles.content)

  //console.log(Articles.user);

  //function Submit Comment to DB 
  async function NewComment() {
    try {
      setLoading(true)
      

      const insertion = {
        created_at: new Date().toISOString(),
        id_article: Articles.id_article,
        id_profile: user.id,
        content: commentaire,
        nb_like: 0,
      }
      //console.log(insertion)
      if (commentaire !== null) {
        let { error } = await supabase.from('comments').insert(insertion)
        insertion.user = {}
        insertion.user.username = username
        //console.log(insertion)
        //push the insertion to the front of the array of comments
        comments.unshift(insertion)
       
        setComments(comments)
        //console.log("apres unshift")
        //console.log(comments)
        if (error) throw error
        alert('Comment updated!')
      }
      else
        alert('You can\'t post an empty comment')
    } catch (error) {
      alert('Error inserting the data!')
      //console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function addBreakLine(content) {
    if(content != null)
    Articles.content = content.replace(/\r?\n/g, '<br>');
    
  }

  //function to incremente the number of likes in the DB of the table comments with the id of the comment
  async function LikeComment(comment) {
    try {
      setLoading(true)
      const updates = {
        id_comment: comment.id_comment,
        created_at: comment.created_at,
        id_article: comment.id_article,
        id_profile: comment.id_profile,
        content: comment.content,
        nb_like: comment.nb_like + 1,
      }
      //console.log(updates)
      if (comment.id_profile == user.id) {
        alert('You can\'t like your own comment')

      }
      else {
        let { error } = await supabase.from('comments').upsert(updates)
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].id_comment == comment.id_comment) {
            comments[i].nb_like = comment.nb_like + 1
          }
        }
        if (error) throw error
        alert('Like updated!')
      }
    } catch (error) {
      alert('Error updating the data!')
      //console.log(error)
    } finally {
      setLoading(false)
    }
  }

  //function to delete a comment from the DB with the comment
  async function DeleteComment(comment) {
    try {
      setLoading(true)
      let { error } = await supabase.from('comments').delete().eq('id_comment', comment.id_comment)
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id_comment == comment.id_comment) {
          comments.splice(i, 1)
        }
      }
      if (error) throw error
      alert('Comment deleted!')
    } catch (error) {
      alert('Error deleting the data!')
      //console.log(error)
    } finally {
      setLoading(false)
    }
  }

  //function to edit a comment from the DB with the comment
  async function EditComment(comment) {
    try {
      setLoading(true)
      //console.log(comment)
      const updates = {
        id_comment: comment.id_comment,
        created_at: comment.created_at,
        id_article: comment.id_article,
        id_profile: comment.id_profile,
        content: commentaire,
        nb_like: comment.nb_like,
      }
      //console.log(updates)
    
      //if the size of the comment is size  > 1
      if (commentaire.length > 0) {
        let { error } = await supabase.from('comments').upsert(updates)
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].id_comment == comment.id_comment) {
            comments[i].content = commentaire
          }
        }
        if (error) throw error
        alert('Comment updated!')
      }
      else
        alert('You can\'t post an empty comment')
    } catch (error) {
      alert('Error updating the data!')
      //(error)
    } finally {
      setLoading(false)
    }
  }

  //function to edit the article from the DB with the article 
  async function EditArticle() {
    try {
      setLoading(true)
      const updates = {
        id_article: Articles.id_article,
        created_at: Articles.created_at,
        content: content,
        title: title,
        id_auteur: Articles.id_auteur,
      }
      console.log(updates)
      //if the size of the comment is size  > 1
      if (title.length > 0 && content.length > 0) {

        let { error } = await supabase.from('articles').upsert(updates)
        if (error) throw error
        alert('Article updated!')
      }
      else
        alert('You can\'t post an empty article')
    } catch (error) {
      alert('Error updating the data!')
      //console.log(error)
    } finally {
      setLoading(false)
    }
  }

  //function to delete the article from the DB with the article
  async function DeleteArticle() {
    try {
      setLoading(true)
      let { error } = await supabase.from('comments').delete().eq('id_article', Articles.id_article)
      if (error) throw error
      alert('Comments deleted!')
    } catch (error) {
      alert('Error deleting the data of comments!')
      //console.log(error)
    } finally {
      setLoading(false)
    }
    try {
      setLoading(true)
      let { error } = await supabase.from('categories').delete().eq('id_article', Articles.id_article)
      if (error) throw error
      alert('categories deleted')
    } catch (error) {
      alert('Error deleting the data of categories!')
      //console.log(error)
    } finally {
      setLoading(false)
    }
    try {
      setLoading(true)
      let { error } = await supabase.from('articles').delete().eq('id_article', Articles.id_article)
      if (error) throw error
      alert('Article deleted!')
    } catch (error) {
      alert('Error deleting the data of the article !')
      //console.log(error)
    } finally {
      setLoading(false)
      window.location = '/blog'
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

  /*useEffect(() => {
    getProfile()
  }, [session])*/

  return (
    <div className='p-5 bg-[#121212]'>
      <NavBar username={username}/>
      <div className='px-12 text-white font-poppins'>
      {Articles.id_auteur != user.id &&
      <div>
        <h1 className='text-center text-2xl mt-20 py-5'>
          {
            Articles && Articles.title
          }
        </h1>
        <div className='px-10 py-5 text-right'>
          Written by <span className="underline">{Articles && Articles.user.username}</span>  on {
            // convert date to readable format
            new Date(Articles && Articles.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }
        </div>
        <div className='px-10 py-5 text-right font-bold'>
          {Articles && Articles.categories != null ?  "Tags: " + Articles.categories.categorie : ''}
        </div>
            {/* <div backgroundColor="black" className=' m-5 pt-5 px-5 '>
              <label className='font-bold' htmlFor="content">Categorie</label>
              <br />
              <Select className='w-[98%]  p-3 '
                isMulti
                options={TradeOptions}
                styles={colourStylesBlack}
                components={animatedComponents}
                value={TradeOptions.filter(obj => selectedValue.includes(obj.value))}
                onChange={handleChange}
              >
              </Select>
            </div> */}
        <div className='px-24 py-5 text-left'>
          <div dangerouslySetInnerHTML={{ __html: Articles.content }} />
        </div>
        </div>
        }
        {Articles.id_auteur == user.id &&
          <div>
            <h1 className='text-2xl mt-20 py-5 w-[95%]'>
              Title :
              <input type="text" className="w-full text-left px-3 py-2 text-base text-white placeholder-gray-600 border rounded-lg focus:shadow-outline" placeholder="Your comment or Edit Change" value={title} aria-label="Your comment" onChange={(e) => setTitle(e.target.value)} />
            </h1>
            <h1 className='text-2xl mt-1 py-5'>
              Content :
            </h1>
            <textarea
              className='bg-second-bg h-32 w-[95%] text-clip mt-1 p-3 rounded-xl'
              type="text"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <button className="justify-center border border-main-green rounded-lg mt-2 px-5 py-2  text-right text-base font-semibold text-main-green transition duration-200 ease-in bg-blue-600 hover:scale-105 duration-1000 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={EditArticle}>Submit Changes</button>
            <button className="justify-center ml-5 border border-main-green rounded-lg mt-2 px-5 py-2  text-right text-base font-semibold text-main-green transition duration-200 ease-in bg-blue-600 hover:scale-105 duration-1000 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={DeleteArticle}>Delete the Article</button>

          </div>
      }
        <div className='mx-5'>
          <hr className="my-6 h-1 bg-second-bg rounded border-0 md:my-10 dark:bg-gray-700"></hr>

          <div>

            <div className="text-2xl">
              Comments
            </div>
            <div className="text-3xl font-bold py-5 hover:text-white">
              Section
            </div>
          </div>

          <div className='flex'>
            <input type="text" className="w-full text-left px-3 py-2 text-base text-white placeholder-gray-600 border rounded-lg focus:shadow-outline" placeholder="Your comment or Edit Change" aria-label="Your comment" onChange={(e) => setCommentaire(e.target.value)} />
            <button className=" border border-main-green rounded-lg px-5 py-2 ml-3 text-right text-base font-semibold text-main-green transition duration-200 ease-in bg-blue-600 hover:scale-105 duration-1000 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={NewComment}>Submit</button>

          </div>
          <div className='flex flex-col mt-5 h-72 w-150 overflow-auto '>
            {comments && comments.map((comment) => (

              <div key={comment.id_comment} className='rounded-2xl bg-second-bg p-3 h-24 text-xs mt-2 mr-10'>
                <div className='flex'>
                  <div className='text-left w-1/2 '>
                    From <span className='font-bold '>{comment.user.username} </span> , <span className='pl-1 italic text-[10px]'>on {new Date(comment.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })} </span>
                  </div>
                  <div className='text-right w-1/2 text-main-green'>
                    {comment.id_profile == user.id &&
                      <button className='border text-white border-main-green rounded-lg px-2 py-1 ml-2 hover:scale-105 duration-1000' onClick={(e) => EditComment(comment)}>Edit</button>
                    }
                    {comment.id_profile == user.id &&
                      <button className='border text-white border-main-green rounded-lg px-2 py-1 ml-2 hover:scale-105 duration-1000' onClick={(e) => DeleteComment(comment)}>Delete</button>
                    }
                    <button className='mr-2 border text-white border-main-green rounded-lg px-2 py-1 ml-2 hover:scale-105 duration-1000' onClick={(e) => LikeComment(comment)}>Like</button>
                    {comment.nb_like}
                  </div>
                </div>

                <div className='px-16 pt-3 text-xs'>
                  <span className='italic'>&quot;{comment.content}&quot;</span>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>

      <Footer />

    </div>

  )
}



