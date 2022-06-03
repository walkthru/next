import {useRouter} from "next/router";
import Select from 'react-select';

function InterfaceSelect({ tutorialSlug, stepSlug, steps }) {
  const router = useRouter()
  function navigate({ value }) {
    router.push(`${tutorialSlug}#${value}`)
  }
  const options = steps.map((step, index) => ({ value: step.slug, label: `${index + 1}. ${step.frontmatter.title}` }))
  return (
    <Select
      className="mb-3 text-xs"
      defaultValue={options.find(o => o.value === stepSlug)}
      onChange={navigate}
      options={options}
      styles={{
        input: (base) => ({
          ...base,
          'input:focus': {
            boxShadow: 'none',
            borderColor: 'inherit'
          }
        }),
        control: (base) => ({
          ...base,
          boxShadow: 'none',
          borderColor: 'inherit'
        }),
      }}
    />
  )
}

export default InterfaceSelect
