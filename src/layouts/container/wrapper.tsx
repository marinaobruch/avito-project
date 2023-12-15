import { FC, ReactNode } from 'react';

interface IContainerProps {
  children: ReactNode;
}

export const Wrapper: FC<IContainerProps> = ({ children }) => (
  <div className='flex flex-col items-center w-full h-full overflow-hidden'>
    { children }
  </div>
);