import { MDXRemote } from 'next-mdx-remote'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

const ButtonWrapper = styled.div`
  margin-top: 1.25rem;
  justify-content: flex-start;
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
  display: flex;
  gap: 0.25rem;
  @supports (-webkit-touch-callout: none) and (not (translate: none)) {
    & > * + * {
      margin-left: 0.25rem;
    }
  }
`

const components = {
  a: (props) => <a target="_blank" {...props}></a>,
}

const contentStyle = {
  paddingLeft: '0.25rem',
  paddingRight: '0.5rem',
}

function RightArrow({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

const RightArrowStyled = styled(RightArrow)`
  height: 1rem;
  width: 1rem;
`

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
        </div>
        <ButtonWrapper>
          {nextStepSlug ? (
            <Button onClick={next}>
              <span>Next step</span>
              <RightArrowStyled />
            </Button>
          ) : (
            <></>
          )}
        </ButtonWrapper>
      </SimpleBar>
    </div>
  )
}

export default WTContent
