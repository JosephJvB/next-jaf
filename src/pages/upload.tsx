import { GetServerSideProps } from "next";
import { Plant } from "../types/plant";
import { UploadCard } from "../components/uploadCard/uploadCard";
import * as sheetService from "../services/sheetService";
import { useRouter } from "next/router";
export interface UploadProps {
  plant?: Plant;
}
export const getServerSideProps: GetServerSideProps<UploadProps> = async (
  context
) => {
  const plants = await sheetService.getAllPlants();
  const plant = plants.find((p) => p.slug === context.query.slug);

  return {
    props: {
      plant,
    },
  };
};

export default function Upload(props: UploadProps) {
  const router = useRouter();
  const slug = router.isReady ? router.query.slug : "";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-24">
      {props.plant && <UploadCard plant={props.plant} />}
      {!props.plant && <p>No plant found with slug "{slug}"</p>}
    </main>
  );
}
