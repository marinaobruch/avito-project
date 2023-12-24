import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { PiPlusThin } from "react-icons/pi";

interface IInputProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    type: string;
    id: string;
  }

export const InputImg: FC<IInputProps> = ({
    control, name, type, id
}) => {

   return (
    <Controller
        control={ control }
        name={ name }
        render={ ({ field: { value, onBlur, onChange }, fieldState: { error } }) => (
      <div>
        <input
            id={id}
            className="hidden"
            type={ type }
            value={ value }
            onBlur={ onBlur }
            onChange={ onChange }
        />
        <label
            className="text-gray-300 text-4xl p-6 inline-block bg-gray-100 select-none cursor-pointer"
            htmlFor={id}
        >
        <PiPlusThin />
        </label>
        { error && (
          <div className="text-xs text-red-600">
            { error.message }
          </div>
        ) }
      </div>
    ) }
  />
)}