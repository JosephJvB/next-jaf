import { FC, useState } from "react";
import Image from "next/image";
import { CameraSVG } from "../svgs/cameraSVG";
import { toDateStr } from "../../util";
import s3 from "@/services/s3";

interface ImageProps {
  src: string;
  height: number;
  width: number;
  ts: Date;
}
export interface UploadModalProps {
  plantName: string;
  uploadUrl: string;
  s3Key: string;
}
export const UploadModal: FC<UploadModalProps> = (props) => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<ImageProps | null>();

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
    // todo upload progress
    const buffer = await file.arrayBuffer();
    await s3.uploadObject(props.s3Key, Buffer.from(buffer));
  };

  const dateStr = image && toDateStr(image.ts);
  return (
    <form
      className="relative flex flex-col items-center justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label className="h-[350px] w-[200px] text-center" htmlFor="plant-image">
        <p>Take/select photo of</p>
        <p>{props.plantName}</p>
        <input
          className="absolute hidden h-[100%] w-[100%]"
          type="file"
          name="plant-image"
          id="plant-image"
          onChange={(e) => handleChange(e.currentTarget.files)}
        />
        {!image && <CameraSVG />}
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
      <button type="submit">Save</button>
    </form>
  );
};
