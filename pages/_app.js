import Head from 'next/head'
import '../styles/globals.css'

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
  const url = 'https://walkthru.netlify.app/'
  const description =
    'A better way to explain your code for docs, tutorials, and teaching'
  const metaImage = 'https://walkthru.netlify.app/meta.png'
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />

        <title>WalkThru</title>
        <meta name="title" content="WalkThru" />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content="WalkThru" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={metaImage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content="WalkThru" />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={metaImage} />
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
