import { FC, HTMLProps } from 'react';


interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string;

}

export const ButtonLogIn: FC<IButtonProps> = ({text}) => (
  <button className='rounded-lg text-white text-s h-14 w-72 p-2 bg-sky-600 font-robotoLight'>{text}</button>
);