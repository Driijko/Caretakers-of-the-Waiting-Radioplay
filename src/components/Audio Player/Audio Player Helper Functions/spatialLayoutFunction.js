export default function spatialLayoutFunction (windowWidth, windowHeight) {

  // CONTAINER LAYOUT ------------------------------------------------------------------------------
  // Default settings
  let containerWidth = 600;
  let containerHeight = 100;
  let bottomOfWindowOffset = 40;
  
  // Including the default settings, we have four possible spatial layouts for the container.
  // We check to see if the window width is less than a critical window width point.
  // If it is, we layout the container appropriately.
  const windowWidthCriticalPoints = [400, 500, 700];
  const containerPossibleWidths = [290, 350, 450];
  const containerPossibleHeights = [200, 200, 150];
  const bottomOfWindowPossibleOffsets = [10, 20, 30]

  for(let i = 0 ; i < windowWidthCriticalPoints.length ; i++) {
    if(windowWidth < windowWidthCriticalPoints[i]) {
      containerWidth = containerPossibleWidths[i];
      containerHeight = containerPossibleHeights[i];
      bottomOfWindowOffset = bottomOfWindowPossibleOffsets[i];
      break;
    }
  }

  // We center the container, and place it 50px (or less) from the bottom of the window.
  const containerLeft = Math.floor((windowWidth / 2) - (containerWidth / 2));
  const containerTop = Math.floor(windowHeight - (containerHeight + bottomOfWindowOffset));

  // DEFAULT LAYOUT FOR ALL OTHER ELEMENTS ----------------------------------------------------

  // BUTTONS
  const buttonSize = "60px";

  // SLIDERS
  const sliderWidth = 20;

  // PLAY/PAUSE BUTTON
  let playPauseButtonLeft = containerLeft + 5;

  // SEEK BAR
  const seekBarWidth = 200;
  let seekBarLeft = containerLeft + 70

  // TIME DISPLAY
  let timeDisplayLeft = containerLeft + 290;
  let timeDisplayTop = containerTop;

  // MUTE/FULL-VOLUME BUTTON
  let muteFullVolumeButtonTop = containerTop + 5;
  let muteFullVolumeButtonLeft = containerLeft + 390;

  // VOLUME BAR
  let volumeBarTop = containerTop + 15;
  let volumeBarLeft = containerLeft + 460;

  // TRACK TITLE DISPLAY
  let trackTitleDisplayWidth = 400;
  let trackTitleDisplayTop = containerTop + 70;

  // ADJUSTMENTS BASED ON CONTAINER WIDTH -----------------------------------------------------
  // ADJUSTMENT 1
  if (containerWidth === containerPossibleWidths[2]) {

    // PLAY/PAUSE BUTTON
    playPauseButtonLeft = containerLeft + 20;

    // SEEK BAR
    seekBarLeft = containerLeft + 105;

    // TIME DISPLAY
    timeDisplayLeft = containerLeft + 340;

    // MUTE/FULL-VOLUME BUTTON
    muteFullVolumeButtonTop = containerTop + 60;
    muteFullVolumeButtonLeft = containerLeft + 20;

    // VOLUME BAR
    volumeBarTop = containerTop + 70;
    volumeBarLeft = containerLeft + 105;

    // TRACK TITLE DISPLAY
    trackTitleDisplayTop = containerTop + 120;
    
  }

  // ADJUSTMENT 2
  else if (containerWidth === containerPossibleWidths[1]) {

    // PLAY/PAUSE BUTTON
    playPauseButtonLeft = containerLeft + 30;

    // SEEK BAR
    seekBarLeft = containerLeft + 115

    // TIME DISPLAY
    timeDisplayLeft = containerLeft + 180;
    timeDisplayTop = containerTop + 30;

    // MUTE/FULL-VOLUME BUTTON
    muteFullVolumeButtonLeft = containerLeft + 30;
    muteFullVolumeButtonTop = containerTop + 90;

    // VOLUME BAR
    volumeBarLeft = containerLeft + 115;
    volumeBarTop = containerTop + 100;

    // TRACK TITLE DISPLAY
    trackTitleDisplayTop = containerTop + 170;
  }
  
  // ADJUSTMENT 3
  else if (containerWidth === containerPossibleWidths[0]) {

    // TIME DISPLAY
    timeDisplayLeft = containerLeft + 140;
    timeDisplayTop = containerTop + 30;

    // MUTE/FULL-VOLUME BUTTON
    muteFullVolumeButtonLeft = containerLeft + 5;
    muteFullVolumeButtonTop = containerTop + 80;

    // VOLUME BAR
    volumeBarLeft = containerLeft + 70;
    volumeBarTop = containerTop + 90;

    // TRACK TITLE DISPLAY
    trackTitleDisplayTop = containerTop + 150;
    trackTitleDisplayWidth = 200;
  }

  return {
    styles: {
      container: {
        position: "absolute",
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        top: `${containerTop}px`,
        left: `${containerLeft}px`
      },
      playPauseButton: {
        position: "absolute",
        width: buttonSize,
        height: buttonSize,
        top: `${containerTop + 5}px`,
        left: `${playPauseButtonLeft}px`
      },
      seekBar: {
        bar: {
          position: "absolute",
          width: `${seekBarWidth}px`,
          height: "35px",
          top: `${containerTop + 15}px`,
          left: `${seekBarLeft}px`
        },
        slider: {
          position: "absolute",
          width: `${sliderWidth}px`,
          height: "38px",
          top: `${containerTop + 15}px`,
          zIndex: "-1"
        },
        filler: {
          position: "absolute",
          height: "38px",
          zIndex: "-2",
          top: `${containerTop + 15}px`,
          left: `${seekBarLeft}px`
        }
      },
      timeDisplay: {
        position: "absolute",
        top: `${timeDisplayTop}px`,
        left: `${timeDisplayLeft}px`
      },
      muteFullVolumeButton: {
        position: "absolute",
        top: `${muteFullVolumeButtonTop}px`,
        left: `${muteFullVolumeButtonLeft}px`,
        width: buttonSize,
        height: buttonSize
      },
      volumeBar: {
        bar: {
          position: "absolute",
          width: `${120}px`,
          height: "35px",
          top: `${volumeBarTop}px`,
          left: `${volumeBarLeft}px`
        },
        slider: {
          position: "absolute",
          width: `${sliderWidth}px`,
          zIndex: "-1",
          top: `${volumeBarTop}px`,
          height: "38px"
        },
        filler: {
          position: "absolute",
          height: "38px",
          top: `${volumeBarTop}px`,
          zIndex: "-2",
          left: `${volumeBarLeft}px`
        }
      },
      trackTitleDisplay: {
        position: "absolute",
        top: `${trackTitleDisplayTop}px`,
        left: `${containerLeft + (containerWidth / 2) - (trackTitleDisplayWidth / 2)}px`,
        textAlign: "center",
        verticalAlign: "middle",
        lineHeight: "20px",
        width: `${trackTitleDisplayWidth}px`,
        height: "20px",
        fontSize: "18px"
      }
    },
    seekBarSlider: {
      initialLeft: seekBarLeft,
      minLeft: seekBarLeft,
      maxLeft: seekBarLeft + seekBarWidth,
      range: seekBarWidth, 
      width: sliderWidth
    },
    volumeBarSlider: {
      initialLeft: volumeBarLeft + 120 + 2 - (sliderWidth),
      minLeft: volumeBarLeft,
      maxLeft: volumeBarLeft + 120 + 2,
      range: (120 + 2) - sliderWidth,
      width: sliderWidth
    }
  }
}