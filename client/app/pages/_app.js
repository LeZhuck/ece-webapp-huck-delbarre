import '../styles/globals.css'
import { UserProvider } from '../components/UserContext'

function MyApp({ Component, pageProps }) {
  //return <Component {...pageProps} />

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
