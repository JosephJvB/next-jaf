import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CameraSVG } from "../svgs/cameraSVG";
import { toDateStr } from "../../util";
import { useRouter } from "next/router";
import { Plant } from "../../types/plant";
import { ArrowLeftSVG } from "../svgs/arrowLeftSVG";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  getMediaItem,
  uploadFile,
} from "../../services/browser/photosLibraryService";
import { updatePlant } from "../../services/browser/sheetsService";
import { clearToken } from "../../services/browser/auth";
import { useMutation } from "react-query";

interface FormValues {
  water: boolean;
  food: boolean;
  photo: File | null;
}
interface ImageProps {
  src: string;
  height: number;
  width: number;
  ts: number;
}
export interface UploadCardProps {
  plant: Plant;
}
export const UploadCard: FC<UploadCardProps> = (props) => {
  const [image, setImage] = useState<ImageProps | null>();
  const router = useRouter();
  const form = useForm<FormValues>();

  const photo = form.watch("photo");

  useEffect(() => {
    if (photo) {
      loadImage(photo);
    }
  }, [photo]);

  const submitMutation = useMutation({
    mutationFn: async (plant: Plant) => {
      if (!photo) {
        return;
      }
      const uploadResult = await uploadFile(plant, photo);
      const mediaItem = await getMediaItem(uploadResult.id);
      plant.imageSrc = mediaItem.baseUrl;
      await updatePlant(plant);
    },
    onError: (error) => {
      console.error(error);
      console.error("submitMutation failed");
      clearToken();
    },
    onSettled: () => {
      router.push("/");
    },
  });

  const handleFileChange = async (fileList: FileList | null) => {
    if (!fileList) {
      return;
    }
    const lastFile = fileList[fileList.length - 1];
    form.setValue("photo", lastFile);
  };

  const loadImage = (f: File) => {
    const url = URL.createObjectURL(f);
    const image = new window.Image();
    image.onload = () => {
      setImage({
        src: url,
        height: image.height,
        width: image.width,
        ts: Date.now(),
      });
    };
    image.src = url;
  };

  const handleSubmit = async (values: FormValues) => {
    const nextPlant = { ...props.plant };
    nextPlant.imageTS = image?.ts ?? Date.now();
    if (values.food) {
      nextPlant.lastFed = nextPlant.imageTS;
    }
    if (values.water) {
      nextPlant.lastHydrated = nextPlant.imageTS;
    }
    await submitMutation.mutate(nextPlant);
  };

  const dateStr = image && toDateStr(new Date(image.ts));
  return (
    <div className="border-grey-200 relative flex h-[80vh] max-h-[600px] w-[100%] flex-col items-center justify-center space-y-6 rounded-lg border-2 border-solid bg-white px-5 py-8">
      <Link href="/" className="absolute left-2 top-3">
        <ArrowLeftSVG />
      </Link>
      <form
        className="relative flex flex-col items-center justify-center space-y-3"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <label
          className="flex flex-col items-center justify-center text-center"
          htmlFor="photo"
        >
          <input
            className="absolute hidden h-[100%] w-[100%]"
            type="file"
            name="photo"
            id="photo"
            onChange={(e) => handleFileChange(e.currentTarget.files)}
            accept="image/heic, image/heif, image/jpeg, image/jpg, image/png, image/webp"
          />
          {!image && (
            <div className="rounded-md bg-gray-200 p-5">
              <CameraSVG />
            </div>
          )}
          {image && (
            <>
              <Image
                className="m-auto"
                height={image.height}
                width={image.width}
                src={image.src}
                alt={"plant photo upload preview"}
              />
              <p className="text-xs text-gray-500">{dateStr}</p>
            </>
          )}
        </label>
        <p>Take/select photo of {props.plant.plantName}</p>
        <fieldset className="flex flex-col">
          <label htmlFor="water">Water</label>
          <input
            type="checkbox"
            name="water"
            id="water"
            onChange={(e) => form.setValue("water", e.target.checked)}
          />
          <label htmlFor="food">Food</label>
          <input
            type="checkbox"
            name="food"
            id="food"
            onChange={(e) => form.setValue("food", e.target.checked)}
          />
        </fieldset>
        <button disabled={!photo} type="submit">
          {submitMutation.isLoading ? "Saving" : "Save"}
        </button>
      </form>
    </div>
  );
};
