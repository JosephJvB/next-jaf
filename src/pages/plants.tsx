import { Plant } from "../types/plant";
import { Swiper } from "../components/swiper/swiper";
import { GetServerSideProps } from "next";
import { getAllPlants } from "../services/server/sheetService";
import { getAccessTokenFromCode } from "../services/server/auth/oAuth2";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getGoogleToken, setGoogleToken } from "../services/browser/auth";

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

  // get plant urls here?
  // i need a valid authToken here, but it must be OAuth2 token
  // const mediaItemIds = plants.map(p => p.mediaItemId).filter(Boolean)
  // const mediaItems =

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
    if (props.googleAuthToken) {
      setGoogleToken(props.googleAuthToken);
    }
    const token = getGoogleToken();
    if (!token) {
      router.push("/");
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (Object.keys(router.query).length) {
        router.replace(router.pathname);
      }
    }
  }, [router, router.isReady]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <Swiper plants={props.plants} />
    </main>
  );
}
