import { FC, PropsWithChildren, useEffect, useState } from "react";
import { getPercent } from "../../types/plant";
import { RGBValue } from "../../constants";

export interface HealthIndicatorProps {
  rgbValues: RGBValue;
  ts: number;
  cycle: number;
}
export const HealthIndicator: FC<PropsWithChildren<HealthIndicatorProps>> = (
  props
) => {
  const calcPercent = () => getPercent(props.ts, props.cycle);
  const [percent, setPercent] = useState(() => calcPercent());

  if (typeof window !== "undefined") {
    useEffect(() => {
      const interval = setInterval(() => {
        setPercent(calcPercent());
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  }

  const from = `rgba(${props.rgbValues}, 1) ${percent}%`;
  const to = `rgba(${props.rgbValues}, 0.2) ${percent}%`;
  return (
    <div
      className="hover h-[60px] w-[60px] rounded-full border-2 border-solid border-gray-200 p-2"
      style={{
        backgroundImage: `linear-gradient(to top, ${from}, ${to})`,
      }}
    >
      {props.children}
    </div>
  );
};
