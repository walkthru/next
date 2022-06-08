import { MDXRemote } from 'next-mdx-remote'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const ContentWrapper = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.5rem;
  overflow-y: auto;
`

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



function WTContent({ content, tutorialSlug, nextStepSlug, classes }) {
  const router = useRouter()
  function next() {
    router.push(`${tutorialSlug}#${nextStepSlug}`)
  }
  return (
    <ContentWrapper className={classes}>
      <MDXRemote {...content} components={components} />
      <ButtonWrapper>
        {nextStepSlug ? <Button onClick={next}>Next</Button> : <></>}
      </ButtonWrapper>
    </ContentWrapper>
  )
}

export default WTContent
