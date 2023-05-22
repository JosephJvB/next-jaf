import { Plant } from "../types/plant";
import { Swiper } from "../components/swiper/swiper";
import { GetServerSideProps } from "next";
import * as sheetService from "../services/sheetService";
import { getAccessTokenFromCode } from "../services/clients/googleOAuth2";
import { LocalStorage } from "../constants";

export interface PlantsProps {
  plants: Plant[];
  googleAuthToken?: string;
}

const loadToken = async (code: string) => {
  if (!code) {
    return;
  }
  return getAccessTokenFromCode(code);
};

export const getServerSideProps: GetServerSideProps<PlantsProps> = async (
  context
) => {
  const [plants, token] = await Promise.all([
    sheetService.getAllPlants(),
    loadToken(context.query.code as string),
  ]);

  const props: PlantsProps = {
    plants,
  };

  if (token) {
    props.googleAuthToken = token;
  }

  return {
    props,
  };
};

export default function Home(props: PlantsProps) {
  if (typeof window !== "undefined") {
    if (props.googleAuthToken) {
      localStorage.setItem(LocalStorage.AuthKey, props.googleAuthToken);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <Swiper plants={props.plants} />
    </main>
  );
}
