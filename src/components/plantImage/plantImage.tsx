import Image from "next/image";
import { FC } from "react";
import { Plant } from "../../types/plant";
import { getMediaItem } from "../../services/browser/photosLibraryService";
import { useQuery, useQueryClient } from "react-query";
import { hour, min } from "../../constants";

export interface PlantImageProps {
  plant: Plant;
}
// TODO set appropriate default size
export const PlantImage: FC<PlantImageProps> = (props) => {
  const queryClient = useQueryClient();

  const getPlantImage = async () => {
    const item = await getMediaItem(props.plant.mediaItemId);
    return item.baseUrl;
  };

  const q = useQuery(props.plant.slug, getPlantImage, {
    staleTime: hour - min * 5,
    retry: 1,
  });

  // maybe server failed to load image?
  // not sure if this is right pattern
  if (!q.data) {
    queryClient.invalidateQueries(props.plant.slug);
    return null;
  }

  return (
    <Image
      draggable={false}
      width="100"
      height="150"
      className="border-grey-200 h-[150px] w-auto rounded-sm border-2 border-solid"
      src={q.data}
      alt={props.plant.plantName}
    />
  );
};
