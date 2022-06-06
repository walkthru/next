import { useEffect, useState } from 'react'
import NoSSR from './NoSSR'
import WTSelect from './WTSelect'
import WTContent from './WTContent'
import WTCode from './WTCode'
import styled from 'styled-components'

const Wrapper = styled.div`
  gap: 1rem;
  width: 100%;
  display: flex;
`
const ColLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.333333%;
`
const ColRight = styled.div`
  display: flex;
  width: 66.666666%;
`

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
  useEffect(() => {
    const stepIndex = instructions.findIndex((step) => step.slug === stepSlug)
    setStep(instructions[stepIndex])
    setNextStep(instructions[stepIndex + 1])
    if (stepIndex > 0) {
      setLastStepFile(instructions[stepIndex - 1].frontmatter.file)
    }
  }, [stepSlug, instructions])
  return (
    <Wrapper>
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
            active={step.frontmatter.file}
            focus={step.frontmatter.focus}
            center={step.frontmatter.center}
            sameFile={step.frontmatter.file === lastStepFile}
            config={config}
          />
        </NoSSR>
      </ColRight>
    </Wrapper>
  )
}

export default WTMain
