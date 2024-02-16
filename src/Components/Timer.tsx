import React, { useEffect, useState } from 'react'

interface Props {
  startCounter: boolean
  countCorrectWords: number
  countIncorrectWords: number
}

function Timer({ startCounter, countCorrectWords, countIncorrectWords }: Props) {
  const [timer, setTimer] = useState(0);
  let intervalId:NodeJS.Timer;

  useEffect(() => {
    if (startCounter) {
      intervalId = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startCounter])

  const minutes = timer / 60

  return (
    <div className='text-orange-300'>
      <p>Tiempo: {timer} segundos</p>
      <p>Palabras por minuto: {(countCorrectWords / minutes || 0).toFixed(0)} PPM</p>
      <p className='mt-3'>Palabras correctas: {countCorrectWords} palabras. </p>
      <p>Palabras incorrectas: {countIncorrectWords} palabras. </p>
    </div>
  )
}

export default Timer