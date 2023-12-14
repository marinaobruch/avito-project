import { FC, ReactNode } from 'react';

interface IContainerProps {
  children: ReactNode;
}

export const ContainerContent: FC<IContainerProps> = ({ children }) => (
  <div className=' mt-12 w-1440 flex flex-col justify-center'>
    { children }
  </div>
);