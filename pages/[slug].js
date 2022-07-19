import { useEffect } from 'react'
import { WalkThru } from '@walkthru/react'
import Layout from '../components/Layout'
import NoSSR from '../components/NoSSR'

const instructionsStyle = `
  color: rgb(55, 65, 81);
  font-size: 14px;
  line-height: 24px;
  font-family: ui-sans-serif, system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  
  li {
    margin: 3px 0;
  }
  
  a[target="_blank"]:after {
    content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
    margin: 0 1px 0 4px;
  }
  
  code:not([class*=language-]) {
    color: rgb(249, 38, 114);
    font-weight: 400;
    font-size: .875em;
    padding: 1px 3px;
    background-color: #f3f4f6;
    border-radius: 0.25rem;
  }

  code:not([class*=language-]):before,
  code:not([class*=language-]):after {
    content: ''
  }
`

function Slug({ data, slug }) {
  const { config } = data
  useEffect(() => {
    document.title = config.title
  }, [config])
  return (
    <Layout>
      <div
        className="flex w-full relative max-w-screen-xl mx-auto"
        style={{ maxHeight: '800px' }}
      >
        <NoSSR>
          <WalkThru
            data={data}
            slug={slug}
            instructionsStyle={(base) => `
              ${base}
              ${instructionsStyle}
            `}
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
  const data = await getData({ githubToken })
  return {
    props: data.find((item) => item.slug === params.slug),
  }
}

export default Slug
