import Image from "next/image";
import { FC } from "react";

const DEFAULT_SIZE = 80;

export interface ProfilePictureProps {
  width?: number;
  spinning?: boolean;
  imageSrc?: string;
  initials?: string;
}
export const ProfilePicture: FC<ProfilePictureProps> = (props) => {
  if (props.imageSrc) {
    return (
      <Image
        width={props.width ?? DEFAULT_SIZE}
        height={props.width ?? DEFAULT_SIZE}
        className={`rounded-full text-white ${
          props.spinning ? "animate-spin-slow" : ""
        } border-2 border-white`}
        alt="spotify profile picture"
        src={props.imageSrc}
      />
    );
  }
  if (props.initials) {
    return (
      <div
        style={{
          width: `${props.width ?? DEFAULT_SIZE}px`,
          height: `${props.width ?? DEFAULT_SIZE}px`,
        }}
        className={`rounded-full ${
          props.spinning ? "animate-spin-slow" : ""
        } flex bg-yellow-500`}
      >
        <span className="m-auto text-2xl font-medium text-purple-600">
          {props.initials}
        </span>
      </div>
    );
  }
  return null;
};
