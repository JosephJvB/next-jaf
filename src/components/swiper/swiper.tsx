import { FC, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Plant } from "../../types/plant";

// TODO: new file path src/containers/swiper

// TODO: remove - only needed it for countdown display
// https://stackoverflow.com/questions/66374123/warning-text-content-did-not-match-server-im-out-client-im-in-div
const PlantCardComponent = dynamic(
  () => import("../plantCard/plantCard").then((f) => f.PlantCard),
  { ssr: false }
);

type SwipeEvent =
  | MouseEvent
  | TouchEvent
  | React.TouchEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>;

export interface SwiperProps {
  plants: Plant[];
}

// https://github.com/dominicarrojado/react-typescript-swiper/blob/main/src/components/Swiper.tsx
export const Swiper: FC<SwiperProps> = (props) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const minXRef = useRef(0);
  const startXRef = useRef(0);
  // can I use containerRef.current element properties instead?
  const containerWidthRef = useRef(0);
  const containerOffsetXRef = useRef(0);

  // useStateRef
  const offsetXRef = useRef(0);
  const [offsetX, setOffsetX] = useState(0);
  const updateOffsetX = (n: number) => {
    offsetXRef.current = n;
    setOffsetX(n);
  };

  const swipeStart = (e: SwipeEvent) => {
    const event = "changedTouches" in e ? e.changedTouches[0] : e;

    containerOffsetXRef.current = offsetXRef.current;
    startXRef.current = event.clientX;
    const containerOffsetWidth = containerRef.current?.offsetWidth ?? 0;
    const containerScrollWidth = containerRef.current?.scrollWidth ?? 0;
    minXRef.current = containerOffsetWidth - containerScrollWidth;
    containerWidthRef.current = containerOffsetWidth;
    // add the listener to the window, not the swipable div
    // mousemove should listen even if mouse leaves the swipable div while mouse is down
    window.addEventListener("mousemove", swipeMove);
    window.addEventListener("touchmove", swipeMove);
    window.addEventListener("mouseup", swipeEnd);
    window.addEventListener("touchend", swipeEnd);
  };
  const swipeMove = (e: SwipeEvent) => {
    const event = "changedTouches" in e ? e.changedTouches[0] : e;
    const swipeDiff = startXRef.current - event.clientX;
    let nextOffsetX = containerOffsetXRef.current - swipeDiff;
    if (nextOffsetX > 0) {
      nextOffsetX = 0;
    }
    if (nextOffsetX < minXRef.current) {
      nextOffsetX = minXRef.current;
    }
    updateOffsetX(nextOffsetX);
  };
  const swipeEnd = (e: SwipeEvent) => {
    const event = "changedTouches" in e ? e.changedTouches[0] : e;

    let nextOffsetX = offsetXRef.current;
    const w = containerWidthRef.current;
    const swipeDiff = startXRef.current - event.clientX;
    if (Math.abs(swipeDiff) > 50) {
      if (swipeDiff > 0) {
        // swipe to the right if diff is positive
        nextOffsetX = Math.floor(nextOffsetX / w) * w;
      } else {
        // swipe to the left if diff is negative
        nextOffsetX = Math.ceil(nextOffsetX / w) * w;
      }
    } else {
      // remain in the current image
      nextOffsetX = Math.round(nextOffsetX / w) * w;
    }

    updateOffsetX(nextOffsetX);

    window.removeEventListener("mousemove", swipeMove);
    window.removeEventListener("mouseup", swipeEnd);
    window.removeEventListener("touchmove", swipeMove);
    window.removeEventListener("touchend", swipeEnd);
  };

  return (
    <div
      onMouseDown={swipeStart}
      onTouchStart={swipeStart}
      onMouseUp={swipeEnd}
      onTouchEnd={swipeEnd}
      className="w-[100%] max-w-[100%] touch-pan-y overflow-hidden px-4"
    >
      <ul
        ref={containerRef}
        className="w-max-[100%] duration-0.3 relative flex w-[100%] list-none flex-row transition ease-out"
        style={{
          transform: `translate3d(${offsetX}px, 0, 0)`,
        }}
      >
        {/* TODO: render these as props.children? */}
        {props.plants.map((plant) => (
          <li key={plant.slug} className="w-[100%] flex-shrink-0 px-1">
            <PlantCardComponent plant={plant} />
          </li>
        ))}
      </ul>
    </div>
  );
};
