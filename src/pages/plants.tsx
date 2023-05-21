import { Plant } from "../types/plant";
import { Swiper } from "../components/swiper/swiper";
import { GetServerSideProps } from "next";
import * as sheetService from "../services/sheetService";
import { getAccessTokenFromCode } from "../services/googleAuth";
import { LocalStorage } from "../constants";

export interface HomeProps {
  plants: Plant[];
  googleAuthToken?: string;
}

const loadToken = async (code: string) => {
  if (!code) {
    return;
  }
  return getAccessTokenFromCode(code);
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const [rows, token] = await Promise.all([
    sheetService.getRows("A:H"),
    loadToken(context.query.code as string),
  ]);
  const plants = rows.slice(1).map((r) => sheetService.rowToPlant(r));

  const props: HomeProps = {
    plants,
  };

  if (token) {
    props.googleAuthToken = token;
  }

  return {
    props,
  };
};

export default function Home(props: HomeProps) {
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
