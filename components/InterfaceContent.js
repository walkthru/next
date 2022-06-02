import {MDXRemote} from "next-mdx-remote";

const components = {}

function InterfaceContent({ content }) {
  return(
    <div className="prose">
      <MDXRemote {...content} components={components} />
    </div>
  )
}

export default InterfaceContent
