import { Plant } from "../types/plant";
import { Swiper } from "../components/swiper/swiper";
import { GetServerSideProps } from "next";
import { LocalStorage } from "../constants";
import { getAllPlants } from "../services/server/sheetService";
import { getAccessTokenFromCode } from "../services/server/auth/oAuth2";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
    getAllPlants(),
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

export default function Plants(props: PlantsProps) {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const existToken = localStorage.getItem(LocalStorage.AuthKey);
    if (props.googleAuthToken && !existToken) {
      localStorage.setItem(LocalStorage.AuthKey, props.googleAuthToken);
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      router.replace(router.pathname);
    }
  }, [router.isReady]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <Swiper plants={props.plants} />
    </main>
  );
}
