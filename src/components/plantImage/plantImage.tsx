import Image from "next/image";
import { FC } from "react";
import { Plant } from "../../types/plant";
import { getMediaItem } from "../../services/browser/photosLibraryService";
import { useQuery, useQueryClient } from "react-query";
import { hour, min } from "../../constants";

export interface PlantImageProps {
  plant: Plant;
}
export const PlantImage: FC<PlantImageProps> = (props) => {
  const queryClient = useQueryClient();

  const getPlantImage = async () => {
    const item = await getMediaItem(props.plant.mediaItemId);
    return item.baseUrl;
  };

  const imageSrc = queryClient.getQueryData<string>(props.plant.slug);
  useQuery(props.plant.slug, getPlantImage, {
    cacheTime: hour - min * 5,
    enabled: !imageSrc,
  });

  if (!imageSrc) {
    return null;
  }

  return (
    <Image
      draggable={false}
      width="100"
      height="150"
      className="border-grey-200 h-[150px] w-auto rounded-sm border-2 border-solid"
      src={imageSrc}
      alt={props.plant.plantName}
    />
  );
};
