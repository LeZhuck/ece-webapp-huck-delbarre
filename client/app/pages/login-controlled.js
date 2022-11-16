import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import { useState } from 'react'


import { UserContext } from '../components/UserContext';



export default function LoginNative({Profiles}) {

    const [data, setData] = useState({})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({ username: "guest",
    mail: "no mail",
})
       

    

    const onSubmit = function(e) {
      e.preventDefault()
      console.log(data)

      
      for (const profile of Profiles) {
        //console.log(el);
        if (profile.username === username) {
          setUser(
            { username: username,
            mail: profile.mail,
        })
          break;
        }
      }




    }

    const onChange = function(e) {
        setUsername(data.username)
        setPassword(data.password)

       
        
    
    }
        
    

   





  return (
    <UserContext.Provider value={user}>
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
            Login Controlled
        </h1>

        <p className={styles.description}>
          Enter your username and password to login           
        </p>

        <form onSubmit={onSubmit}>
        <h2>Formulaire</h2>
        <div>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={e => setData({...data, ...{username: e.target.value}})}
         
            
          />
        </div>
        <div>
                <input
                    type="text"
                    name="password"
                    value={data.password}
                    onChange={e => setData({...data, ...{password: e.target.value}})}

                />
        </div> 
        <div>
          <button onClick={onChange} > Submit</button>
    </div>
                
      </form>

      

      <div >
        <p>Username: {username}</p>
        <p>Password: {password}</p>
      </div>

       
      </main>

     
    </div>
    </UserContext.Provider>
  )
}


export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/profile");
  const {Profiles} = await res.json();
  console.log(Profiles);
  return {
      props: {
          Profiles,
      }
  }
}