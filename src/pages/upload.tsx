import { PlantCardProps } from "@/components/plantCard/plantCard";
import { UploadModal } from "@/components/uploadModal/uploadModal";
import { plants } from "@/data/plants";
import s3 from "@/services/s3Service";
import { Plant } from "@/types/plant";
import { GetServerSideProps } from "next";

export interface UploadProps {
  plant?: Plant;
  uploadUrl: string;
  s3Key: string;
}
export const getServerSideProps: GetServerSideProps<UploadProps> = async (
  context
) => {
  // actually load from DB
  const plant = plants.find((p) => p.slug === context.query.slug);
  // redirect
  if (!plant) {
    return {
      props: {
        uploadUrl: "",
        s3Key: "",
      },
    };
  }
  const s3Key = `original/${plant.slug}.${Date.now()}`;
  const uploadUrl = await s3.getUploadUrl(s3Key);
  return {
    props: {
      plant,
      uploadUrl,
      s3Key,
    },
  };
};

export default function Home(props: UploadProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {props.plant && (
        <UploadModal
          plant={props.plant}
          uploadUrl={props.uploadUrl}
          s3Key={props.s3Key}
        />
      )}
    </main>
  );
}
