import Head from 'next/head'
import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    function preventDefault(e) {
      var source = e.target || e.srcElement
      console.log('body handler')
      e.preventDefault()
    }
    function disableScroll() {
      document.body.addEventListener('touchmove', preventDefault, {
        passive: false,
      })
      document.body.addEventListener('touchstart', preventDefault, {
        passive: false,
      })
    }
    disableScroll()
    // return () => enableScroll()
  }, [])
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
