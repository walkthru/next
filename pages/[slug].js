import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import WalkThru from '../components/WalkThru/WTMain'
import Layout from '../components/Layout'

function App({ code, instructions, config }) {
  const router = useRouter()
  const segments = router.asPath.split('#')
  let step = segments[1] ? segments[1] : null
  if (step && instructions.find((s) => s.slug === step) === undefined) {
    step = null
  }
  const [tutorialSlug, setTutorialSlug] = useState(segments[0].substring(1))
  const [stepSlug, setStepSlug] = useState(step)
  useEffect(() => {
    document.title = config.title
  }, [config])
  useEffect(() => {
    const segments = router.asPath.split('#')
    const hash = segments[1]
    if (
      stepSlug === null &&
      hash !== undefined &&
      instructions.find((s) => s.slug === hash) === undefined
    ) {
      router.push(tutorialSlug)
    }
  }, [router, stepSlug, instructions, tutorialSlug])
  useEffect(() => {
    const onHashChangeStart = (url) => {
      const segments = url.split('#')
      setTutorialSlug(segments[0])
      setStepSlug(segments[1] ? segments[1] : null)
    }
    router.events.on('hashChangeStart', onHashChangeStart)
    return () => {
      router.events.off('hashChangeStart', onHashChangeStart)
    }
  }, [router.events])
  return (
    <Layout>
      <div className="flex h-full">
        <WalkThru
          code={code}
          instructions={instructions}
          config={config}
          tutorialSlug={tutorialSlug}
          stepSlug={stepSlug}
        />
      </div>
    </Layout>
  )
}

// This gets called at build time

import fs from 'fs'
import loadTutorial from '../components/WalkThru/loadTutorial'

export async function getStaticPaths() {
  const paths = fs
    .readdirSync(`walkthru`, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({
      params: {
        slug: dirent.name,
      },
    }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const ghpat = process.env.GH_PAT
  const { code, instructions, config } = await loadTutorial(params.slug, ghpat)
  return { props: { code, instructions, config } }
}

export default App
