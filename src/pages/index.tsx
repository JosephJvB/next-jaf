import { PlantCardProps } from "@/components/plantCard/plantCard";
import { plants } from "@/data/plants";
import { Plant } from "@/types/plant";
import { AppContext } from "next/app";
import dynamic from "next/dynamic";

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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {props.plants.map((plant) => (
        <PlantCardComponent key={plant.slug} plant={plant} />
      ))}
    </main>
  );
}
