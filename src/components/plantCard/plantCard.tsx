import Image from "next/image";
import { FC } from "react";
import { WaterDropSVG } from "../svgs/waterDropSVG";

export interface PlantCardProps {
  imageSrc: string;
  plantName: string;
  hydrationCycle: number;
  lastHydrated: Date;
}
export const PlantCard: FC<PlantCardProps> = (props) => {
  const hydrationScore = 70;
  return (
    <div className="border-grey-200 flex h-[80vh] max-h-[600px] w-[300px] flex-col items-center justify-center space-y-6 rounded-lg border-2 border-solid px-2 py-8">
      <Image
        width="50"
        height="50"
        className="border-grey-200 h-24 w-auto rounded-sm border-2 border-solid"
        src={props.imageSrc}
        alt={`thumbnail of plant named ${props.plantName}`}
      />
      <h3 className="text-xl">{props.plantName}</h3>
      <p>{hydrationScore} / 100</p>
      <button
        className="hover h-[60px] w-[60px] rounded-full border-2 border-solid border-gray-200 bg-blue-400 p-2 hover:bg-blue-500"
        onClick={() => null}
      >
        <WaterDropSVG />
      </button>
    </div>
  );
};
