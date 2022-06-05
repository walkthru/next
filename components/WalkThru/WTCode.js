import { useEffect, useState } from "react"
import prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import addLineFormatting from './lines.js'
import { animateScroll } from 'react-scroll'
import GithubIcon from "./GithubIcon";

function scrollNewCenter(center) {
  const preEl = document.querySelector('#code')
  const codeEl = document.querySelector('#code > code')
  const count = codeEl.querySelectorAll('.__line-number').length
  if (count > 1) {
    const lineHeight = codeEl.offsetHeight / count
    const scrollPos = (lineHeight * center) - (preEl.offsetHeight / 2)
    animateScroll.scrollTo(scrollPos, {
      containerId: 'code',
      duration: 500
    })
  }
}

function WTCode({ files, active, focus, center, sameFile, config }) {
  const [content, setContent] = useState('')
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const file = files.find(file => file.path === active)
  const [activeFile, setActiveFile] = useState(file)
  useEffect(() => {
    const highlighted = prism.highlight(activeFile.content, prism.languages.javascript)
    setContent(addLineFormatting(highlighted, focus.toString()))
  }, [activeFile, active, focus, center]);
  useEffect(() => {
    let scrollPos = 0
    if (sameFile) {
      animateScroll.scrollTo(prevScrollPos, {
        containerId: 'code',
        duration: 0
      })
      scrollPos = document.querySelector('#code').scrollTop
    }
    scrollNewCenter(center)
    setPrevScrollPos(scrollPos)
  }, [content, center, prevScrollPos, sameFile])
  return(
    <div className="rounded bg-stone-900 flex flex-col w-full" id="code-wrapper">
      <div className="rounded-t px-4 py-2 bg-stone-800 flex justify-end gap-2 ">
        <ul className="flex gap-2 justify-end">
          {files.map(file =>
            <li
              key={file.path}
              className={`cursor-pointer text-xs rounded px-2 ${file.path === active ? 'bg-stone-600 text-stone-200' : 'text-stone-400 hover:bg-stone-700'}`
            }>{file.path}</li>
          )}
        </ul>
        <a href={`https://github.com/${config.code.owner}/${config.code.repo}/blob/master/${activeFile.path}`} target="_blank">
          <GithubIcon />
        </a>
      </div>
      <pre className="overflow-y-scroll" id="code">
        <code className="language-javascript" dangerouslySetInnerHTML={{__html: content}} />
      </pre>
    </div>
  )
}

export default WTCode
