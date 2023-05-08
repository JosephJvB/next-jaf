import "../../styles/globals.css";
import { Meta, StoryObj } from "@storybook/react";
import { UploadModal } from "./uploadModal";

const meta: Meta<typeof UploadModal> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/uploadModal",
  component: UploadModal,
};

export default meta;
type Story = StoryObj<typeof UploadModal>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    plantName: "zz plant",
    uploadUrl: "123",
    s3Key: "s3 key",
  },
  render: (props) => <UploadModal {...props} />,
};
