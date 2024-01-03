import { FC, HTMLProps } from 'react';


interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string | undefined;
  type: "button" | "reset" | "submit";
  width: string;
  maxWidth?: string;
  onClick?: React.MouseEventHandler;
}

export const ButtonMain: FC<IButtonProps> = ({text, width, onClick, type, maxWidth}) => (
  <button
    onClick={onClick}
    className='rounded-lg text-base h-12 p-2 text-white bg-sky-500 font-robotoLight hover:bg-sky-700 active:bg-sky-900'
    style={{width:`${width}`, maxWidth:`${maxWidth}`}}
    type={type}
  >
    {text}
  </button>
);