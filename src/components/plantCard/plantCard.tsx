import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { toDateStr } from "../../util";
import { WaterDropSVG } from "../svgs/waterDropSVG";
import { Plant } from "@/types/plant";

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
  const [countdown, setCountdown] = useState(() => getCountdown());
  useEffect(() => {
    const interval = setInterval(() => {
      setHydrationPercent(getHydrationPercent());
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // colours
  const blue = `rgba(96, 165, 250, 1) ${hydrationPercent}%`;
  const blueFade = `rgb(96, 165, 250, 0.2) ${hydrationPercent}%`;

  const lastHydratedDate = new Date(props.plant.lastHydrated);
  const lastHydratedDateStr = toDateStr(lastHydratedDate);
  return (
    <div className="border-grey-200 flex h-[80vh] max-h-[600px] w-[300px] flex-col items-center justify-center space-y-6 rounded-lg border-2 border-solid px-2 py-8">
      <div className="flex flex-col items-center justify-center">
        <Image
          width="100"
          height="150"
          className="border-grey-200 h-[150px] w-auto rounded-sm border-2 border-solid"
          src={props.plant.imageSrc}
          alt={`thumbnail of plant named ${props.plant.plantName}`}
        />
        <p className="text-xs text-gray-500">{lastHydratedDateStr}</p>
      </div>
      <h3 className="text-xl text-blue-400">{props.plant.plantName}</h3>
      <p>{countdown}</p>
      <Link
        href={`/upload?slug=${props.plant.slug}`}
        className="hover h-[60px] w-[60px] rounded-full border-2 border-solid border-gray-200 p-2"
        onClick={() => null}
        style={{
          backgroundImage: `linear-gradient(to top, ${blue}, ${blueFade})`,
        }}
      >
        <WaterDropSVG />
      </Link>
    </div>
  );
};
