import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../components/Layout';
import NoSSR from "../../components/NoSSR";
import { useEffect, useState } from "react";
import Link from 'next/link'

import { useRouter } from "next/router";

const components = {}

function Guide({ steps }) {
  const router = useRouter()
  const segments = router.asPath.split('#')
  let stepSlug = segments[1] ? segments[1] : 'start'
  const hasStep = steps.findIndex(step => step.slug === stepSlug) > -1
  if (!hasStep) {
    stepSlug = 'start'
    // TODO: remove unfound hash from url
  }
  const [content, setContent] = useState(steps.find(step => step.slug === stepSlug))
  useEffect(() => {
    const onHashChangeStart = (url) => {
      const hash = url.split('#')[1]
      setContent(steps.find(step => step.slug === hash))
    };
    router.events.on("hashChangeStart", onHashChangeStart);
    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events, steps]);

  return (
    <Layout>
      {steps.map(step =>
        <Link key={step.slug} href={`${segments[0]}#${step.slug}`}>
          <a>{step.slug}</a>
        </Link>
      )}
      <NoSSR>
        { <MDXRemote {...content} components={components} /> }
      </NoSSR>
    </Layout>
  );
}

// This gets called at build time

import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const paths = fs.readdirSync(`walkthru`, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({ params: {
        slug: dirent.name
      } }))
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const tutorial = params.slug
  const json = fs.readFileSync(`walkthru/${tutorial}/config.json`, 'utf8');
  const config = JSON.parse(json)
  async function loadStepContent(step) {
    const md = fs.readFileSync(`walkthru/${tutorial}/${step}.md`, 'utf8')
    const content = await serialize(md, { parseFrontmatter: true })
    content.slug = step
    return content
  }
  const steps = []
  steps.push(await loadStepContent('start'))
  for await (const step of config.steps) {
    steps.push(await loadStepContent(step))
  }
  return { props: { steps } }
}

export default Guide
