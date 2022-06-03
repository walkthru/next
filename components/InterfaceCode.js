import { useEffect, useState } from "react"
import prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import addLineFormatting from '../src/lines.js'
import {animateScroll} from 'react-scroll'

function InterfaceCode({ files, active, focus, center }) {
  const file = files.find(file => file.path === active)
  const [content, setContent] = useState(file.content)
  useEffect(() => {
    const file = files.find(file => file.path === active)
    const highlighted = prism.highlight(file.content, prism.languages.javascript)
    setContent(addLineFormatting(highlighted, focus.toString()))
  }, [files, active, focus, center]);
  useEffect(() => {
    const preEl = document.querySelector('#code')
    const codeEl = document.querySelector('#code > code')
    const count = codeEl.querySelectorAll('.__line-number').length
    if (count > 1) {
      const lineHeight = codeEl.offsetHeight / count
      animateScroll.scrollTo((lineHeight * center) - (preEl.offsetHeight / 2), {
        containerId: 'code',
        duration: 300
      })
    }
  }, [content, center])
  return(
    <div className="rounded bg-stone-900 flex flex-col w-full" id="code-wrapper">
      <div className="rounded-t px-6 py-2 bg-stone-800">
        <ul className="flex gap-2 justify-end">
          {files.map(file =>
            <li
              key={file.path}
              className={`cursor-pointer text-xs rounded px-2 ${file.path === active ? 'bg-stone-600 text-stone-200' : 'text-stone-400 hover:bg-stone-700'}`
            }>{file.path}</li>
          )}
        </ul>
      </div>
      <pre className="overflow-y-scroll" id="code">
        <code className="language-javascript" dangerouslySetInnerHTML={{__html: content}} />
      </pre>
    </div>
  )
}

export default InterfaceCode
