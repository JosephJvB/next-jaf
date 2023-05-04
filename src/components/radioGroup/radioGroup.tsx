import { ReactNode, StyleHTMLAttributes } from 'react'
import { FC } from 'react'

export interface RadioGroupProps {
  inputStyles?: StyleHTMLAttributes<HTMLInputElement>
  labelStyles?: StyleHTMLAttributes<HTMLLabelElement>
  groupName: string
  onChange: (value: string) => void
  options: {
    label: ReactNode
    value: string
  }[]
}
export const RadioGroup: FC<RadioGroupProps> = (props) => {
  return (
    <fieldset>
      {props.options.map((o, i) => (
        <label key={o.value} htmlFor={o.value}>
          {o.label}
          <input
            key={o.value}
            defaultChecked={i === 0}
            type="radio"
            id={o.value}
            name={props.groupName}
            value={o.value}
            onChange={() => props.onChange(o.value)}
          />
        </label>
      ))}
    </fieldset>
  )
}
