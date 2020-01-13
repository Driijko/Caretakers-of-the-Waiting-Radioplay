export default function windowSizeToAudioPlayerSizeAndPosition(windowWidth, windowHeight) {

  const containerLeft = 500;
  const containerTop = 600;
  const seekBarWidth = 150;
  const volumeBarWidth = 100;
  const buttonSize = "50px";
  const barHeight = "30px";
  const sliderWidth = "10px";

  return {
    styles : {
      container: {
        border: "2px solid purple",
        position: "absolute",
        width: "500px",
        height: "100px",
        left: `${containerLeft}px`,
        top: `${containerTop}px`
      },
      playPauseButton: {
        position: "absolute",
        width: buttonSize,
        height: buttonSize,
        left: `${containerLeft + 10}px`,
        top: `${containerTop + 10}px`
      },
      seekBar: {
        bar: {
          position: "absolute",
          width: `${seekBarWidth}px`,
          height: barHeight,
          left: `${containerLeft + 70}px`,
          top: `${containerTop + 20}px`
        },
        slider: {
          // backgroundColor: "blue",
          position: "absolute",
          width: "15px",
          height: "33px",
          top: `${containerTop + 20}px`,
          // zIndex: "-1",
        },
        fill: {
          position: "absolute",
          height: "50px",
          left: `${containerLeft + 70}`,
          top: `${containerTop + 70}`
        }
      },
      timeDisplay: {
        position: "absolute",
        width: "100px",
        height: "50px",
        left: `${containerLeft + 235}px`,
        top: `${containerTop + 10}px`
      },
      audioMuteButton: {
        position: "absolute",
        width: buttonSize,
        height: buttonSize,
        left: `${containerLeft + 320}px`,
        top: `${containerTop + 10}px`
      },
      volumeBar: {
        bar: {
          position: "absolute",
          width: `${volumeBarWidth}px`,
          height: barHeight,
          left: `${containerLeft + 380}px`,
          top: `${containerTop + 20}px`
        },
        slider: {
          position: "absolute",
          width: sliderWidth,
          height: barHeight,
          top: `${containerTop + 20}px`,
        }
      }
    },
    sliderWidth: 20,
    seekBarSlider: {
      initialLeft: containerLeft + 70,
      maxLeft: (containerLeft + 70 + seekBarWidth) - 13,
      range: seekBarWidth - 13 
    },
    seekBarFill: {},
    volumeBarSlider: {
      intialLeft: containerLeft + 380,
      maxLeft: (containerLeft + 380 + volumeBarWidth) - 13,
      range: volumeBarWidth - 13
    }
  } 
}