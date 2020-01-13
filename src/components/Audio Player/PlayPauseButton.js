import React, { useEffect, useState } from 'react';

import playButtonImage from '../../assets/audioPlayer/icons/playButton.png';
import pauseButtonImage from '../../assets/audioPlayer/icons/pauseButton.png';

export default function PlayPauseButton(props) {

  const [buttonImage, setButtonImage] = useState(playButtonImage)

  function handleClick(event) {
    if (event.target.src === playButtonImage) {
      // event.target.src = pauseButtonImage;
      setButtonImage(pauseButtonImage)
    }
    else {
      // event.target.src = playButtonImage;
      setButtonImage(playButtonImage)
    }
  }

  useEffect(
    () => {
      setButtonImage(pauseButtonImage)
    },
    [props.currentTrack]
  )

  useEffect(
    () => {
      if (props.introAudioPlays) {
        setButtonImage(pauseButtonImage)
      }
      else {
        setButtonImage(playButtonImage)
      }
    },
    [props.introAudioPlays]
  )

  return ( 
    <img
      id="playPauseButton"
      // src={props.introAudioPlays ? pauseButtonImage : playButtonImage}
      src={buttonImage}
      onClick={
        (event) => {
          props.handleClick(event);
          handleClick(event);
        }
      }
      style={props.spatial}
    />
  )
}