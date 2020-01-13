import React, {useState, useEffect} from 'react';

// IMPORTS -----------------------------------------------------------------------------------------
// IMPORT HELPER FUNCTIONS
import combineObjects from '../../globalHelperFunctions/combineObjectsFunction';
import alignSliderToMouse from './Audio Player Helper Functions/alignSliderToMouse';

// Import filler image
import fillerImage from '../../assets/audioPlayer/icons/lineFill.png'


// The SeekBar component takes the following props:
// 1.) spatialStyles, which is used to style each element in terms of position, width, height, left, top.
// 2.) sliderPositions, which contain info on the minimum and maximum left positions of the seek bar slider,
//     and the overall range it can move within

export default function SeekBar(props) {

  // TESTING
  const [test, setTest] = useState('hey');

  // SLIDER POSITION STATE --------------------------------------------------------------------------
  const [sliderHpos, setSliderHpos] = useState(0);

  // FILLER WIDTH STATE -----------------------------------------------------------------------------
  const [fillerWidth, setFillerWidth] = useState(0);

  // ELEMENTS -------------------------------------------------------------------------------------

  // SEEK BAR
  const seekBarStyles = (
    combineObjects([
      props.spatialStyles.bar,
      {border: "2px solid lightseagreen"}
    ])
  )

  const seekBar = (
    <div
      id="seekBar"
      style={seekBarStyles}
      onMouseDown={
        (event) => {
          props.handleMouseDown(event);
          handleMouseDown(event);
        }
      }
    ></div>
  )

  // SEEK BAR SLIDER
  const sliderStyles = (
    combineObjects([
      {
        backgroundColor: "blue",
        left: `${props.sliderPositions.initialLeft + sliderHpos}px`
      },
      props.spatialStyles.slider
    ])
  )

  const slider = (
    <div
      style={sliderStyles}
    ></div>
  )

  // FILLER

  const fillerStyles = (
    combineObjects([
      props.spatialStyles.filler,
      {
        backgroundColor: "lightblue",
        width: `${fillerWidth + 10}px`
      }
    ])
  ); 

  const filler = (
    <img
      style={fillerStyles}
      src={fillerImage}
    />
  )


  // EFFECTS ------------------------------------------------------------------------------------------

  // ADJUST SLIDER POSITION BASED ON CURRENT TIME 
  useEffect(
    () => {
      setSliderHpos(
        Math.floor(
          props.currentTime 
          * (
            (props.sliderPositions.range - props.sliderPositions.width)
            / props.currentTrackDuration
          )
        )
      )
    },
    [props.currentTime]  
  )

  // ADJUST FILLER WIDTH BASED ON SLIDER POSITION
  useEffect(
    () => {
      setFillerWidth(sliderHpos)
    },
    [sliderHpos]
  )

  // EVENT HANDLERS -------------------------------------------------------------------------------------
  function handleMouseDown(event) {
    setSliderHpos(alignSliderToMouse(event, props.sliderPositions));
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event) {
    setSliderHpos(alignSliderToMouse(event, props.sliderPositions));
  }

  function handleMouseUp() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }




  return (
    <div>
      {seekBar}
      {slider}
      {filler}
    </div>
  )
}

