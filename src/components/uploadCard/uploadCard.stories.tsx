import "../../styles/globals.css";
import { Meta, StoryObj } from "@storybook/react";
import { UploadCard } from "./uploadCard";
import { getRandomPlant } from "../../test/testUtil";

const meta: Meta<typeof UploadCard> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/uploadCard",
  component: UploadCard,
};

export default meta;
type Story = StoryObj<typeof UploadCard>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  args: {
    plant: getRandomPlant(),
  },
  render: (props) => <UploadCard {...props} />,
};
