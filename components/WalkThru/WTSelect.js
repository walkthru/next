import {useRouter} from "next/router";
import Select from 'react-select';

function WTSelect({ tutorialSlug, stepSlug, steps, title }) {
  const router = useRouter()
  function navigate({ value }) {
    if (value) {
      router.push(`${tutorialSlug}#${value}`)
    } else {
      router.push(tutorialSlug)
    }
  }
  const options = [{
    label: title,
    options: steps.map((step, index) => ({ value: step.slug, label: `${index + 1}. ${step.frontmatter.title}` }))
  }]

  const selectStyles = {
    fontSize: '0.75rem',
    color: 'hsl(0, 0%, 20%)'
  }

  return (
    <Select
      className="mb-3 text-xs"
      defaultValue={options[0].options.find(o => o.value === stepSlug)}
      onChange={navigate}
      options={options}
      styles={{
        input: (base) => ({
          ...base,
          ...selectStyles,
          'input:focus': {
            boxShadow: 'none',
            borderColor: 'inherit'
          }
        }),
        control: (base) => ({
          ...base,
          ...selectStyles,
          boxShadow: 'none',
          borderColor: 'inherit'
        }),
        groupHeading: () => {
          return {
            ...selectStyles,
            borderBottom: '1px solid',
            paddingBottom: '0.75rem',
            textTransform: 'none',
            margin: '0 12px 0.75rem 12px',
            fontWeight: 'bold'
          }
        },
      }}
    />
  )
}

export default WTSelect
