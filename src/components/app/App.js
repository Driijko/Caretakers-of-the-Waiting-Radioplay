// cd Desktop/Code/'00 Caretakers of the Waiting Radioplay'/caretakers-of-the-waiting

import React, {useState, useEffect} from 'react';

import './App.css';

// IMPORT COMPONENTS ---------------------------------------------------------------------------------
import AudioPlayer from '../Audio Player/AudioPlayer';
import MainPage from '../MainPage/MainPage';



export default function App() {
  // TESTING ------------------------------------------------------------------------------------------
  const [test, setTest] = useState("");


  // STATE ---------------------------------------------------------------------------------------------

  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  // EFFECTS -------------------------------------------------------------------------------------------
  

  // EVENT HANDLERS -------------------------------------------------------------------------------------

  // WINDOW RESIZE EVENT 
  window.onresize = handleWindowResize;

  function handleWindowResize() {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }

  // MOUSE TRACKING
  document.addEventListener("mousemove", handleMouseMove);

  function handleMouseMove(event) {
    setTest(`${event.clientX}, ${event.clientY}`);
  }


  // RENDERING ----------------------------------------------------------------------------------------
  return (
    <div>
      <MainPage
        windowSize={windowSize}
      />
    </div>
  );
}

