import React, {useState, useEffect} from 'react';

// Import Images ////////////////////////////////////////////////////////////////////////////
import mainPosterFilePath from '../../../assets/artwork/Main Poster/mainPoster.jpg';
import borderLeftImage from '../../../assets/artwork/Main Poster/main poster border left.png'
import borderRightImage from '../../../assets/artwork/Main Poster/main poster border right.png'

// Import Components ////////////////////////////////////////////////////////////////////////
import MainPosterBorderLeft from './MainPosterBorder'

export default function MainPoster(props) {

  // POSTER -----------------------------------------------------------------------------
  const [cursorType, setCursorType] = useState("default")

  // ORIGINAL SIZE
  const originalSize = {
    width: 2329,
    height: 3600
  }

  // HEIGHT
  const minimumHeight = 500;

  let height = originalSize.height;

  const bottomOfWindowOffset = 27;

  if (props.windowSize.height - bottomOfWindowOffset <= minimumHeight) {
    height = minimumHeight
  }
  else {
    height = (
      props.windowSize.height - bottomOfWindowOffset
    )
  }

  // WIDTH

  const sizeReductionAmount = (
    originalSize.height / height
  )

  const width = (
    originalSize.width / sizeReductionAmount
  )

  // POSITIONING
  const left = (
    (props.windowSize.width / 2) - (width / 2)
  )

  // Layering
  const posterLayer = -4

  // STYLE 

  const posterStyles = {
    position: "absolute",
    height: `${height}px`,
    left: `${left}px`,
    zIndex: `${posterLayer}`,   
  }

  // OVERLAY --------------------------------------------------------------

  // TRANSPARENCY

  const [overlayTransparency, setOverlayTransparency] = useState(1);
  const [transparencyShift, setTransparencyShift] = useState(props.transparencyShift);

  function fadeIn() {
    setOverlayTransparency(overlayTransparency - 0.01)
  }

  function fadeDown() {
    setOverlayTransparency(overlayTransparency + 0.01)
  }

  // Main page signals a new transparency shift
  useEffect(
    () => {
      setTransparencyShift(props.transparencyShift)
      setOverlayTransparency(overlayTransparency + 0.01)
      if (props.transparencyShift === "fadeDown") {
        setCursorType("default")
      }
    },
    [props.transparencyShift]
  )

  // The shift in transparency is timed using the setTimeout function.
  // It is increased or decreased depending on the value of the state variable transparencyShift.
  useEffect(() => {
    if (transparencyShift === "fadeIn") {
      if (overlayTransparency <= 0) {
        setTransparencyShift("noShift")
        props.switchToPosterSelectMode()
        return
      }
      const overlayTransparencyChangeTimeout = setTimeout(fadeIn, 100)
      return () => clearTimeout(overlayTransparencyChangeTimeout)
    }
    else if (transparencyShift === "fadeDown") {
      if (overlayTransparency >= 0.9) {
        setTransparencyShift("noShift")
        props.switchToActSelectMode()
        return
      }
      const overlayTransparencyChangeTimeout = setTimeout(fadeDown, 100) 
      return () => clearTimeout(overlayTransparencyChangeTimeout)
    }
  }, [overlayTransparency])

  // Layering
  const overlayLayer = posterLayer + 1

  // STYLING
  const overlayStyles = {
    position: "absolute",
    height: `${height}px`,
    width: `${width}px`,
    left: `${left}px`,
    zIndex: `${overlayLayer}`,
    backgroundColor: `rgb(${props.overlayColor}, ${overlayTransparency})`,
    cursor: `${cursorType}`
  }

  // Poster Select Mode /////////////////////////////////////////////////////////////////
  useEffect(
    () => {
      if (props.overlayColor !== "0, 0, 0") {
        setCursorType("pointer")
      }
    },
    [props.overlayColor]
  )

  function handleMouseMove() {
    if (props.overlayColor !== "0, 0, 0") {
      setOverlayTransparency(0.3)
    }   
  }

  function handleMouseOut() {
    if (props.overlayColor !== "0, 0, 0") {
      setOverlayTransparency(0)
    }
  }

  // RENDERING -----------------------------------------------------------
  return (
    <div>
      <MainPosterBorderLeft
        mainPosterHeight={height}
        left={left - (width / 2) - (width / 2) - (width / 4)}
        borderLayer={posterLayer - 6}
        overlayTransparency={overlayTransparency + 0.85}
        image={borderLeftImage}
      />

      <MainPosterBorderLeft
        mainPosterHeight={height}
        left={left - (width / 2) - (width / 2.5)}
        borderLayer={posterLayer - 4}
        overlayTransparency={overlayTransparency + 0.6}
        image={borderLeftImage}
      />

      <MainPosterBorderLeft 
        mainPosterHeight={height}
        left={left - (width / 2)}
        borderLayer={posterLayer - 2}
        overlayTransparency={overlayTransparency + 0.3}
        image={borderLeftImage}
      />

      <img
        src={mainPosterFilePath}
        style={posterStyles}
      />

      <div
        style={overlayStyles}
        onMouseOut={handleMouseOut}
        onMouseMove={handleMouseMove}
        onClick={props.handleClick}
      ></div>

      <MainPosterBorderLeft 
        mainPosterHeight={height}
        left={left + width - (width / 40)}
        borderLayer={posterLayer - 2}
        overlayTransparency={overlayTransparency + 0.3}
        image={borderRightImage}
      />

      <MainPosterBorderLeft
        mainPosterHeight={height}
        left={left + width + (width / 2.5) - (width / 40)}
        borderLayer={posterLayer - 4}
        overlayTransparency={overlayTransparency + 0.6}
        image={borderRightImage}
      />

      <MainPosterBorderLeft
        mainPosterHeight={height}
        left={left + width + (width / 2.5) + (width / 3) - (width / 40)}
        borderLayer={posterLayer - 6}
        overlayTransparency={overlayTransparency + 0.85}
        image={borderRightImage}
      />      
    </div>
  )
}