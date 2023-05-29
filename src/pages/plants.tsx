import { Plant, getHydrationPercent } from "../types/plant";
import { Swiper } from "../containers/swiper/swiper";
import { GetServerSideProps } from "next";
import { getAllPlants } from "../services/server/sheetService";
import { getAccessTokenFromCode } from "../services/server/auth/oAuth2";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getGoogleToken, setGoogleToken } from "../services/browser/auth";
import { DehydratedState, QueryClient, dehydrate } from "react-query";
import { batchGetMediaItems } from "../services/server/photosLibraryService";
import { PlantCard } from "../components/plantCard/plantCard";

export interface PlantsProps {
  googleAuthToken?: string;
  dehydratedState: DehydratedState;
  plants: Plant[];
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
  const queryClient = new QueryClient();
  const [plants, googleAuthToken] = await Promise.all([
    getAllPlants(),
    loadToken(context.query.code as string),
  ]);

  if (!googleAuthToken) {
    return {
      props: {
        plants,
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  // preload plant images on login - probably overkill tbh? Fine to load clientside on PlantImage component
  try {
    const mediaIds = plants.map((p) => p.mediaItemId);
    const mediaItems = await batchGetMediaItems(mediaIds, googleAuthToken);
    plants.forEach((plant) => {
      const mediaItem = mediaItems.find((i) => i.id === plant.mediaItemId);
      queryClient.setQueryData(plant.slug, mediaItem?.baseUrl);
    });
  } catch (e) {
    console.error(e);
    console.error("Failed to load mediaItems @ server");
  }

  return {
    props: {
      plants,
      dehydratedState: dehydrate(queryClient),
      googleAuthToken,
    },
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
        router.replace(router.pathname, router.pathname, {
          shallow: true,
        });
      }
    }
  }, [router, router.isReady]);

  const withHydration = props.plants.map((plant) => ({
    plant,
    hydration: getHydrationPercent(plant),
  }));
  withHydration.sort((a, z) => a.hydration - z.hydration);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <Swiper>
        {withHydration.map(({ plant }) => (
          <li key={plant.slug} className="w-[100%] flex-shrink-0 px-1">
            <PlantCard plant={plant} />
          </li>
        ))}
      </Swiper>
    </main>
  );
}
