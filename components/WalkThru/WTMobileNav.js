import styled from 'styled-components'
import { useRouter } from 'next/router'

function Right({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function Left({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const Nav = styled.div`
  display: none;
  justify-content: space-between;
  @media (max-width: 639px) {
    display: flex;
  }
`

const LeftArrow = styled(Left)`
  height: 2rem;
  width: 2rem;
`

const RightArrow = styled(Right)`
  height: 2rem;
  width: 2rem;
`

function Button({ className, children }) {
  return <button className={className}>{children}</button>
}

const ButtonStyled = styled(Button)``

const BackButton = styled(ButtonStyled)``

const ForwardButton = styled(ButtonStyled)``

function WTMobileNav({ tutorialSlug, prevStepSlug, nextStepSlug }) {
  const router = useRouter()
  function back() {
    router.push(`${tutorialSlug}#${prevStepSlug}`)
  }
  function forward() {
    console.log('forward')
    router.push(`${tutorialSlug}#${nextStepSlug}`)
  }
  console.log(tutorialSlug, prevStepSlug, nextStepSlug)
  return (
    <Nav>
      <BackButton onClick={back}>
        <LeftArrow />
      </BackButton>
      <ForwardButton onClick={() => forward()}>
        <RightArrow />
      </ForwardButton>
    </Nav>
  )
}

export default WTMobileNav
