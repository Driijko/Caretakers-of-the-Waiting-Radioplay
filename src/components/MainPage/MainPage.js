import React, {useState, useEffect} from 'react';

// IMPORT COMPONENTS -------------------------------------------------------------------------------
import MainPoster from './Main Poster/MainPoster';
import AudioPrompt from './AudioPrompt';
import AudioPlayer from '../Audio Player/AudioPlayer'
import Acts from './Acts/Acts'


export default function MainPage(props) {

  // MAIN PAGE MODES ////////////////////////////////////////////////////////////////////////////////
  // The main page has a series of modes it transistions through.

  const mainPageModes = [
    "audio prompt",
    "poster fade in",
    "poster select",
    "poster fade down",
    "act select",
  ]

  const [mainPageCurrentMode, setMainPageCurrentMode] = useState(mainPageModes[0])

  // Once the main poster has faded in completely, we need to switch to the poster select mode.
  function switchToPosterSelectMode() {
    setMainPageCurrentMode(mainPageModes[2])
  }

  // Once the main poster has faded down, we need to switch to the act select mode.
  function switchToActSelectMode() {
    setMainPageCurrentMode(mainPageModes[4])
  }

  // AUDIO ////////////////////////////////////////////////////////////////////////////////////////
  // The user can opt to enable audio upon landing on the main page.
  const [introAudioPlays, setIntroAudioPlays] = useState(false)

  // Irregardless, the first track to be loaded into the audio player is the main musical theme.  
  const [currentTrack, setCurrentTrack] = (
    useState({
      title: "Caretakers of the Waiting Main Theme",
      duration: 245,
      filePath: "./themeMusic.mp3"
    })
  );

  // This function allows us to change which track is loaded into the audio player.
  // If it is given an input of the number 0, it will play the main musical theme.
  // For an input of the number 1, it will play Act 1, for the number 2, Act 2, etc,
  // up to Act 5
  function selectTrack(trackNumber) {
    if (trackNumber === 0) {
      setCurrentTrack({
        title: "Caretakers of the Waiting Main Theme",
        duration: 245,
        filePath: './themeMusic.mp3'
      })
    }
    else if (trackNumber === 1) {
      setCurrentTrack({
        title: "Act 1: Seeds",
        duration: 701,
        filePath: './act1.mp3'
      })
    }
    else if (trackNumber === 2) {
      setCurrentTrack({
        title: "Act 2: Sprouts",
        duration: 636,
        filePath: `./act2.mp3`
      })
    }
    else if (trackNumber === 3) {
      setCurrentTrack({
        title: "Act 3: Stems",
        duration: 548,
        filePath: './act3.mp3'
      })
    }
    else if (trackNumber === 4) {
      setCurrentTrack({
        title: "Act 4: Branches",
        duration: 892,
        filePath: './act4.mp3'
      })
    }
    else if (trackNumber === 5) {
      setCurrentTrack({
        title: "Act 5: Leaves",
        duration: 991,
        filePath: './act5.mp3'
      })
    }
  }

  // We only display the audio player controls once we get to the act select mode.
  const [displayAudioPlayerControls, setDisplayAudioPlayerControls] = useState(false)

  // User selects 'yes' for audio prompt.
  function handleYesButtonClick() {
    setMainPageCurrentMode(mainPageModes[1])
    setIntroAudioPlays(true)
  }

  function handleNoButtonClick() {
    setMainPageCurrentMode(mainPageModes[1])
  }

  // MAIN POSTER ////////////////////////////////////////////////////////////////////////////////
  const [mainPosterTransparencyShift, setMainPosterTransparencyShift] = useState("noShift")
  const [posterOverlayColor, setPosterOverlayColor] = useState("0, 0, 0")

  function handlePosterClick() {
    setMainPageCurrentMode(mainPageModes[3])
  }

  // RENDERING -------------------------------------------------------------------------------------

  // Audio Prompt Component
  const [renderAudioPrompt, setRenderAudioPrompt] = useState(false)

  // Acts Component
  const [renderActs, setRenderActs] = useState(true)

  // Any time a new mode is initiated for the main page, this effect is triggered, 
  // allowing us to control what is being rendered depending on the mode.
  useEffect(
    () => {
      if (mainPageCurrentMode === "poster fade in") {
        setRenderAudioPrompt(false)
        setMainPosterTransparencyShift("fadeIn")
      }
      else if (mainPageCurrentMode === "poster select") {
        setPosterOverlayColor("32, 178, 170")
      }
      else if (mainPageCurrentMode === "poster fade down") {
        setPosterOverlayColor("0, 0, 0")
        setMainPosterTransparencyShift("fadeDown")
      }
      else if (mainPageCurrentMode === "act select") {
        setDisplayAudioPlayerControls(true)
        setRenderActs(true)
      }
    },
    [mainPageCurrentMode]
  )

  return (
    <div>

      <AudioPlayer
        currentTrack={currentTrack}
        windowSize={props.windowSize}
        displayAudioPlayerControls={displayAudioPlayerControls}
        introAudioPlays={introAudioPlays}
      />

      {renderAudioPrompt ? 
        <AudioPrompt
          windowSize={props.windowSize}
          handleYesButtonClick={handleYesButtonClick}
          handleNoButtonClick={handleNoButtonClick}
        /> 
        : null
      }

      <MainPoster 
        windowSize={props.windowSize}
        transparencyShift={mainPosterTransparencyShift}
        switchToPosterSelectMode={switchToPosterSelectMode}
        switchToActSelectMode={switchToActSelectMode}
        overlayColor={posterOverlayColor}
        handleClick={handlePosterClick}
      />

      {renderActs ?
        <Acts 
          windowSize={props.windowSize}
          handleActClick={selectTrack}
        />
        : null      
      }

    </div>
  )
}