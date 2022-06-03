import { serialize } from 'next-mdx-remote/serialize';
import InterfaceMain from "../../components/InterfaceMain";
import Layout from '../../components/Layout';
import { Octokit } from "octokit";

function Guide({ files, steps }) {

  return (
    <Layout>
      <div className="flex h-full">
        <InterfaceMain files={files} steps={steps} />
      </div>
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

const octokit = new Octokit({
  auth: process.env.GH_PAT
})

async function getCode(owner, repo, files) {
  const data = await Promise.all(files.map(path => octokit.request('GET /repos/{owner}/{repo}/contents/{path}', { owner, repo, path })))
  return data.map(item => {
    let buff = new Buffer(item.data.content, 'base64')
    return {
      path: item.data.path,
      content: buff.toString('ascii')
    }
  })
}

async function loadStepContent(tutorial, step) {
  const md = fs.readFileSync(`walkthru/${tutorial}/${step}.md`, 'utf8')
  const content = await serialize(md, { parseFrontmatter: true })
  content.slug = step
  return content
}

export async function getStaticProps({ params }) {
  const tutorial = params.slug
  const json = fs.readFileSync(`walkthru/${tutorial}/config.json`, 'utf8');
  const config = JSON.parse(json)
  const files = await getCode(config.code.owner, config.code.repo, config.code.files)
  const steps = []
  steps.push(await loadStepContent(tutorial, 'start'))
  for await (const step of config.steps) {
    steps.push(await loadStepContent(tutorial, step))
  }
  return { props: { files, steps } }
}

export default Guide
