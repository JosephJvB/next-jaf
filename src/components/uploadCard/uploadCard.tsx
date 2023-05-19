import { FC, useContext, useState } from "react";
import Image from "next/image";
import { CameraSVG } from "../svgs/cameraSVG";
import { toDateStr } from "../../util";
import { useRouter } from "next/router";
import { Plant } from "../../types/plant";
import http from "../../services/httpService";
import { ArrowLeftSVG } from "../svgs/arrowLeftSVG";
import Link from "next/link";

interface ImageProps {
  src: string;
  height: number;
  width: number;
  ts: Date;
}
export interface UploadCardProps {
  plant: Plant;
  uploadUrl: string;
  s3Key: string;
}
export const UploadCard: FC<UploadCardProps> = (props) => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<ImageProps | null>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = async (files: FileList | null) => {
    if (typeof window === "undefined") {
      return;
    }
    if (!files) {
      return;
    }
    const lastFile = files[files?.length - 1];
    const url = URL.createObjectURL(lastFile);
    const image = new window.Image();
    image.onload = () => {
      setImage({
        src: url,
        height: image.height,
        width: image.width,
        ts: new Date(),
      });
      setFile(lastFile);
    };
    image.src = url;
  };
  const handleSubmit = async () => {
    if (!file) {
      return;
    }
    setLoading(true);
    try {
      // todo upload progress
      // await http.uploadImage_S3(props.uploadUrl, file);
      // then update dynamodb
      router.push("/");
    } catch (e) {
      console.error("http.uploadImage failed");
      console.error(e);
    }
    setLoading(false);
  };

  const dateStr = image && toDateStr(image.ts);
  return (
    <div className="border-grey-200 relative flex h-[80vh] max-h-[600px] w-[300px] flex-col items-center justify-center space-y-6 rounded-lg border-2 border-solid bg-white px-5 py-8">
      <Link href="/" className="absolute left-2 top-3">
        <ArrowLeftSVG />
      </Link>
      <form
        className="relative flex flex-col items-center justify-center space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label
          className="flex flex-col items-center justify-center text-center"
          htmlFor="plant-image"
        >
          <input
            className="absolute hidden h-[100%] w-[100%]"
            type="file"
            name="plant-image"
            id="plant-image"
            onChange={(e) => handleChange(e.currentTarget.files)}
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
          <input type="checkbox" name="water" id="water" />
          <label htmlFor="food">Food</label>
          <input type="checkbox" name="food" id="food" />
        </fieldset>
        <button disabled={!file} type="submit">
          {loading ? "Saving" : "Save"}
        </button>
      </form>
    </div>
  );
};
