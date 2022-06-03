import {MDXRemote} from "next-mdx-remote";
import {useRouter} from "next/router";

const components = {}

function InterfaceContent({ content, tutorialSlug, nextStepSlug }) {
  const router = useRouter()
  function next() {
    router.push(`${tutorialSlug}#${nextStepSlug}`)
  }
  return(
    <div className="prose prose-sm overflow-y-scroll pl-1 pr-2">
      <MDXRemote {...content} components={components} />
      <div className="flex justify-end">
        { nextStepSlug ? <button className="text-xs bg-amber-500 text-white font-bold rounded px-4 py-2" onClick={next}>Next</button> : <></> }
      </div>
    </div>
  )
}

export default InterfaceContent
