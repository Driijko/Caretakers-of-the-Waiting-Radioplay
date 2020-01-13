import React, {useState, useEffect} from 'react';

// IMPORT HELPER FUNCTIONS ---------------------------------------------------------------------------------------
import windowSizeToAudioPlayerSizeAndPosition from './SizeAndPositionFunction.js.js';
import combineObjects from '../../../globalHelperFunctions/combineObjectsFunction.js';

// IMPORT AUDIO AND ICON IMAGES -----------------------------------------------------------------------------------
const audioFiles = require.context("../../assets/audioPlayer/audio", true);
const audioPath = (name) => audioFiles(name, true);
const iconFiles = require.context("../../assets/audioPlayer/icons", true);
const iconsPath = (name) => iconFiles(name, true);

export default function AudioPlayer(props) {

  // STATE -----------------------------------------------------------------------------------------------------------
  const [test, setTest] = useState("");

  // SIZE AND POSITION
  const [spatial, setSpatial] = useState(
    windowSizeToAudioPlayerSizeAndPosition(props.windowSize)
  )

  // CONTROLS
  const [currentTrack] = useState(props.currentTrack);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeBarSliderHpos, setVolumeBarSliderHpos] = useState(288);
  const [seekBarSliderHpos, setSeekBarSliderHpos] = useState(spatial.seekBarSlider.initialLeft);
  const [audioMuteButtonFilePath, setAudioMuteButtonFilePath] = useState(iconsPath("./volumeAdjustButton.png"));
  const [mouseDownOnSeekBar, setMouseDownOnSeekBar] = useState(false);

  // GLOBAL VARIABLES ---------------------------------------------------------------------------------------------
  let mouseDownOn;
  let audioWasPlaying;

  // ELEMENTS -----------------------------------------------------------------------------------------------------

  // TEST ELEMENT 
  const testElement = (
    <p>{`${mouseDownOnSeekBar}, ${seekBarSliderHpos}`}</p>
  )

  // AUDIO ELEMENT 
  const audioElementRef = React.createRef();

  const audioElement = (
    <audio
      ref={audioElementRef}
      controls
      src={audioPath(currentTrack.filePath)}
      onTimeUpdate={handleTimeUpdate}
    >
      Your browser does not support the audio used on this website. If you are using Internet Explorer 8,
      or a previous version, please update to a more recent version, or try visiting this website using 
      a browser like Firefox or Chrome.
    </audio>
  )

  function adjustCurrentTime(newTime) {
    audioElementRef.current.currentTime = newTime;
  }

  // CURRENT TRACK TITLE DISPLAY ELEMENT
  const currentTrackTitleDisplay = (
    <p>{currentTrack.title}</p>
  )

  // PLAY / PAUSE BUTTON ELEMENT
  const playPauseButton = (
    <img
      id="playPauseButton"
      src={iconsPath("./playButton.png")}
      onClick={handleClick}
      style={spatial.styles.playPauseButton}
    />
  )

  // TIME DISPLAY ELEMENT
  function timeDisplayFunction(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsOfMinute = seconds % 60;
    let lessThanTenSeconds = "";
    if (secondsOfMinute < 10) {
      lessThanTenSeconds = "0";
    }
    return `${minutes}:${lessThanTenSeconds}${secondsOfMinute}`;
  }

  const timeDisplay = (
    <p
      style={spatial.styles.timeDisplay}
    >
      {`${timeDisplayFunction(currentTime)} / ${timeDisplayFunction(currentTrack.duration)}`}
    </p>
  )

  // AUDIOMUTE BUTTON ELEMENT
  const audioMuteButton = (
    <img
      id="audioMuteButton"
      src={audioMuteButtonFilePath}
      onClick={handleClick}
      style={spatial.styles.audioMuteButton}
    />
  )

  // VOLUME BAR

  // VOLUME BAR ELEMENT
  const volumeBar = (
    <div
      id="volumeBar"
      style={
        combineObjects([
          spatial.styles.volumeBar.bar,
          {border: "2px solid red"}
        ])
      }
      onMouseDown={handleMouseDown}
    >
    </div>
  )

  // VOLUME BAR SLIDER ELEMENT
  const volumeBarSlider = (
    <div
      id="volumeBarSlider"
      style={
        combineObjects([
          spatial.styles.volumeBar.slider,
          {
            backgroundColor: "blue",
            zIndex: "-1",
            left: `${volumeBarSliderHpos}px`
          }
        ])
      }
      onMouseDown={handleMouseDown}
    >     
    </div>
  )

  // VOLUME BAR FILL ELEMENT
  const volumeBarFill = (
    <div
      style={{
        position: "absolute",
        backgroundColor: "red",
        width: `${volumeBarSliderHpos - 8}px`,
        height: "52px",
        zIndex: "-2"       
      }}
    ></div>
  )

  // SEEK BAR

  // SEEK BAR ELEMENT
  const seekBar = (
    <div
      id="seekBar"
      style={
        combineObjects([
          spatial.styles.seekBar.bar,
          {border: "2px solid magenta"}
        ])
      }
      onMouseDown={handleMouseDown}
    ></div>
  )


  // SEEK BAR SLIDER ELEMENT
  const seekBarSlider = (
    <div
    id="seekBarSlider"
    style={{
      backgroundColor: "blue",
      left: `${seekBarSliderHpos}px`,
      position: "absolute",
      top: spatial.styles.seekBar.slider.top,
      width: spatial.styles.seekBar.slider.width,
      height: spatial.styles.seekBar.slider.height,
      zIndex: "-1"
    }}
    onMouseDown={handleMouseDown}
    ></div>
  )

  // CONTAINER
  const container = (
    <div
      style={spatial.styles.container}
    ></div>
  )

  const elements = [
    testElement,
    audioElement,
    container,
    currentTrackTitleDisplay,
    playPauseButton,
    timeDisplay,
    audioMuteButton,
    volumeBar,
    volumeBarSlider,
    volumeBarFill,
    seekBar,
    seekBarSlider
  ];

  // EFFECTS ------------------------------------------------------------------------------------------

  // ADJUST AUDIO PLAYER SIZE AND POSITION BASED ON WINDOW RESIZE
  useEffect(
    () => {

    },
    [props.windowSize]
  )


  // ADJUST VOLUME AND AUDIOMUTE BUTTON IMAGE BASED ON VOLUME BAR SLIDER HORIZONTAL POSITION
  useEffect(
    () => {
      audioElementRef.current.volume = (
        ( Math.floor(
          (volumeBarSliderHpos - spatial.volumeBarSlider.intialLeft)  
          / (spatial.volumeBarSlider.range / 100))
          )/100
      );
      if (volumeBarSliderHpos === spatial.volumeBarSlider.initialLeft) {
        setAudioMuteButtonFilePath(iconsPath("./muteButton.png"));
      } else {
        setAudioMuteButtonFilePath(iconsPath("./volumeAdjustButton.png"));
      }
    },
    [volumeBarSliderHpos]
  )

  // PAUSE OR PLAY AUDIO BASED ON audioIsPlaying VARIABLE
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

  // ADJUST CURRENT TIME BASED ON SEEK BAR SLIDER POSITION
  useEffect(
    () => {
      if (mouseDownOnSeekBar) {
        const wholePositionPercentage = Math.floor(
          (seekBarSliderHpos - spatial.seekBarSlider.initialLeft) 
          * (currentTrack.duration / (spatial.seekBarSlider.range)));
        setTest(wholePositionPercentage);
        if (currentTime !== wholePositionPercentage) {
          // setCurrentTime(wholePositionPercentage);
          adjustCurrentTime(wholePositionPercentage);
        } 
      }    
    },
    [seekBarSliderHpos]
  )


  // ADJUST SEEK BAR SLIDER POSITION BASED ON CURRENT TIME
  useEffect(
    () => {
        if (!(mouseDownOnSeekBar)) {
        const wholeTimePercentage = Math.floor(currentTime * (spatial.seekBarSlider.range / currentTrack.duration))
        if (seekBarSliderHpos !== wholeTimePercentage) {
          setSeekBarSliderHpos(wholeTimePercentage + spatial.seekBarSlider.initialLeft) ;
        }
      }
    },
    [currentTime]
  )


  // EVENT HANDLERS ------------------------------------------------------------------------------------

  function handleClick(event) {

    // CLICK PLAY/PAUSE BUTTON
    if (event.target.id === "playPauseButton") {
      if (audioIsPlaying) {
        event.target.src = iconsPath("./playButton.png");
        setAudioIsPlaying(false);
      } else {
        event.target.src = iconsPath("./pauseButton.png");
        setAudioIsPlaying(true);
      }
    }
    // CLICK AUDIOMUTE BUTTON
    else if (event.target.id === "audioMuteButton") {
      if (volumeBarSliderHpos > spatial.volumeBarSlider.initialLeft) {
        setAudioMuteButtonFilePath(iconsPath("./muteButton.png"));
        setVolumeBarSliderHpos(spatial.volumeBarSlider.initialLeft);
      } 
      else if (volumeBarSliderHpos === spatial.volumeBarSlider.initialLeft) {
        setAudioMuteButtonFilePath(iconsPath("./volumeAdjustButton.png"));
        setVolumeBarSliderHpos(spatial.volumeBarSlider.maxLeft);
      }
    }
  }

  // ADJUST SLIDER TO MOUSE HORIZONTAL POSITION
  function hposAlignSliderToMouse(event, element) {
    let sliderTargetHpos = event.clientX - (Math.floor(spatial.sliderWidth / 2));

    if (element === "seekBar")
    {
      if (sliderTargetHpos > spatial.seekBarSlider.maxLeft) {
        sliderTargetHpos = spatial.seekBarSlider.maxLeft;
      } else if (sliderTargetHpos < spatial.seekBarSlider.initialLeft) {
        sliderTargetHpos = spatial.seekBarSlider.initialLeft;
      }
      setSeekBarSliderHpos(sliderTargetHpos);
    }
    else if (element === "volumeBar") 
    {
      if (sliderTargetHpos > spatial.volumeBarSlider.maxLeft) {
        sliderTargetHpos = spatial.volumeBarSlider.maxLeft;
      } else if (sliderTargetHpos < spatial.volumeBarSlider.initialLeft) {
        sliderTargetHpos = spatial.volumeBarSlider.initialLeft;
      }
      setVolumeBarSliderHpos(sliderTargetHpos);
    }
  }

  // MOUSE DOWN
  function handleMouseDown(event) {
    // MOUSE DOWN ON VOLUME BAR
    if (
      event.target.id === "volumeBar"
      || event.target.id === "volumeBarSlider"
    )
    {      
      mouseDownOn = "volumeBar";
    }
    // MOUSE DOWN ON SEEK BAR
    else if (
      event.target.id === "seekBar"
      || event.target.id === "seekBarSlider"
    )
    {
      mouseDownOn = "seekBar";
      setMouseDownOnSeekBar(true);
      if(audioIsPlaying) {
        setAudioIsPlaying(false);
        audioWasPlaying = true;
      }
    }
    hposAlignSliderToMouse(event, mouseDownOn);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  // MOUSE MOVE AFTER MOUSE DOWN ON VOLUME OR SEEK BAR
  function handleMouseMove(event) {
    hposAlignSliderToMouse(event, mouseDownOn);
  }

  // MOUSE UP AFTER MOUSE DOWN ON VOLUME OR SEEK BAR
  function handleMouseUp(event) {
    // SPECIFIC CODE FOR MOUSE UP AFTER MOUSE DOWN ON SEEK BAR
    if (mouseDownOn === "seekBar") {
      if (audioWasPlaying) {
        setAudioIsPlaying(true);
        audioWasPlaying = null;      
      }
      setMouseDownOnSeekBar(false);
    }
    // --------------------------------------------------------
    mouseDownOn = "";
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  // CURRENT TIME UPDATE
  function handleTimeUpdate(event) {
    if(Math.round(event.target.currentTime) !== currentTime) {
      setCurrentTime(Math.round(event.target.currentTime));      
    }
  }


  // RENDERING -------------------------------------------------------------------------------------------------

  return (
    <div>
      {/* <div>{testElement}</div> */}
      {audioElement}
      {/* {container}
      {playPauseButton}
      {seekBar}
      {seekBarSlider}
      {timeDisplay}
      {audioMuteButton} */}
      {/* {volumeBar} */}
      {/* {volumeBarSlider} */}
    </div>
  )
}