import {useRouter} from "next/router";

function InterfaceSelect({ tutorialSlug, stepSlug, steps }) {
  const router = useRouter()
  function navigate(event) {
    router.push(`${tutorialSlug}#${event.target.value}`)
  }
  return (
    <select onChange={navigate} defaultValue={stepSlug} className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
      {steps.map((step, index) =>
        <option key={step.slug} value={step.slug}>
          {index + 1}. {step.frontmatter.title}
        </option>
      )}
    </select>
  )
}

export default InterfaceSelect
