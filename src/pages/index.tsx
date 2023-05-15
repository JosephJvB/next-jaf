import { AppContext } from "next/app";
import { Plant } from "../types/plant";
import { plants } from "../data/plants";
import { Swiper } from "../components/swiper/swiper";
import { GetServerSideProps } from "next";

export interface HomeProps {
  plants: Plant[];
}
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // actually should load from db
  await new Promise((r) => setTimeout(r, 150));
  return {
    props: {
      plants,
    },
  };
};

export default function Home(props: HomeProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <Swiper plants={props.plants} />
    </main>
  );
}
