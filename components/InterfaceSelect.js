import {useRouter} from "next/router";

function InterfaceSelect({ tutorialSlug, stepSlug, steps }) {
  const router = useRouter()
  function navigate(event) {
    router.push(`${tutorialSlug}#${event.target.value}`)
  }
  return (
    <select onChange={navigate} defaultValue={stepSlug}>
      {steps.map(step =>
        <option key={step.slug} value={step.slug}>
          {step.slug}
        </option>
      )}
    </select>
  )
}

export default InterfaceSelect
