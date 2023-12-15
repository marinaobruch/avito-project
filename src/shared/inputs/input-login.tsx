import { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface IInputProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    type: string;
    placeholder: string;
  }

export const InputLogin: FC<IInputProps> = ({
    control, name, type, placeholder,
}) => {
  return (
      <Controller
          control={ control }
          name={ name }
          render={ ({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
        <div>
          <input
              className="border-b placeholder:text-gray-300 placeholder:text-base" 
              autoComplete="on"
              placeholder={ placeholder }
              type={ type }
              value={ value }
              onBlur={ onBlur }
              onChange={ onChange }
          />
          { error && (
            <div className="text-xs text-red-600">
              { error.message }
            </div>
          ) }
        </div>
      ) }
    />
  )
}