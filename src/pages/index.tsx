import { AppContext } from "next/app";
import dynamic from "next/dynamic";
import { Plant } from "../types/plant";
import { plants } from "../data/plants";
import { useRef, useState } from "react";

type Event =
  | MouseEvent
  | TouchEvent
  | React.TouchEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>;

// https://stackoverflow.com/questions/66374123/warning-text-content-did-not-match-server-im-out-client-im-in-div
const PlantCardComponent = dynamic(
  () => import("../components/plantCard/plantCard").then((f) => f.PlantCard),
  { ssr: false }
);

export async function getServerSideProps(context: AppContext) {
  // actually should load from db
  await new Promise((r) => setTimeout(r, 150));
  return {
    props: {
      plants,
    },
  };
}

export interface HomeProps {
  plants: Plant[];
}
export default function Home(props: HomeProps) {
  const [swiping, setSwiping] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const containerRef = useRef<HTMLUListElement>(null);

  const rightLimit =
    (containerRef.current?.clientWidth ?? 0) -
    (containerRef.current?.scrollWidth ?? 0);

  const swipeStart = (e: Event) => {
    const event = "changedTouches" in e ? e.changedTouches[0] : e;
    setStartX(event.clientX - offsetX);
    setSwiping(true);
  };
  const swipeMove = (e: Event) => {
    if (!swiping) {
      return;
    }
    const event = "changedTouches" in e ? e.changedTouches[0] : e;
    let nextOffset = event.clientX - startX;
    if (nextOffset > 0) {
      nextOffset = 0;
    }
    if (nextOffset < rightLimit) {
      nextOffset = rightLimit;
    }
    setOffsetX(nextOffset);
  };
  const swipeEnd = (e: Event) => {
    const event = "changedTouches" in e ? e.changedTouches[0] : e;
    const diff = Math.abs(event.clientX - startX);
    if (diff < 50) {
      return;
    }
    if (event.clientX > startX) {
    } else {
    }
    setSwiping(false);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <div
        onMouseDown={swipeStart}
        onTouchStart={swipeStart}
        onMouseMove={swipeMove}
        onTouchMove={swipeMove}
        onMouseUp={swipeEnd}
        onTouchEnd={swipeEnd}
        className="w-[100%] max-w-[100%] touch-pan-y overflow-hidden px-4"
      >
        <ul
          ref={containerRef}
          className="w-max-[100%] duration-0.3 relative flex w-[100%] list-none flex-row transition ease-out"
          style={{
            transform: `translateX(${offsetX}px)`,
          }}
        >
          {props.plants.map((plant) => (
            <li key={plant.slug} className="w-[100%] flex-shrink-0 px-1">
              <PlantCardComponent plant={plant} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
