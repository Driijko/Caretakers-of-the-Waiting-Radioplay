// IMPORTS ------------------------------------------------------------------------------------------
import React, {useState, useEffect} from 'react';

// IMPORT COMPONENTS
import Container from './Container';
import PlayPauseButton from './PlayPauseButton';
import SeekBar from './SeekBar';
import TimeDisplay from './TimeDisplay';
import MuteFullVolumeButton from './MuteFullVolumeButton';
import VolumeBar from './VolumeBar';
import TrackTitleDisplay from './TrackTitleDisplay';

// IMPORT HELPER FUNCTIONS
import spatialLayoutFunction from './Audio Player Helper Functions/spatialLayoutFunction';

// IMPORT AUDIO FILES
const audioFiles = require.context("../../assets/audioPlayer/audio", true);
const audioPath = (name) => audioFiles(name, true);



export default function AudioPlayer(props) {

  // STATE ---------------------------------------------------------------------------------------
  // TESTING
  const [test, setTest] = useState('');
  
  // SPATIAL LAYOUT
  const [spatialLayout, setSpatialLayout] = (
    useState(
      spatialLayoutFunction(
        props.windowSize.width,
        props.windowSize.height
      )
    )
  )

  // CURRENT TRACK
  const [currentTrack, setCurrentTrack] = useState(props.currentTrack);

  // PLAYBACK
  const [audioIsPlaying, setAudioIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  let audioWasPlaying = false;

  // VOLUME
  const [volume, setVolume] = useState(1);

  // ELEMENTS --------------------------------------------------------------------------------------

  // AUDIO ELEMENT
  const audioElementRef = React.createRef();

  const audioElement = (
    <audio
      ref={audioElementRef}
      src={audioPath(currentTrack.filePath)}
      type="audio/mpeg"
      onTimeUpdate={handleTimeUpdate}
      autoPlay={true}
    >
      Your browser does not support the audio software used on this website. If you are using Internet Explorer, please 
      update it to the most recent version, or revisit this website using a browser like Firefox or Chrome.
    </audio>
  )

  function adjustVolumeByVolumeBarSlider(sliderHpos) {
    setVolume(
      Math.floor(
        (
          sliderHpos 
          * (1 / spatialLayout.volumeBarSlider.range)
        )
        * 100
      )
      * 0.01
    );
  }


  // EVENT HANDLERS -------------------------------------------------------------------------------

  // CLICK PLAY/PAUSE BUTTON OR MUTE/FULL-VOLUME BUTTON
  function handleClick(event) {
    if(event.target.id === "playPauseButton") {
      if(audioIsPlaying) {
        setAudioIsPlaying(false);
        audioElementRef.current.pause();
      }
      else {
        setAudioIsPlaying(true);
        audioElementRef.current.play();
      }     
    }
    if(event.target.id === "muteFullVolumeButton") {
      if (volume > 0) {
        setVolume(0);
      }
      else {
        setVolume(1);
      }
    }
  }

  // MOUSE DOWN ON SEEK BAR OR VOLUME BAR
  function handleMouseDown(event) {
    if(event.target.id === "seekBar") {
      if(audioIsPlaying) {
        setAudioIsPlaying(false);
        document.addEventListener("mouseup", handleMouseUp);
      }
    }
  }

  function handleMouseUp() {
    setAudioIsPlaying(true); 
    document.removeEventListener("mouseup", handleMouseUp);
  }

  function handleTimeUpdate(event) {
    setCurrentTime(Math.round(event.target.currentTime));
  }

  // EFFECTS ----------------------------------------------------------------------------------------

  // ADJUST SPATIAL LAYOUT WHEN WINDOW RESIZES 
  useEffect(
    () => {
      setSpatialLayout(
        spatialLayoutFunction(
          props.windowSize.width,
          props.windowSize.height
        )
      )
    },
    [props.windowSize]
  )

  // SET NEW AUDIO TRACK
  useEffect(
    () => {
      setCurrentTrack(props.currentTrack)
      setAudioIsPlaying(true)
    },
    [props.currentTrack]
  )


  // PLAY / PAUSE AUDIO
  useEffect(
    () => {
      if (audioIsPlaying) {
        audioElementRef.current.play();
      }
      else {
        audioElementRef.current.pause();
      }
    }, 
    [audioIsPlaying]
  )

  // PLAY INTRO AUDIO
  // This is a special case where the user opts to enable audio when they first land on the main page.
  useEffect(
    () => {
      if (props.introAudioPlays) {
        setAudioIsPlaying(true)
        audioElementRef.current.play();
      }
    },
    [props.introAudioPlays]
  )

  // ADJUST VOLUME
  useEffect(
    () => {
      audioElementRef.current.volume = volume;
    },
    [volume]
  )
  

  // RENDERING -----------------------------------------------------------------------------------

  return (
    <div>
      {audioElement}
      {props.displayAudioPlayerControls ?
        [
          <Container
            spatialLayoutStyles={spatialLayout.styles.container} 
          />,
          <PlayPauseButton 
            handleClick={handleClick}
            spatial={spatialLayout.styles.playPauseButton}
            introAudioPlays={props.introAudioPlays}
            currentTrack={currentTrack.title}
          />,
          <SeekBar 
            spatialStyles={spatialLayout.styles.seekBar}
            sliderPositions={spatialLayout.seekBarSlider}
            handleMouseDown={handleMouseDown}
            currentTime={currentTime}
            currentTrackDuration={currentTrack.duration}
          />,
          <TimeDisplay 
            currentTime={currentTime}
            currentTrackDuration={currentTrack.duration}
            spatialStyles={spatialLayout.styles.timeDisplay}
          />,
          <MuteFullVolumeButton 
            handleClick={handleClick}
            spatialStyles={spatialLayout.styles.muteFullVolumeButton}
            volume={volume}
          />,
          <VolumeBar
            spatialStyles={spatialLayout.styles.volumeBar}
            sliderSpatialVariables={spatialLayout.volumeBarSlider}
            adjustVolumeBySlider={adjustVolumeByVolumeBarSlider}
            volume={volume}
          />,
          <TrackTitleDisplay 
            trackTitle={currentTrack.title}
            spatialStyles={spatialLayout.styles.trackTitleDisplay}
          />
        ]
        : null
      }
    </div>
  )  
}