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
      console.log(`codeHeight: ${codeEl.offsetHeight}`)
      console.log(`count: ${count}`)
      console.log(`lineHeight: ${lineHeight}`)
      console.log(`center: ${center}`)
      animateScroll.scrollTo((lineHeight * center) - (preEl.offsetHeight / 2), {
        containerId: 'code',
        duration: 500
      })
    }
  }, [content, center])
  return(
    <pre className="rounded h-full bg-slate-700 overflow-y-scroll" id="code">
      <code className="language-javascript" dangerouslySetInnerHTML={{__html: content}} />
    </pre>
  )
}

export default InterfaceCode
