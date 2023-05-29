import { FC, PropsWithChildren, useRef, useState } from "react";

type SwipeEvent =
  | MouseEvent
  | TouchEvent
  | React.TouchEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>;

export interface SwiperProps {}

// https://www.youtube.com/watch?v=V0dfhBc2lj8
// https://github.com/dominicarrojado/react-typescript-swiper/blob/main/src/components/Swiper.tsx
// Using refs because it's more performant (i think). state is re-created on render, ref persists
export const Swiper: FC<PropsWithChildren<SwiperProps>> = (props) => {
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
        {props.children}
      </ul>
    </div>
  );
};
