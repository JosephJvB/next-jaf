import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CameraSVG } from "../svgs/cameraSVG";
import { toDateStr } from "../../util";
import { useRouter } from "next/router";
import { Plant } from "../../types/plant";
import { ArrowLeftSVG } from "../svgs/arrowLeftSVG";
import Link from "next/link";
import * as photosService from "../../services/photosLibraryService";
import * as httpService from "../../services/httpService";
import { useForm } from "react-hook-form";

interface FormValues {
  water: boolean;
  food: boolean;
  photo: File;
}
interface ImageProps {
  src: string;
  height: number;
  width: number;
  ts: Date;
}
export interface UploadCardProps {
  plant: Plant;
}
export const UploadCard: FC<UploadCardProps> = (props) => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<ImageProps | null>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FormValues>();

  const handleFileChange = async (files: FileList | null) => {
    if (!files) {
      return;
    }
    const lastFile = files[files?.length - 1];
    form.setValue("photo", lastFile);
    loadImage(lastFile);
  };

  const loadImage = (file: File) => {
    if (!file) {
      return;
    }
    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      setImage({
        src: url,
        height: image.height,
        width: image.width,
        ts: new Date(),
      });
      setFile(file);
    };
    image.src = url;
  };

  const handleSubmit = async (values: FormValues) => {
    if (!values.photo) {
      return;
    }
    setLoading(true);
    try {
      const nextPlant = { ...props.plant };
      const n = Date.now();
      if (values.food) {
        nextPlant.lastFed = n;
      }
      if (values.water) {
        nextPlant.lastHydrated = n;
      }
      // todo upload progress
      const uploadResult = await photosService.uploadFile(
        props.plant,
        values.photo
      );
      const mediaItem = await photosService.getMediaItem(uploadResult.id);
      nextPlant.imageSrc = mediaItem.baseUrl;
      await httpService.updatePlant(nextPlant);
    } catch (e) {
      console.error("http.uploadImage failed");
      console.error(e);
    }
    setLoading(false);
  };

  const dateStr = image && toDateStr(image.ts);
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
        <button disabled={!file} type="submit">
          {loading ? "Saving" : "Save"}
        </button>
      </form>
    </div>
  );
};
