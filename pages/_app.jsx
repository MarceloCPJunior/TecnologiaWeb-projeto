import '../styles/globals.css'
import RootLayout from '../components/layout/layout'
import { AuthProvider } from '../services/authContext'

function MyApp({ Component, pageProps }){
  return (
    <AuthProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </AuthProvider>
  )
}

export default MyApp