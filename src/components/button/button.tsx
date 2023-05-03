import { FC, PropsWithChildren } from 'react'

export interface ButtonProps {
  onClick?: () => void
}
export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  return (
    <button
      className='text-white bg-gray-700 py-2 px-4 rounded hover:bg-gray-600'
      onClick={() => {
        if (props.onClick) {
          props.onClick()
        }
      }}
    >
      {props.children}
    </button>
  )
}
