import { FC } from "react";
import { Control, Controller } from "react-hook-form";


interface ITextAreaProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    placeholder: string;
    width?: string;
    addSymbol?: string
    height?: string
  }

export const TextareaContent: FC<ITextAreaProps> = ({
    control, name, placeholder, width, addSymbol, height
}) => (
    <Controller
        control={ control }
        name={ name }
        rules={{ required: 'Поле обязательно для заполнения' }}
        render={ ({
          field: { onChange, value, onBlur },
          fieldState: { error }
        }) => (
      <div>
        <textarea
            className=" p-4 border-2 rounded-lg h-16 placeholder:text-gray-300 placeholder:text-base px-4 focus:outline-none focus:border-sky-500 text-base placeholder:pt-3"
            style={{width:`${width}`, height:`${height}`}}
            autoComplete="on"
            placeholder={ placeholder }
            value={ value }
            onBlur={ onBlur }
            onChange={ onChange }
        />
        <span className="text-base z-20 relative" style={{left:"-30px"}}>{addSymbol}</span>

        { error && (
          <div className="text-xs text-red-600">
            { error.message }
          </div>
        ) }
      </div>
    ) }
  />
)