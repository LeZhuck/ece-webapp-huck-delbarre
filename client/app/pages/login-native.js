

  
import styles from '../styles/Home.module.css'
import Header from '../styles/layout/Header'
import { useState } from 'react'
import {useForm} from 'react-hook-form'


export default function LoginNative() {

    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {register, handleSubmit} = useForm()

    const onSubmit = function(e) {
        //alert(JSON.stringify(e))
        console.log(e)        
        setPassword(e['Password'])
        setUsername(e['Username'])
        
      }

   





  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
            Login Native
        </h1>

        <p className={styles.description}>
          Enter your username and password to login           
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Formulaire</h2>
        <div>
          <input
            {...register('Username')}                
         
            
          />
        </div>
        <div>
                <input
                    {...register('Password')}                  

                />
        </div> 
        <div>
          <input type='submit' value='submit'></input>
    </div>
                
      </form>

      

      <div >
        <p>Username: {username}</p>
        <p>Password: {password}</p>
      </div>

       
      </main>

     
    </div>
  )
}

