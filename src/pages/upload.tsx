import { GetServerSideProps } from "next";
import { Plant } from "../types/plant";
import { UploadCard } from "../components/uploadCard/uploadCard";
import { useRouter } from "next/router";
import { getAllPlants } from "../services/server/sheetService";
import { DehydratedState, QueryClient, dehydrate } from "react-query";
import { clearAuthCookie, getAuthCookie } from "../services/browser/auth";
export interface UploadProps {
  plant?: Plant;
  dehydratedState: DehydratedState;
}
export const getServerSideProps: GetServerSideProps<UploadProps> = async (
  context
) => {
  const queryClient = new QueryClient();
  const plants = await getAllPlants();
  const plant = plants.find((p) => p.slug === context.query.slug);

  return {
    props: {
      plant,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Upload(props: UploadProps) {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const authToken = getAuthCookie();
    if (!authToken) {
      router.push("/");
    }
    if (!props.plant) {
      router.push("/plants");
    }
  }
  return (
    <main className="flex flex-col items-center justify-between py-24">
      {props.plant && (
        <div className="w-[100%] max-w-[100%] px-4">
          <div className="px-1">
            <UploadCard plant={props.plant} />
          </div>
        </div>
      )}
    </main>
  );
}
