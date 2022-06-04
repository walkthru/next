import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import NoSSR from "./NoSSR";
import InterfaceSelect from "./InterfaceSelect";
import InterfaceContent from "./InterfaceContent";
import InterfaceCode from "./InterfaceCode";

function InterfaceMain({ files, steps }) {
  const router = useRouter()
  const segments = router.asPath.split('#')
  let stepSlug = segments[1] ? segments[1] : 'start'
  const hasStep = steps.findIndex(step => step.slug === stepSlug) > -1
  if (!hasStep) {
    stepSlug = 'start'
    // TODO: remove unfound hash from url
  }
  const stepIndex = steps.findIndex(step => step.slug === stepSlug)
  const [step, setStep] = useState(steps[stepIndex])
  const [nextStep, setNextStep] = useState(steps[stepIndex + 1])
  useEffect(() => {
    const onHashChangeStart = (url) => {
      const hash = url.split('#')[1]
      const stepIndex = steps.findIndex(step => step.slug === hash)
      setStep(steps[stepIndex])
      setNextStep(steps[stepIndex + 1])
    };
    router.events.on("hashChangeStart", onHashChangeStart);
    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events, steps]);
  return (
    <div className="flex gap-4 w-full">
      <div className="w-1/3 flex flex-col">
        <NoSSR>
          <InterfaceSelect tutorialSlug={segments[0]} key={step.slug} stepSlug={step.slug} steps={steps} />
          <InterfaceContent content={step} tutorialSlug={segments[0]} nextStepSlug={nextStep ? nextStep.slug : null} />
        </NoSSR>
      </div>
      <div className="w-2/3 flex">
        <NoSSR>
          <InterfaceCode files={files} active={step.frontmatter.file} key={`${step.frontmatter.file}-${step.frontmatter.focus}`} focus={step.frontmatter.focus} center={step.frontmatter.center} />
        </NoSSR>
      </div>
    </div>
  )
}

export default InterfaceMain
