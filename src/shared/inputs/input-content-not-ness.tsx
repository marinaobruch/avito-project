import { FC } from "react";
import { Control, Controller } from "react-hook-form";


interface IInputProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    type: string;
    placeholder: string;
    width?: string;
  }

export const InputContentNotNess: FC<IInputProps> = ({
    control, name, type, placeholder, width
}) => (
    <Controller
        control={ control }
        name={ name }
        render={ ({
          field: { onChange, value, onBlur },
          fieldState: { error }
        }) => (
      <div>
        <input
            className="border-2 rounded-lg h-16 placeholder:text-gray-300 placeholder:text-base px-4 focus:outline-none focus:border-sky-500 text-base
            lg:p-6 lg:border-2 lg:w-full lg:rounded-full"
            style={{width:`${width}`}}
            autoComplete="on"
            placeholder={ placeholder }
            type={ type }
            value={ value }
            onBlur={ onBlur }
            onChange={ onChange }
        />
        <span className="text-base z-20 relative" style={{left:"-30px"}}></span>

        { error && (
          <div className="text-xs text-red-600">
            { error.message }
          </div>
        ) }
      </div>
    ) }
  />
)