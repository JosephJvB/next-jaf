import { ImagePropertiesResponse } from "../../types/google";
import { getAuthCookie } from "./auth";

const toBase64 = (file: File) => {
  const reader = new FileReader();
  return new Promise<string>((resolve) => {
    reader.onload = () => {
      const b64 = reader.result as string;
      resolve(b64.replace("data:image/jpeg;base64,", ""));
    };
    reader.readAsDataURL(file);
  });
};

export const getImageColour = async (image: File) => {
  const base64Image = await toBase64(image);
  const imageProperties = await getImageProperties(base64Image);
  const dominantColors =
    imageProperties.responses[0].imagePropertiesAnnotation.dominantColors;

  // already sorted from highest -> lowest scores
  return dominantColors.colors[0];
};

const getImageProperties = async (
  base64Image: string
): Promise<{
  responses: ImagePropertiesResponse[];
}> => {
  const authToken = getAuthCookie();
  if (!authToken) {
    throw new Error("missing Auth Cookie");
  }

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Content-Type", "application/json");
  const res = await fetch("https://vision.googleapis.com/v1/images:annotate", {
    method: "POST",
    headers,
    body: JSON.stringify({
      requests: [
        {
          image: {
            content: base64Image,
          },
          features: [
            {
              maxResults: 3,
              type: "IMAGE_PROPERTIES",
            },
          ],
        },
      ],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data ?? res;
  }

  return data;
};
