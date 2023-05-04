import Image from "next/image";
import { FC } from "react";

export interface TableRowProps {
  imageSrc: string;
  altText: string;
  title: string;
  subTitle: string;
}
export const TableRow: FC<TableRowProps> = (props) => {
  console.log(props.imageSrc);
  return (
    <tr className="flex flex-row space-x-3 rounded bg-gray-800 p-2 text-white">
      <Image
        width="50"
        height="50"
        className="h-auto"
        src={props.imageSrc}
        alt={props.altText}
      />
      <div className="flex flex-col justify-between">
        <p>{props.title}</p>
        <p className="text-sm">{props.subTitle}</p>
      </div>
    </tr>
  );
};
