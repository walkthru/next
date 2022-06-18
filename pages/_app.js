import Head from 'next/head'
import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  function preventDefault(e) {
    e.preventDefault()
    e.stopImmediatePropagation()
  }
  function disableScroll() {
    document.body.addEventListener('touchmove', preventDefault, {
      passive: false,
    })
    document.body.addEventListener('touchstart', preventDefault, {
      passive: false,
    })
  }
  if (typeof document !== 'undefined') {
    disableScroll()
  }
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />

        <title>WalkThru</title>
        <meta name="title" content="WalkThru" />
        <meta
          name="description"
          content="A better way of explaining code on the web."
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://walkthru-next-demo.netlify.app/"
        />
        <meta property="og:title" content="WalkThru" />
        <meta
          property="og:description"
          content="A better way of explaining code on the web."
        />
        <meta
          property="og:image"
          content="https://walkthru-next-demo.netlify.app/meta.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://walkthru-next-demo.netlify.app/"
        />
        <meta property="twitter:title" content="WalkThru" />
        <meta
          property="twitter:description"
          content="A better way of explaining code on the web."
        />
        <meta
          property="twitter:image"
          content="https://walkthru-next-demo.netlify.app/meta.png"
        />
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
