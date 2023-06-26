import Footer from '../footer/footer';
import Head from 'next/head'
import NavBar from '../navBar/navbar';

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
        <title>Cinéfilo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <NavBar />
      <main className="main-container">{children}</main>
      <Footer />
    </>
  )
}
