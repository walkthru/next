import { useEffect, useState } from 'react'
import NoSSR from './NoSSR'
import WTSelect from './WTSelect'
import WTContent from './WTContent'
import WTCode from './WTCode'

function WTMain({ code, instructions, config, tutorialSlug, stepSlug }) {
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
    <div className="flex gap-4 w-full">
      <div className="w-1/3 flex flex-col">
        <NoSSR>
          <WTSelect
            tutorialSlug={tutorialSlug}
            stepSlug={stepSlug}
            steps={instructions}
            title={config.title}
          />
          <WTContent
            content={step}
            tutorialSlug={tutorialSlug}
            nextStepSlug={nextStep ? nextStep.slug : null}
          />
        </NoSSR>
      </div>
      <div className="w-2/3 flex">
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
      </div>
    </div>
  )
}

export default WTMain
