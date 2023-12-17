import { FC, HTMLProps } from 'react';


interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string;
}

export const ButtonReg: FC<IButtonProps> = ({text}) => (
  <button className='border-2 rounded-lg text-black text-s h-14 w-72 p-2 bg-white font-robotoLight hover:bg-gray-100 active:bg-gray-200'>{text}</button>
);