import React, {useState, useEffect} from 'react';

// HELPER FUNCTIONS
import combineObjects from '../../globalHelperFunctions/combineObjectsFunction';
import alignSliderToMouse from '../Audio Player/Audio Player Helper Functions/alignSliderToMouse';

// Import filler image
import fillerImage from '../../assets/audioPlayer/icons/lineFill6.jpg'


export default function VolumeBar(props) {

  const [sliderHpos, setSliderHpos] = useState(props.sliderSpatialVariables.range);
  const [fillerWidth, setFillerWidth] = useState(0)

  // ELEMENTS --------------------------------------------------------------------------------

  // VOLUME BAR
  const barStyles = (
    combineObjects([
      {
        border: "2px solid red"
      },
      props.spatialStyles.bar
    ])
  )

  // VOLUME BAR SLIDER
  const sliderStyles = (
    combineObjects([
      {
        backgroundColor: "cyan",
        left: `${props.sliderSpatialVariables.minLeft + sliderHpos}px`
      },
      props.spatialStyles.slider
    ])
  )

  // FILLER ---------------------------------------------------------------------------------------
  const fillerStyles = (
    combineObjects([
      props.spatialStyles.filler,
      {
        backgroundColor: "cyan",
        width: `${fillerWidth}px`
      }
    ])
  )

  // EVENT HANDLERS

  function handleMouseDown(event) {
    setSliderHpos(
      alignSliderToMouse(event, props.sliderSpatialVariables)
    )
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp)
  }

  function handleMouseMove(event) {
    setSliderHpos(
      alignSliderToMouse(event, props.sliderSpatialVariables)
    )
  }

  function handleMouseUp(event) {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  // EFFECTS 

  // ADJUST VOLUME BY SLIDER HPOS
  useEffect(
    () => {
      props.adjustVolumeBySlider(sliderHpos);
    },
    [sliderHpos]
  )

  // ADJUST SLIDER BASED ON CLICKING MUTE/FULL-VOLUME BUTTON
  useEffect(
    () => {
      if (props.volume === 1) {
        setSliderHpos(props.sliderSpatialVariables.maxLeft - props.sliderSpatialVariables.width - props.sliderSpatialVariables.minLeft)
      }
      else if (props.volume === 0) {
        setSliderHpos(0);
      }
    },
    [props.volume]
  )

  // ADJUST FILLER WIDTH BASED ON SLIDER POSITION
  useEffect(
    () => {
      setFillerWidth(sliderHpos + 5);
    }, 
    [sliderHpos]
  )


  return(
    <div>

      <div
        style={barStyles}
        onMouseDown={handleMouseDown}
      ></div>

      <div
        style={sliderStyles}
      ></div>

      {/* <div
        style={fillerStyles}
      ></div> */}

      <img
        style={fillerStyles}
        src={fillerImage}
      />

    </div>
  )
}