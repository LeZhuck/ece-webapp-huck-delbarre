import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import NavBar from './NavBar'
import Footer from './Footer'
import Link from 'next/link'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

export default function CreateArticlePage({ session }) {
    const supabase = useSupabaseClient()
    const user = useUser()
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [selectedValue, setSelectedValue] = useState([]);
    const [idarticle, setIdarticle] = useState(null)

    const TradeOptions = [
        { value: "Personal finance", label: "Personal finance" },
        { value: "Corporate finance", label: "Corporate finance" },
        { value: "Public finance", label: " Public finance" },
        { value: "Behavioral finance", label: " Behavioral finance" },
        { value: "Financial markets", label: " Financial markets" },
        { value: "Financial institutions", label: "Financial institutions" },
        { value: "Financial planning", label: "Financial planning" },
        { value: "Financial management", label: "Financial management" },
        { value: "Financial economics", label: "Financial economics" },
        { value: "Financial engineering", label: "Financial engineering" },
        { value: "Crypto", label: "Crypto" },
        { value: "Technical Indicator", label: "Technical Indicator" },
        { value: "Trading", label: "Trading" },
        { value: "Stock trading", label: "Stock trading" },
        { value: "Forex trading", label: "Forex trading" },
        { value: "Options trading", label: "Options trading" },
        { value: "Futures trading", label: "Futures trading" },
        { value: "Cryptocurrency trading", label: "Cryptocurrency trading" },
        { value: "Commodity trading", label: "Commodity trading" },
        { value: "Derivatives trading", label: "Derivatives trading" },
        { value: "Technical analysis", label: "Technical analysis" },
        { value: "Algorithmic trading", label: "Algorithmic trading" },
        { value: "High-frequency trading", label: "High-frequency trading" }
    ];


    const colourStylesBlack = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            // const color = chroma(data.color);
            //console.log({ data, isDisabled, isFocused, isSelected });
            return {
                ...styles,
                backgroundColor: isFocused ? "#8D8D8D" : "#5D5C5A",
                border: `1px solid #CDD0E0`,
                borderWidth: "0.1px",
                borderStyle: "solid",
                color: isFocused ? "#F9FAFC" : "#F9FAFC"
            };
        }
    };


    /*useEffect(() => {
        getProfile()
    }, [session])*/

    //function to get the selected options from the select component
    const handleChange = (e) => {
        let value = e.map(x => x.value);
        setSelectedValue(value);
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

   
    async function newArticles() {
        let { data, error } = await supabase
            .from('articles')
            .select('id_article')
            .order('id_article', { ascending: false })
            .limit(1)
            .single()
        if (data.id_article == null) {
            setIdarticle(0)
        }
        else {
            setIdarticle(data.id_article + 1)
        }
        try {
            setLoading(true)
            const insertion = {
                created_at: new Date().toISOString(),
                content: content,
                title: title,
                id_auteur: user.id,
            }
            let { error } = await supabase.from('articles').insert(insertion)
            if (error) throw error
            alert('Article created')
        } catch (error) {
            //console.log(error)
        } finally {
            setLoading(false)
        }
        try {
            setLoading(true)
            for (let i = 0; i < selectedValue.length; i++) {
                let insertion2 = {
                    id_article: data.id_article + 1,
                    id_auteur: user.id,
                    categorie: selectedValue[i],
                }
                let { error } = await supabase.from('categories').insert(insertion2)
                if (error) throw error
            }
        } catch (error) {
            //console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='p-5 bg-[#121212]'>

            <NavBar username={username}/>

            <div className='p-4 font-poppins text-white'>

                <div className="form-widget">

                    <div className='m-5 pt-5 px-5'>
                        <label className='font-bold' htmlFor="title">Title</label>
                        <br />
                        <input
                            className='bg-second-bg h-12 text-left m-5 px-3 rounded-xl '
                            id="title"
                            type="text"
                            value={title || ''}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>

                    <div className='m-5 pt-5 px-5'>
                        <label className='font-bold' htmlFor="content">Content</label>
                        <br />
                        <textarea
                            className='bg-second-bg h-32 w-[95%] text-clip m-5 p-3 rounded-xl'
                            id="content"
                            type="text"
                            value={content || ''}
                            onChange={e => setContent(e.target.value)}
                        />
                    </div>

                    <div backgroundColor="black" className=' m-5 pt-5 px-5 '>
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
                    </div>

                    <div className='flex justify-center'>
                        <div className='px-5'>
                            <button
                                className="bg-second-bg hover:text-white text-main-green px-6 py-5 border border-main-green rounded-full"

                            >
                                <Link href="/blog"  >Cancel</Link>
                            </button>
                        </div>

                        <div className='px-5'>
                            <button
                                className="bg-second-bg hover:text-white text-main-green px-6 py-5 border border-main-green rounded-full"
                                onClick={newArticles}

                            >
                                {loading ? 'Loading ...' : 'Insert'}

                            </button>
                        </div>

                    </div>

                </div>
            </div>

            <Footer />

        </div>


    )
}