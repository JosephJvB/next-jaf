import { Plant } from "../types/plant";
import { Swiper } from "../components/swiper/swiper";
import { GetServerSideProps } from "next";
import * as sheetService from "../services/sheetService";

export interface HomeProps {
  plants: Plant[];
}
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const rows = await sheetService.getRows("A:H");
  const plants = rows.slice(1).map((r) => sheetService.rowToPlant(r));
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
