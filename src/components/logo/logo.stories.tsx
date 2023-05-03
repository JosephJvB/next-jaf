import '../../styles/globals.css'
import { Meta, StoryObj } from '@storybook/react'
import { Logo } from './logo'

const meta: Meta<typeof Logo> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/logo',
  component: Logo,
}

export default meta
type Story = StoryObj<typeof Logo>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  argTypes: {},
  render: (props) => <Logo {...props} />,
}
