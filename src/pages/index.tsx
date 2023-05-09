import { AppContext } from "next/app";
import dynamic from "next/dynamic";
import { Plant } from "../types/plant";
import { plants } from "../data/plants";
import { useSwipe } from "../hooks/useSwipe";

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
  const swipe = useSwipe((startX, endX) => {
    console.log("swipe", startX, endX);
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <div
        onMouseDown={swipe.start}
        onTouchStart={swipe.start}
        onMouseUp={swipe.end}
        onTouchCancel={swipe.end}
        className="w-[100%] max-w-[100%] touch-pan-y overflow-hidden px-4"
      >
        <ul className="w-max-[100%] relative flex w-[100%] list-none flex-row">
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
