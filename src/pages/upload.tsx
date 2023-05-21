import { GetServerSideProps } from "next";
import { Plant } from "../types/plant";
import { UploadCard } from "../components/uploadCard/uploadCard";
import * as sheetService from "../services/sheetService";
export interface UploadProps {
  plant?: Plant;
}
export const getServerSideProps: GetServerSideProps<UploadProps> = async (
  context
) => {
  const rows = await sheetService.getRows("A:H");
  const plants = rows.slice(1).map((r) => sheetService.rowToPlant(r));
  const plant = plants.find((p) => p.slug === context.query.slug);

  return {
    props: {
      plant,
    },
  };
};

export default function Upload(props: UploadProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      {props.plant && <UploadCard plant={props.plant} />}
    </main>
  );
}
