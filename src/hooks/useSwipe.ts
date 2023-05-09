import { useState } from "react";

type Event =
  | MouseEvent
  | TouchEvent
  | React.TouchEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>;

export const useSwipe = (onEnd: (start: number, end: number) => void) => {
  const [startX, setStartX] = useState(0);
  return {
    start: (e: Event) => {
      console.log("start");
      const event = "changedTouches" in e ? e.changedTouches[0] : e;
      setStartX(event.clientX);
    },
    move: (e: Event) => {
      // if (!swiping) {
      //   return;
      // }
      // const event = "changedTouches" in e ? e.changedTouches[0] : e;
      // setX(event.clientX);
    },
    end: (e: Event) => {
      const event = "changedTouches" in e ? e.changedTouches[0] : e;
      onEnd(startX, event.clientX);
      setStartX(0);
    },
  };
};
