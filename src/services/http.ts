import { PlantCardProps } from "@/components/plantCard/plantCard";

async function get(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

async function getPlants(): Promise<PlantCardProps[]> {
  return get(`/api/v1/plants`);
}

export default {
  getPlants,
};
