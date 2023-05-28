import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { toDateStr } from "../../util";
import { WaterDropSVG } from "../svgs/waterDropSVG";
import { Plant } from "../../types/plant";
import { SaplingSVG } from "../svgs/saplingSVG";
import { PlantImage } from "../plantImage/plantImage";

export interface PlantCardProps {
  plant: Plant;
}
export const PlantCard: FC<PlantCardProps> = (props) => {
  const getHydrationPercent = () =>
    100 -
    Math.round(
      ((Date.now() - props.plant.lastHydrated) /
        props.plant.hydrationInterval) *
        100
    );
  const getFoodPercent = () =>
    100 -
    Math.round(
      ((Date.now() - props.plant.lastFed) / props.plant.foodInterval) * 100
    );
  const [hydrationPercent, setHydrationPercent] = useState(() =>
    getHydrationPercent()
  );
  const [foodPercent, setFoodPercent] = useState(() => getFoodPercent());
  useEffect(() => {
    const interval = setInterval(() => {
      setFoodPercent(getFoodPercent());
      setHydrationPercent(getHydrationPercent());
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // colours
  const blue = `rgba(96, 165, 250, 1) ${hydrationPercent}%`;
  const blueFade = `rgba(96, 165, 250, 0.2) ${hydrationPercent}%`;
  const green = `rgba(34, 197, 94, 1) ${foodPercent}%`;
  const greenFade = `rgba(34, 197, 94, 0.2) ${foodPercent}%`;

  const imageDateStr = toDateStr(new Date(props.plant.imageTS));
  return (
    <div className="border-grey-200 flex h-[80vh] max-h-[600px] w-[100%] items-center justify-center rounded-lg border-2 border-solid bg-white px-2 py-8">
      <Link
        href={`/upload?slug=${props.plant.slug}`}
        className="flex h-fit flex-col items-center justify-center space-y-6"
      >
        <div className="flex flex-col items-center justify-center">
          <PlantImage plant={props.plant} />
          <p className="text-xs text-gray-500">{imageDateStr}</p>
        </div>
        <h3 className="text-xl text-blue-400">{props.plant.plantName}</h3>
        {/* <p>{countdown}</p> */}
        <div className="flex flex-row">
          <div
            className="hover h-[60px] w-[60px] rounded-full border-2 border-solid border-gray-200 p-2"
            style={{
              backgroundImage: `linear-gradient(to top, ${blue}, ${blueFade})`,
            }}
          >
            <WaterDropSVG />
          </div>
          <div
            className="hover h-[60px] w-[60px] rounded-full border-2 border-solid border-gray-200 p-[10px]"
            style={{
              backgroundImage: `linear-gradient(to top, ${green}, ${greenFade})`,
            }}
          >
            <SaplingSVG />
          </div>
        </div>
      </Link>
    </div>
  );
};
