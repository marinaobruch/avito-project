import { FC, ReactNode } from 'react'

interface IContainerProps {
  children: ReactNode
}

export const ContainerContent: FC<IContainerProps> = ({ children }) => (
  <div className='w-full mt-12 flex justify-center'>{children}</div>
)
