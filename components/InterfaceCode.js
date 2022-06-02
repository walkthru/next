import { useEffect, useState } from "react"
import prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-highlight/prism-line-highlight'

function InterfaceCode({ files, active, focus }) {
  const file = files.find(file => file.path === active)
  const [content, setContent] = useState(file.content)
  useEffect(() => {
    const file = files.find(file => file.path === active)
    setContent(file.content)
    prism.highlightAll();
  }, [files, active]);
  return(
    <pre data-line={focus} className="line-numbers" data-file={active}>
    <code className="language-javascript">
      <div>{ content }</div>
    </code>
  </pre>
  )
}

export default InterfaceCode
