import { useEffect, useState } from "react"
import { animateScroll } from 'react-scroll'
import GithubIcon from "./GithubIcon";
import style from "./WTCode.module.css"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/okaidia";
import styled from "styled-components"

const Pre = styled.pre`
  overflow-y: scroll;
  margin: 0;
  padding: 0;
`;

const Line = styled.div`
  opacity: ${props => props.highlighted ? '1;' :'0.5;'}
  -webkit-transition: opacity 100ms linear;
  -ms-transition: opacity 100ms linear;
  transition: opacity 100ms linear;
  background-color: ${props => props.highlighted ? '#100d0b;' : 'rgb(28 25 23);'}
  &:hover {
    background-color: #292524;
  }
  ${Pre}:hover & {
    opacity: ${props => props.highlighted ? '1;' :'0.9;'}
  }
`;

const LineContent = styled.span`
  opacity: ${props => props.highlighted ? '1;' :'0.5;'}
  -webkit-transition: opacity 100ms linear;
  -ms-transition: opacity 100ms linear;
  transition: opacity 100ms linear;
  ${Pre}:hover & {
    opacity: ${props => props.highlighted ? '1;' :'0.9;'}
  }
`;

const LineNo = styled.span`
  display: inline-flex;
  justify-content: center;
  width: 3rem;
`;


function getHighlightedLines(focus) {
  if (focus.length === 0) {
    return
  }
  return focus.split(',').reduce((acc, cur) => {
    const range = cur.split('-')
    if (range.length === 1) {
      acc.push(parseInt(cur))
    } else {
      for (let i = parseInt(range[0]); i <= parseInt(range[1]); i++) {
        acc.push(i)
      }
    }
    return acc
  }, [])
}

function scrollNewCenter(center) {
  const preEl = document.querySelector('#code')
  const codeEl = document.querySelector('#code > code')
  const count = codeEl.querySelectorAll('.__line-no').length
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
  const highlightedLines = getHighlightedLines(focus.toString())
  useEffect(() => {
    // const highlighted = prism.highlight(activeFile.content, prism.languages.javascript)
    // setContent(addLineFormatting(highlighted, focus.toString()))
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
    <div id="code-wrapper" className={style.codeWrapper}>
      <div className={style.codeFiles}>
        <ul>
          {files.map(file =>
            <li
              key={file.path}
              className={file.path === active ? style.fileActive : ''}
            >{file.path}</li>
          )}
        </ul>
        <a href={`https://github.com/${config.code.owner}/${config.code.repo}/blob/master/${activeFile.path}`} target="_blank" rel="noreferrer">
          <GithubIcon />
        </a>
      </div>
      <Highlight {...defaultProps} theme={theme} code={activeFile.content} language={activeFile.path.split('.').pop()}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre id="code" className={className}>
            <code>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i })
                if (highlightedLines.indexOf(i + 1) > -1) {
                  lineProps.highlighted = true
                }
                return (
                  <Line {...lineProps}>
                    <LineNo className="__line-no">{i + 1}</LineNo>
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({ token, key })
                      if (highlightedLines.indexOf(i + 1) > -1) {
                        tokenProps.highlighted = true
                      }
                      return (
                        <LineContent {...tokenProps} />
                      )
                    })}
                  </Line>
                )
              })}
            </code>
          </Pre>
        )}
      </Highlight>,
    </div>
  )
}

export default WTCode
