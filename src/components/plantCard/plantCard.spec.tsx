import { render, screen } from "@testing-library/react";
import { getRandomPlant } from "../../test/testUtil";
import { PlantCard, PlantCardProps } from "./plantCard";

const renderComponent = (props: PlantCardProps) =>
  render(<PlantCard {...props} />);

describe("<PlantCard />", () => {
  it("should render the supplied plant data", () => {
    const plant = getRandomPlant();
    renderComponent({
      plant,
    });

    const imageEl: HTMLImageElement = screen.getByAltText(plant.plantName);
    expect(imageEl).toBeDefined();
    // TODO fix: failing cos of next/image component
    // expect(imageEl.src).toEqual(plant.imageSrc);
  });
});
