import { FC, HTMLProps } from 'react'

interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string
  onClick?: React.MouseEventHandler
}

export const ButtonIn: FC<IButtonProps> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className='border-2 bg-sky-500 border-x-white rounded-lg text-white text-xs h-10 w-43 p-2 hover:bg-sky-400 active:bg-sky-300 min-w-152'
  >
    {text}
  </button>
)
