import '../../styles/globals.css'
import { Meta, StoryObj } from '@storybook/react'
import { ProfilePicture } from './profilePicture'

const meta: Meta<typeof ProfilePicture> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/profilePicture',
  component: ProfilePicture,
}

export default meta
type Story = StoryObj<typeof ProfilePicture>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  argTypes: {
    initials: {
      control: 'text',
    },
    imageSrc: {
      // https://yt3.googleusercontent.com/P6JCQgheTBEM71NFm8v1TdVlxWFr5C8LS6nXdZbmDGptxdTbocpDyzUPL-X5Ix-c4IjqJ5l74w=s176-c-k-c0x00ffffff-no-rj
      control: 'text',
    },
  },
  render: (props) => <ProfilePicture {...props} />,
}
