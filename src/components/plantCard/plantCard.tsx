import { FC } from "react";
import Link from "next/link";
import { toDateStr } from "../../util";
import { WaterDropSVG } from "../../svgs/waterDropSVG";
import { Plant } from "../../types/plant";
import { SaplingSVG } from "../../svgs/saplingSVG";
import { PlantImage } from "../plantImage/plantImage";
import { RGB } from "../../constants";
import { HealthIndicator } from "../healthIndicator/healthIndicator";

export interface PlantCardProps {
  plant: Plant;
}
export const PlantCard: FC<PlantCardProps> = (props) => {
  const imageDateStr = toDateStr(new Date(props.plant.imageTS));
  return (
    <div className="border-grey-200 flex h-[80vh] w-[100%] items-center justify-center rounded-lg border-2 border-solid bg-white px-5 py-8 pt-0">
      <Link
        href={`/upload?slug=${props.plant.slug}`}
        className="flex h-fit flex-col items-center justify-center space-y-6"
      >
        <div className="flex flex-col items-center justify-center">
          <PlantImage plant={props.plant} />
          <p className="text-xs text-gray-500">{imageDateStr}</p>
        </div>
        <h3 className="text-xl text-blue-400">{props.plant.plantName}</h3>
        <div className="flex flex-row space-x-1">
          <HealthIndicator
            rgbValues={RGB.Blue}
            ts={props.plant.lastHydrated}
            cycle={props.plant.hydrationInterval}
          >
            <WaterDropSVG />
          </HealthIndicator>
          <HealthIndicator
            rgbValues={RGB.Green}
            ts={props.plant.lastFed}
            cycle={props.plant.foodInterval}
          >
            <SaplingSVG />
          </HealthIndicator>
        </div>
      </Link>
    </div>
  );
};
