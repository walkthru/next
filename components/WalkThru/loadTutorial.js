import { Octokit } from "octokit";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";

async function getCode(owner, repo, files, ghpat) {
  const octokit = new Octokit({
    auth: ghpat
  })
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
  content.slug = step === 'start' ? null : step
  return content
}

async function loadTutorial(name, ghpat) {
  const json = fs.readFileSync(`walkthru/${name}/config.json`, 'utf8');
  const config = JSON.parse(json)
  const code = await getCode(config.code.owner, config.code.repo, config.code.files, ghpat)
  const instructions = []
  instructions.push(await loadStepContent(name, 'start'))
  for await (const step of config.steps) {
    instructions.push(await loadStepContent(name, step))
  }
  return { code, instructions, config }
}

export default loadTutorial
