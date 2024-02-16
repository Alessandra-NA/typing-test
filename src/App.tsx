import React from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './Components/Test';

function App() {
  return (
    <div className="App bg-orange-100 text-orange-500 font-semibold text-lg tracking-wide h-lvh">
      <div className='pt-5 md:pt-10 w-11/12 mx-auto sm:w-5/6 md:w-3/4 md:max-w-3xl'>
        <Test />
      </div>
    </div>
  );
}

export default App;
