import React, { useEffect, useRef, useState } from 'react'
import Word from './Word'
import Timer from './Timer'
import { generate, count } from "random-words";

const getWords = () => 'hola uno dos tres'.split(' ')
const fetchData = async () => {
  /*try {
    const response = await fetch('https://random-word-api.herokuapp.com/word?lang=es&number=20');
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }*/
  return generate({maxLength: 9, exactly: 25}) as string[];
};

function Test() {
  const inputRef = useRef(null);
  const [input, setInput] = useState('')
  //const words = useRef<string[]>([])
  const [words, setWords] = useState<string[]>([]);
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  const [correctWords, setCorrectWords] = useState<boolean[]>([])
  const [startCounter, setStartCounter] = useState(false)

  useEffect(() => {
    (inputRef.current! as HTMLInputElement).focus();

    fetchData().then((data: string[]) => {
      var words = data.join(' ');

      words = words.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[♪)?¿.]/g, "");

      data = words.split(' ')
      setWords(data); // Actualizamos el valor de la referencia con los datos obtenidos
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (activeWordIndex === words.length) {
      return
    }
    setStartCounter(true)
    if (e.target.value.endsWith(' ')) {
      if (activeWordIndex === words.length - 1) {

        setStartCounter(false)
        setInput('')
      }

      setActiveWordIndex(index => index + 1)
      setInput('')

      setCorrectWords(data => {
        const word = e.target.value.trim()
        const newResult = [...data]
        newResult[activeWordIndex] = (word === words[activeWordIndex])
        return newResult
      })
    } else {
      setInput(e.target.value)
    }
  }

  return (
    <div className='flex flex-col'>
      <h1 className='text-4xl font-extrabold text-orange-600 mb-12'>Typing Test</h1>
      <Timer startCounter={startCounter} countCorrectWords={correctWords.filter((word) => (word)).length} countIncorrectWords={correctWords.filter((word) => (!word)).length} />
      <div className='flex gap-x-3 flex-wrap text-2xl mt-10 justce text-center'>{
        words.map((word, index) => {
          return <Word key={index} text={word} active={index === activeWordIndex} correct={correctWords[index]} />
        })
      }</div>
      <input ref={inputRef} className='mt-16 w-fit block mx-auto focus:outline-none caret-transparent bg-orange-100 text-orange-400 placeholder:text-orange-300' type="text" placeholder='Comienza a escribir...' value={input} onChange={handleInputChange} />
      <button type='button' className='mx-auto text-orange-300 mt-10 font-semibold border-orange-300 border-2 px-3 py-1 rounded-full'
        onClick={() => window.location.reload()}>Reiniciar</button>
    </div>
  )
}


export default Test