import React, {useState, useEffect } from 'react';

import muteButtonImage from '../../assets/audioPlayer/icons/muteButton.png';
import fullVolumeButtonImage from '../../assets/audioPlayer/icons/fullVolumeButton.png';


export default function MuteFullVolumeButton(props) {

  const [imageFilePath, setImageFilePath] = useState(fullVolumeButtonImage);

  function handleClick() {
    if(imageFilePath === fullVolumeButtonImage) {
      setImageFilePath(muteButtonImage);
    }
    else {
      setImageFilePath(fullVolumeButtonImage);
    }
  }

  // ADJUST IMAGE IF SLIDER IS MOVED TO CERTAIN POSITIONS
  useEffect(
    () => {
      if(props.volume === 0) {
        setImageFilePath(muteButtonImage);
      }
      else {
        setImageFilePath(fullVolumeButtonImage);
      }
    },
    [props.volume]
  )

  return (
    <img
      id="muteFullVolumeButton"
      src={imageFilePath}
      onClick={
        (event) => {
          handleClick(event);
          props.handleClick(event);
        }
      }
      style={props.spatialStyles}
    />
  )
}