import { MDXRemote } from 'next-mdx-remote'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

const ButtonWrapper = styled.div`
  justify-content: flex-end;
  display: flex;
`

const Button = styled.button`
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  --tw-bg-opacity: 1;
  background-color: rgb(245 158 11 / var(--tw-bg-opacity));
  border-radius: 0.25rem;
`

const components = {}

const contentStyle = {
  paddingLeft: '0.25rem',
  paddingRight: '0.5rem',
}

function WTContent({ content, tutorialSlug, nextStepSlug, classes }) {
  const router = useRouter()
  function next() {
    router.push(`${tutorialSlug}#${nextStepSlug}`)
  }
  const ref = useRef()

  useEffect(() => {
    ref.current.recalculate()
  }, [])
  useEffect(() => {
    ref.current.getScrollElement().scrollTo(0, 0)
  }, [content])
  return (
    <div style={{ overflow: 'hidden' }}>
      <SimpleBar
        style={{
          minHeight: 0,
          height: '100%',
        }}
        forceVisible="y"
        autoHide={false}
        ref={ref}
      >
        <div className={classes} style={contentStyle}>
          <MDXRemote {...content} components={components} />
          <ButtonWrapper>
            {nextStepSlug ? <Button onClick={next}>Next</Button> : <></>}
          </ButtonWrapper>
        </div>
      </SimpleBar>
    </div>
  )
}

export default WTContent
