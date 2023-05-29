import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { CameraSVG } from "../../svgs/cameraSVG";
import { toDateStr } from "../../util";
import { useRouter } from "next/router";
import { Plant } from "../../types/plant";
import { ArrowLeftSVG } from "../../svgs/arrowLeftSVG";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { uploadFile } from "../../services/browser/photosLibraryService";
import { updatePlant } from "../../services/browser/sheetsService";
import { useMutation, useQueryClient } from "react-query";
import { SaplingSVG } from "../../svgs/saplingSVG";
import { RGB } from "../../constants";
import { WaterDropSVG } from "../../svgs/waterDropSVG";

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

// TODO appropriate image size - scale by max width/height
// TODO styling for radio buttons
// TODO submit could be passed as a prop to form child
export const UploadCard: FC<UploadCardProps> = (props) => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<ImageProps | null>();
  const router = useRouter();
  const form = useForm<FormValues>();

  const formValues = form.watch();

  useEffect(() => {
    if (formValues.photo) {
      loadImage(formValues.photo);
    }
  }, [formValues.photo]);

  const submitMutation = useMutation({
    retry: 0,
    mutationFn: async (v: { plant: Plant; photo: File }) => {
      const uploadResult = await uploadFile(v.plant, v.photo);
      v.plant.mediaItemId = uploadResult.id;
      await updatePlant(v.plant);
    },
    onError: (error) => {
      console.error(error);
      console.error("submitMutation failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(props.plant.slug);
      router.push("/plants");
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
    if (!values.photo) {
      return;
    }
    const nextPlant = { ...props.plant };
    nextPlant.imageTS = image?.ts ?? Date.now();
    if (values.food) {
      nextPlant.lastFed = nextPlant.imageTS;
    }
    if (values.water) {
      nextPlant.lastHydrated = nextPlant.imageTS;
    }
    await submitMutation.mutate({
      plant: nextPlant,
      photo: values.photo,
    });
  };

  const dateStr = image && toDateStr(new Date(image.ts));

  return (
    <div className="border-grey-200 relative flex flex-col items-center justify-center space-y-6 rounded-lg border-2 border-solid bg-white px-5 py-8">
      <Link href="/plants" className="absolute left-2 top-3">
        <ArrowLeftSVG />
      </Link>
      <form
        className="relative flex flex-col items-center space-y-3"
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
            <div className="h-[256px] w-[256px] rounded-md bg-gray-200 p-5">
              <CameraSVG />
            </div>
          )}
          {image && (
            <>
              <Image
                className="h-[256px] w-[256px] object-contain"
                height={image.height}
                width={image.width}
                src={image.src}
                alt={"plant photo upload preview"}
              />
              <p className="text-xs text-gray-500">{dateStr}</p>
            </>
          )}
        </label>
        <h3 className="text-xl text-blue-400">{props.plant.plantName}</h3>
        <fieldset className="flex flex-row space-x-1">
          <label
            htmlFor="water"
            className="h-[60px] w-[60px] rounded-full border-2 border-solid border-gray-200 p-3"
            style={{
              background: `rgba(${RGB.Blue}, ${
                formValues.water ? "1" : "0.2"
              })`,
            }}
          >
            <WaterDropSVG />
          </label>
          <input
            className="appearance-none"
            type="checkbox"
            name="water"
            id="water"
            onChange={(e) => form.setValue("water", e.target.checked)}
          />
          <label
            htmlFor="food"
            className="h-[60px] w-[60px] rounded-full border-2 border-solid border-gray-200 p-3"
            style={{
              background: `rgba(${RGB.Green}, ${
                formValues.food ? "1" : "0.2"
              })`,
            }}
          >
            <SaplingSVG />
            <input
              className="appearance-none"
              type="checkbox"
              name="food"
              id="food"
              onChange={(e) => form.setValue("food", e.target.checked)}
            />
          </label>
        </fieldset>
        <button disabled={!formValues.photo} type="submit">
          {submitMutation.isLoading ? "Saving" : "Save"}
        </button>
      </form>
    </div>
  );
};
