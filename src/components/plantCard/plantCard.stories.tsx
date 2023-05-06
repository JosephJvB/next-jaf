import "../../styles/globals.css";
import { Meta, StoryObj } from "@storybook/react";
import { PlantCard } from "./plantCard";

const meta: Meta<typeof PlantCard> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/plantCard",
  component: PlantCard,
};

export default meta;
type Story = StoryObj<typeof PlantCard>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
const imageSrc =
  "https://inbloomflorist.flowermanager.net/wp-content/uploads/sites/23/2020/10/ZZ-Plant-50-of-6-1-960x1200.jpg";
export const Primary: Story = {
  args: {
    imageSrc,
    plantName: "zz plant",
    hydrationCycle: 200,
    lastHydrated: new Date(),
  },
  render: (props) => <PlantCard {...props} />,
};
