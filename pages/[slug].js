import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { WalkThru } from '@walkthru/react'
import Layout from '../components/Layout'
import NoSSR from '../components/NoSSR'

function Slug({ code, instructions, config }) {
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
    const onHashChangeStart = ({ newURL }) => {
      const segments = newURL.split('#')
      setTutorialSlug(segments[0])
      setStepSlug(segments[1] ? segments[1] : config.steps[0])
    }
    window.addEventListener('hashchange', onHashChangeStart)
    return () => {
      window.removeEventListener('hashchange', onHashChangeStart)
    }
  }, [router.events, config])
  return (
    <Layout>
      <div
        className="flex w-full relative max-w-screen-xl mx-auto"
        style={{ maxHeight: '800px' }}
      >
        <NoSSR>
          <WalkThru
            code={code}
            instructions={instructions}
            config={config}
            tutorialSlug={tutorialSlug}
            stepSlug={stepSlug}
            classes={{
              instructions: 'prose prose-sm max-w-none',
            }}
          />
        </NoSSR>
      </div>
    </Layout>
  )
}

// This gets called at build time

import fs from 'fs'
import { getData } from '@walkthru/data'

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

export default Slug
