import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { WaterDropSVG } from "../svgs/waterDropSVG";

export interface PlantCardProps {
  imageSrc: string;
  plantName: string;
  hydrationInterval: number;
  lastHydrated: number;
}
export const PlantCard: FC<PlantCardProps> = (props) => {
  const getHydrationPercent = () =>
    Math.round(
      ((Date.now() - props.lastHydrated) / props.hydrationInterval) * 100
    );
  const [hydrationPercent, setHydrationPercent] = useState(() =>
    getHydrationPercent()
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setHydrationPercent(getHydrationPercent());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // colours
  const blue = `rgba(96, 165, 250, 1) ${hydrationPercent}%`;
  const blueFade = `rgb(96, 165, 250, 0.2) ${hydrationPercent}%`;

  const lastHydratedDate = new Date(props.lastHydrated);
  const lastHydratedDateStr = [
    lastHydratedDate.toDateString().split(" ").slice(0, 3).join(" "),
    lastHydratedDate.toTimeString().split(" ")[0],
  ].join(", ");
  return (
    <div className="border-grey-200 flex h-[80vh] max-h-[600px] w-[300px] flex-col items-center justify-center space-y-6 rounded-lg border-2 border-solid px-2 py-8">
      <Image
        width="50"
        height="50"
        className="border-grey-200 h-24 w-auto rounded-sm border-2 border-solid"
        src={props.imageSrc}
        alt={`thumbnail of plant named ${props.plantName}`}
      />
      <h3 className="text-xl text-blue-400">{props.plantName}</h3>
      <p>last hydrated: {lastHydratedDateStr}</p>
      <button
        className="hover h-[60px] w-[60px] rounded-full border-2 border-solid border-gray-200 p-2"
        onClick={() => null}
        style={{
          backgroundImage: `linear-gradient(to top, ${blue}, ${blueFade})`,
        }}
      >
        <WaterDropSVG />
      </button>
    </div>
  );
};
