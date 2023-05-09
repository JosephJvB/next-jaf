import { PlantCardProps } from "@/components/plantCard/plantCard";

async function getPlants(): Promise<PlantCardProps[]> {
  const response = await fetch(`/api/v1/plants`);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

async function uploadImage(s3Url: string, file: File) {
  const headers = new Headers();
  headers.append("Content-Type", file.type);
  headers.append("Content-Length", file.size.toString());
  const response = await fetch(s3Url, {
    method: "PUT",
    body: file,
    headers,
  });
  if (!response.ok) {
    throw response;
  }
}

export default {
  getPlants,
  uploadImage,
};
