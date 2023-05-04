import '../../styles/globals.css'
import { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './radioGroup'

const meta: Meta<typeof RadioGroup> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/radioGroup',
  component: RadioGroup,
}

export default meta
type Story = StoryObj<typeof RadioGroup>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    groupName: 'test',
    onChange: (value: string) => console.log('change:', value),
    options: [
      {
        value: 'value1',
        label: <p className="text-white">Value 1</p>,
      },
      {
        value: 'value2',
        label: <p className="text-white">Value 2</p>,
      },
    ],
  },
  argTypes: {},
  render: (props) => <RadioGroup {...props} />,
}
