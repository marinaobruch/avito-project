import { FC, ReactNode } from 'react';

interface IContainerProps {
  children: ReactNode;
}

export const Container: FC<IContainerProps> = ({ children }) => (
  <div className='flex-col justify-center items-center w-full h-full'>
    { children }
  </div>
);