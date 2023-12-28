import { FC } from "react";
import { } from "react-hook-form";
import { PiPlusThin } from "react-icons/pi";

interface IInputProps {
    type: string;
    id: string;
  }

export const InputImg: FC<IInputProps> = ({ type, id }) => {

   return (
      <div>
        <input
            id={id}
            className="hidden"
            type={ type }
        />
        <label
            className="text-gray-300 text-4xl p-6 inline-block bg-gray-100 select-none cursor-pointer"
            htmlFor={id}
        >
        <PiPlusThin />
        </label>
      </div>
    )
  }