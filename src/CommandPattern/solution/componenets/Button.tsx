import React, {MouseEventHandler} from 'react';

type PropsType = {
  onClick: () => void
  color: string
  text: string
}
export const Button: React.FC<PropsType> = ({onClick, color, text}) => {
  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    onClick()
  }

  return <button
    onClick={handleOnClick}
    className={`px-2.5 py-0.5 font-bold block 
    rounded-full
    border border-${color}-400 hover:border-${color}-500 
    bg-${color}-200 hover:bg-${color}-300  
    transition-all ease-in-out`}
  >{text}</button >

}