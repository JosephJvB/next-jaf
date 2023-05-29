import { Plant, getHydrationPercent } from "../types/plant";
import { Swiper } from "../containers/swiper/swiper";
import { GetServerSideProps } from "next";
import { getAllPlants } from "../services/server/sheetService";
import { getAccessTokenFromCode } from "../services/server/auth/oAuth2";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getAuthCookie, setAuthCookie } from "../services/browser/auth";
import { DehydratedState, QueryClient, dehydrate } from "react-query";
import { batchGetMediaItems } from "../services/server/photosLibraryService";
import { PlantCard } from "../components/plantCard/plantCard";
import { Cookie } from "../constants";

export interface PlantsProps {
  newAuthToken?: string;
  dehydratedState: DehydratedState;
  plants: Plant[];
}

const getNewToken = async (code: string) => {
  if (!code) {
    return;
  }
  return getAccessTokenFromCode(code);
};

export const getServerSideProps: GetServerSideProps<PlantsProps> = async (
  context
) => {
  const queryClient = new QueryClient();
  const [plants, newAuthToken] = await Promise.all([
    getAllPlants(),
    getNewToken(context.query.code as string),
  ]);

  const auth = newAuthToken ?? context.req.cookies[Cookie.Auth];

  if (!auth) {
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
    const mediaItems = await batchGetMediaItems(mediaIds, auth);
    plants.forEach((plant) => {
      const mediaItem = mediaItems.find((i) => i.id === plant.mediaItemId);
      if (mediaItem) {
        queryClient.setQueryData(plant.slug, mediaItem);
      }
    });
  } catch (e) {
    console.error(e);
    console.error("Failed to load mediaItems @ server");
  }

  const props: PlantsProps = {
    plants,
    dehydratedState: dehydrate(queryClient),
  };
  if (newAuthToken) {
    props.newAuthToken = newAuthToken;
  }

  return {
    props,
  };
};

export default function Plants(props: PlantsProps) {
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (props.newAuthToken) {
      setAuthCookie(props.newAuthToken);
    }
    const token = getAuthCookie();
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
  }, [router.isReady]);

  const withHydration = props.plants.map((plant) => ({
    plant,
    hydration: getHydrationPercent(plant),
  }));
  withHydration.sort((a, z) => a.hydration - z.hydration);

  return (
    <main className="flex flex-col items-center justify-between py-24">
      <Swiper>
        {withHydration.map(({ plant }) => (
          <PlantCard key={plant.slug} plant={plant} />
        ))}
      </Swiper>
    </main>
  );
}
