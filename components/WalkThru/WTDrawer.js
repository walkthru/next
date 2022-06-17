import styled from 'styled-components'
import { useState } from 'react'

const DrawerIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const DrawerIconStyled = styled(DrawerIcon)`
  height: 1.25rem;
  width: 1.25rem;
  color: white;
  transform: ${(props) => (props.flipped ? 'scale(-1)' : 'scale(1)')};
  transition: 0.3s ease-in-out;
`

function DrawerTab({ className, drawerClick }) {
  const [flipped, setFlipped] = useState(false)
  function click() {
    setFlipped(!flipped)
    drawerClick()
  }
  return (
    <div className={className} onClick={click}>
      <DrawerIconStyled flipped={flipped} />
    </div>
  )
}

const DrawerTabStyled = styled(DrawerTab)`
  padding-left: 0.25rem;
  display: none;
  @media (max-width: 639px) {
    display: block;
  }
`

function WTDrawer({ drawerClick }) {
  return <DrawerTabStyled drawerClick={drawerClick} />
}

export default WTDrawer
