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
}) => (
    <Controller
        control={ control }
        name={ name }
        rules={{ required: 'Поле обязательно для заполнения' }}
        render={ ({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
      <div className="sm:w-full flex flex-col items-center px-10">
        <input
            className="border-b sm:border-2 sm:w-full sm:rounded-full placeholder:text-gray-300 placeholder:text-base sm:p-4" 
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