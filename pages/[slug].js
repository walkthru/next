import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import WalkThru from '../components/WalkThru/WTMain'
import Layout from '../components/Layout'

function App({ code, instructions, config }) {
  const router = useRouter()
  const segments = router.asPath.split('#')
  let step = segments[1] ? segments[1] : config.steps[0]
  if (config.steps.find((slug) => slug === step) === undefined) {
    step = config.steps[0]
  }
  const [tutorialSlug, setTutorialSlug] = useState(segments[0].substring(1))
  const [stepSlug, setStepSlug] = useState(step)
  useEffect(() => {
    document.title = config.title
  }, [config])
  useEffect(() => {
    const onHashChangeStart = (url) => {
      const segments = url.split('#')
      setTutorialSlug(segments[0])
      setStepSlug(segments[1] ? segments[1] : config.steps[0])
    }
    router.events.on('hashChangeStart', onHashChangeStart)
    return () => {
      router.events.off('hashChangeStart', onHashChangeStart)
    }
  }, [router.events, config])
  return (
    <Layout>
      <div className="flex h-full">
        <WalkThru
          code={code}
          instructions={instructions}
          config={config}
          tutorialSlug={tutorialSlug}
          stepSlug={stepSlug}
          classes={{
            select: '',
            instructions: 'prose prose-sm',
          }}
        />
      </div>
    </Layout>
  )
}

// This gets called at build time

import fs from 'fs'
import getData from '../components/WalkThru/getData'

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
  const githubToken = process.env.GH_PAT
  const { code, instructions, config } = await getData(params.slug, githubToken)
  return { props: { code, instructions, config } }
}

export default App
