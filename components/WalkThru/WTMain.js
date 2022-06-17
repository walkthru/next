import { useEffect, useRef, useState } from 'react'
import NoSSR from './NoSSR'
import WTSelect from './WTSelect'
import WTContent from './WTContent'
import WTCode from './WTCode'
import styled from 'styled-components'

const Wrapper = styled.div`
  gap: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 639px) {
  }
`

const Cols = styled.div`
  gap: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: no-wrap;
  position: relative;
  @media (max-width: 639px) {
    transition: 0.3s ease-in-out;
    transform: ${(props) =>
      props.showCodeMobile
        ? 'translateX(calc(-100% + 2rem))'
        : 'translateX(0)'};
  }
`

const ColLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 639px) {
    width: calc(100% - 3rem);
    height: 100%;
    min-width: calc(100% - 3rem);
  }
  @media (min-width: 640px) and (max-width: 767px) {
    width: 50%;
  }
  @media (min-width: 768px) {
    width: 33.3%;
  }
`

const ColRight = styled.div`
  display: flex;
  min-height: 0;
  @media (max-width: 639px) {
    width: 100%;
    height: 100%;
  }
  @media (min-width: 640px) and (max-width: 767px) {
    width: 50%;
  }
  @media (min-width: 768px) {
    width: 66.6%;
  }
`

const Select = (props) => {
  return (
    <div className={props.className}>
      <WTSelect {...props} />
    </div>
  )
}

function WTMain({
  code,
  instructions,
  config,
  tutorialSlug,
  stepSlug,
  classes,
}) {
  const stepIndex = instructions.findIndex((step) => step.slug === stepSlug)
  const [lastStepFile, setLastStepFile] = useState('')
  const [step, setStep] = useState(instructions[stepIndex])
  const [nextStep, setNextStep] = useState(instructions[stepIndex + 1])
  const [prevStep, setPrevStep] = useState(instructions[stepIndex - 1])
  const [showCodeMobile, setShowCodeMobile] = useState(false)
  useEffect(() => {
    const stepIndex = instructions.findIndex((step) => step.slug === stepSlug)
    setStep(instructions[stepIndex])
    setNextStep(instructions[stepIndex + 1])
    setPrevStep(instructions[stepIndex - 1])
    if (stepIndex > 0) {
      setLastStepFile(instructions[stepIndex - 1].frontmatter.file)
    }
  }, [stepSlug, instructions])
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    function preventDefault(e) {
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
    el.addEventListener('touchstart', preventDefault, { passive: false })
    el.addEventListener('touchmove', preventDefault, { passive: false })
  }, [])
  return (
    <>
      <Wrapper ref={ref}>
        <Cols showCodeMobile={showCodeMobile}>
          <ColLeft>
            <NoSSR>
              <WTSelect
                tutorialSlug={tutorialSlug}
                stepSlug={stepSlug}
                steps={instructions}
                title={config.title}
                classes={classes.select}
              />
              <WTContent
                content={step}
                tutorialSlug={tutorialSlug}
                nextStepSlug={nextStep ? nextStep.slug : null}
                classes={classes.instructions}
              />
            </NoSSR>
          </ColLeft>
          <ColRight>
            <NoSSR>
              <WTCode
                files={code}
                step={step}
                sameFile={step.frontmatter.file === lastStepFile}
                config={config}
                drawerClick={() => setShowCodeMobile(!showCodeMobile)}
              />
            </NoSSR>
          </ColRight>
        </Cols>
      </Wrapper>
    </>
  )
}

export default WTMain
