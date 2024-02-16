import React from 'react'

interface Props {
  text: string, 
  active: boolean,
  correct: boolean | null
}

const Word = React.memo(({ text, active, correct }: Props) => {
  if (correct === true) {
    return <div className='text-green-500'>{text}</div>
  } 
  else if (correct === false) {
    return <div className='text-red-600  underline'>{text}</div>
  }
  if (active) {
    return <div className='font-bold'>{text}</div>
  }
  return <div>{text}</div>
  
})

export default Word