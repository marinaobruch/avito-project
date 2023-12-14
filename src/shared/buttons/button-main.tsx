import { FC, HTMLProps } from 'react';


interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string;
}

export const ButtonMain: FC<IButtonProps> = ({text}) => (
  <button className='rounded-lg text-white text-base h-12 w-36 p-2 bg-sky-500 font-robotoLight hover:bg-sky-700 active:bg-sky-900'>{text}</button>
);