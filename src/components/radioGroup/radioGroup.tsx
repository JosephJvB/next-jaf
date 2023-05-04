import { StyleHTMLAttributes } from "react";
import { FC } from "react";

export interface RadioGroupProps {
  inputStyles?: StyleHTMLAttributes<HTMLInputElement>;
  labelStyles?: StyleHTMLAttributes<HTMLLabelElement>;
  defaultValue?: string;
  groupName: string;
  options: {
    label: string;
    value: string;
  }[];
}
export const RadioGroup: FC<RadioGroupProps> = (props) => {
  return (
    <fieldset className="row-auto flex space-x-2">
      {props.options.map((o) => (
        <label
          className="relative flex w-[100px] cursor-pointer rounded-xl bg-gray-700 text-sm"
          key={o.value}
          htmlFor={o.value}
          style={{ ...props.labelStyles }}
        >
          <input
            className="absolute z-0 h-full w-full appearance-none rounded-xl border-2 border-transparent checked:border-green-500"
            style={{ ...props.inputStyles }}
            key={o.value}
            defaultChecked={o.value === props.defaultValue}
            type="radio"
            id={o.value}
            name={props.groupName}
            value={o.value}
          />
          <span className="w-full px-2 py-1 text-center text-white">
            {o.label}
          </span>
        </label>
      ))}
    </fieldset>
  );
};
