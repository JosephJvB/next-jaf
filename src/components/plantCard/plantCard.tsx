import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { toDateStr } from "../../util";
import { WaterDropSVG } from "../svgs/waterDropSVG";
import { Plant } from "../../types/plant";
import { SaplingSVG } from "../svgs/saplingSVG";

const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

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
  const getCountdown = () => {
    const next = props.plant.lastHydrated + props.plant.hydrationInterval;
    const now = Date.now();
    if (now >= next) {
      return "Water me!";
    }
    const diff =
      props.plant.lastHydrated + props.plant.hydrationInterval - Date.now();
    const days = Math.floor(diff / day);
    const hrs = Math.floor((diff % day) / hour);
    const mins = Math.floor((diff % hour) / min);
    const secs = Math.floor((diff % min) / sec);
    return [`${days} days`, `${hrs} hrs`, `${mins} mins`, `${secs} secs`]
      .filter((str) => !str.startsWith("0 ") && !str.startsWith("-"))
      .join(" ");
  };
  const [hydrationPercent, setHydrationPercent] = useState(() =>
    getHydrationPercent()
  );
  const [foodPercent, setFoodPercent] = useState(() => getFoodPercent());
  const [countdown, setCountdown] = useState(() => getCountdown());
  useEffect(() => {
    const interval = setInterval(() => {
      setFoodPercent(getFoodPercent());
      setHydrationPercent(getHydrationPercent());
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // colours
  const blue = `rgba(96, 165, 250, 1) ${hydrationPercent}%`;
  const blueFade = `rgba(96, 165, 250, 0.2) ${hydrationPercent}%`;
  const green = `rgba(34, 197, 94, 1) ${foodPercent}%`;
  const greenFade = `rgba(34, 197, 94, 0.2) ${foodPercent}%`;

  const lastHydratedDate = new Date(props.plant.lastHydrated);
  const lastHydratedDateStr = toDateStr(lastHydratedDate);
  const lastFedDate = new Date(props.plant.lastFed);
  const lastFedDateStr = toDateStr(lastFedDate);
  return (
    <div className="border-grey-200 flex h-[80vh] max-h-[600px] w-[100%] items-center justify-center rounded-lg border-2 border-solid bg-white px-2 py-8">
      <Link
        href={`/upload?slug=${props.plant.slug}`}
        className="flex h-fit flex-col items-center justify-center space-y-6"
      >
        <div className="flex flex-col items-center justify-center">
          <Image
            draggable={false}
            width="100"
            height="150"
            className="border-grey-200 h-[150px] w-auto rounded-sm border-2 border-solid"
            src={props.plant.imageSrc}
            alt={props.plant.imageAlt}
          />
          <p className="text-xs text-gray-500">{lastHydratedDateStr}</p>
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
