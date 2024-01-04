import { FC, HTMLProps } from 'react';


interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string | undefined;
  type: "button" | "reset" | "submit";
  width: string;
  onClick?: React.MouseEventHandler;
  disabled?:boolean
}

export const ButtonMainDisabled: FC<IButtonProps> = ({text, width, onClick, type, disabled}) => {

    return (
      <button
          onClick={onClick}
          className={`
            ${!disabled && 'bg-gray-300 hover:bg-gray-300 active:bg-gray-300'}
            ${disabled && 'bg-sky-500 hover:bg-sky-700 active:bg-sky-900'}
            rounded-lg text-base h-12 p-2 text-white font-robotoLight`
          }
          style={{width:`${width}`}}
          type={type}
          disabled={!disabled}
      >
        {text}
      </button>
  )
}

// ${!disabled && 'bg-gray-300 hover:bg-gray-300 active:bg-sky-900'}