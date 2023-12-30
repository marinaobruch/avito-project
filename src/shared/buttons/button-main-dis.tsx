import { FC, HTMLProps } from 'react';


interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string | undefined;
  type: "button" | "reset" | "submit";
  width: string;
  onClick?: React.MouseEventHandler;
  disabled?:boolean
}

export const ButtonMainDisabled: FC<IButtonProps> = ({text, width, onClick, type, disabled}) => (
  <button
    onClick={onClick}
    className={`rounded-lg text-base h-12 p-2 text-white bg-sky-500 ${!disabled && 'bg-gray-300'} font-robotoLight hover:bg-sky-700 active:bg-sky-900`}
    style={{width:`${width}`}}
    type={type}
    disabled={!disabled}
  >
    {text}
  </button>
);