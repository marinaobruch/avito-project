import { FC, HTMLProps } from 'react';


interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string;

}

export const ButtonLogIn: FC<IButtonProps> = ({text}) => (
  <button className='border-2 rounded-lg text-white text-s h-14 w-72 p-2 bg-blue-600'>{text}</button>
);