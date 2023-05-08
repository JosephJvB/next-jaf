import { PlantCardProps } from "@/components/plantCard/plantCard";

async function getPlants(): Promise<PlantCardProps[]> {
  const response = await fetch(`/api/v1/plants`);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

// https://www.reddit.com/r/aws/comments/v4i2q6/using_fetch_to_upload_an_image_to_s3_presigned/
// https://medium.com/@blackwright/browser-file-uploads-to-s3-using-fetch-46a53d106e11
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
  return response.json();
}

export default {
  getPlants,
  uploadImage,
};
