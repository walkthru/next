import { useEffect, useState } from 'react'
import { animateScroll } from 'react-scroll'
import style from './WTCode.module.css'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from './okaidia'
import styled from 'styled-components'
import WTFileBar from './WTFileBar'

const Pre = styled.pre`
  overflow-y: scroll;
  margin: 0;
  padding: 0;
  border-radius: 0.25rem;
`

const Line = styled.div`
  opacity: ${(props) => (props.highlighted ? '1;' : '0.5;')}
  -webkit-transition: opacity 100ms linear;
  -ms-transition: opacity 100ms linear;
  transition: opacity 100ms linear;
  display: flex;
  background-color: ${(props) =>
    props.highlighted ? '#100d0b;' : 'rgb(28 25 23);'}
  &:hover {
    background-color: #292524;
  }
  ${Pre}:hover & {
    opacity: ${(props) => (props.highlighted ? '1;' : '0.9;')}
  }
  ${Pre}.no-highlight & {
    opacity: 1;
  }
`

const Token = styled.span`
  opacity: ${(props) => (props.highlighted ? '1;' : '0.5;')}
  -webkit-transition: opacity 100ms linear;
  -ms-transition: opacity 100ms linear;
  transition: opacity 100ms linear;
  ${Pre}:hover & {
    opacity: ${(props) => (props.highlighted ? '1;' : '0.9;')}
  }
  ${Pre}.no-highlight & {
    opacity: 1;
  }
`

const LineNo = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 3rem;
  flex-shrink: 0;
`

const LineContent = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
`

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
    const scrollPos = lineHeight * center - preEl.offsetHeight / 2
    animateScroll.scrollTo(scrollPos, {
      containerId: 'code',
      duration: 500,
    })
  }
}

function WTCode({ files, step, sameFile, config }) {
  const { focus, language, center } = step.frontmatter
  const active = step.frontmatter.file
  const [content, setContent] = useState('')
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const file = files.find((file) => file.path === active)
  const [activeFile, setActiveFile] = useState(file)
  const highlightedLines = focus ? getHighlightedLines(focus.toString()) : []
  useEffect(() => {
    const file = files.find((file) => file.path === active)
    setActiveFile(file)
  }, [files, step, active])
  useEffect(() => {
    let scrollPos = 0
    if (sameFile) {
      animateScroll.scrollTo(prevScrollPos, {
        containerId: 'code',
        duration: 0,
      })
      scrollPos = document.querySelector('#code').scrollTop
    }
    scrollNewCenter(center)
    setPrevScrollPos(scrollPos)
  }, [content, center, prevScrollPos, sameFile])
  console.log(activeFile)
  return (
    <div id="code-wrapper" className={style.codeWrapper}>
      <WTFileBar files={files} activeFile={activeFile} config={config} />
      <Highlight
        {...defaultProps}
        theme={theme}
        code={activeFile.content}
        language={language || activeFile.path.split('.').pop()}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => {
          return (
            <Pre
              id="code"
              className={`${className} ${
                highlightedLines.length ? '' : 'no-highlight'
              }`}
            >
              <code>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i })
                  if (highlightedLines.indexOf(i + 1) > -1) {
                    lineProps.highlighted = true
                  }
                  return (
                    <Line {...lineProps} key={i.toString()}>
                      <LineNo
                        className="__line-no"
                        key={`number-${i.toString()}`}
                      >
                        {i + 1}
                      </LineNo>
                      <LineContent key={`content-${i.toString()}`}>
                        {line.map((token, key) => {
                          const tokenProps = getTokenProps({ token, key })
                          if (highlightedLines.indexOf(i + 1) > -1) {
                            tokenProps.highlighted = true
                          }
                          console.log(tokenProps)
                          return <Token {...tokenProps} key={`${i}-${key}`} />
                        })}
                      </LineContent>
                    </Line>
                  )
                })}
              </code>
            </Pre>
          )
        }}
      </Highlight>
    </div>
  )
}

export default WTCode
