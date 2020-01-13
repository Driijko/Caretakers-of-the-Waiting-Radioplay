import React from 'react';

// HELPER FUNCTIONS
import combineObjects from '../../globalHelperFunctions/combineObjectsFunction'
import windowCenter from '../../globalHelperFunctions/windowCenter'

export default function AudioPrompt(props) {

  // COLOR SCHEME //////////////////////////////////////////////////////////////////
  const color1 = "aquamarine"

  // MAIN BOX-----------------------------------------------------------

  // WIDTH
  let mainBoxWidth = 400;

  if (props.windowSize.width < 450) {
    mainBoxWidth = props.windowSize.width - 50
  }

  // HEIGHT
  const mainBoxHeight = 200

  // FONT SIZE
  let fontSize = 17

  if (props.windowSize.width < 350) {
    fontSize = 11
  }
  else if (props.windowSize.width < 400) {
    fontSize = 13
  }
  else if (props.windowSize.width < 500) {
    fontSize = 15
  }

  // OFFSET FROM TOP
  const offsetFromTop = props.windowSize.height / 10

  // STYLING
  const mainBoxStyles = {
    width: `${mainBoxWidth}px`,
    height: `${mainBoxHeight}px`,
    border: `5px solid ${color1}`,
    position: "absolute",
    left: `${(props.windowSize.width / 2) - (mainBoxWidth / 2)}px`,
    top: `${offsetFromTop}px`,
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "100px",
    fontSize: `${fontSize}px`,
  }

  // BUTTONS -------------------------------------------------------------

  const buttonOffsetFromMiddle = mainBoxWidth / 4
  const buttonWidth = mainBoxWidth / 4
  const buttonHorizontalCenter = windowCenter("horizontal", props.windowSize, buttonWidth);

  // STYLING
  const buttonStyles = {
    position: "absolute",
    height: "30px",
    width: `${buttonWidth}px`,
    top: `${offsetFromTop + (mainBoxHeight / 2) + (mainBoxHeight / 10)}px`,
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "30px",
    fontSize: `${fontSize}px`,
    border: `5px solid ${color1}`,
    cursor: "pointer"
  }

  const yesButtonStyles = (
    combineObjects([
      buttonStyles,
      {
        left: `${buttonHorizontalCenter - buttonOffsetFromMiddle}px`
      }
    ])
  )

  const noButtonStyles = (
    combineObjects([
      buttonStyles,
      {
        left: `${buttonHorizontalCenter + buttonOffsetFromMiddle}px`
      }
    ])
  )

  // RENDERING -------------------------------------------------------------------------------
  return (
    <div>
      <div
        style={mainBoxStyles}>
        WOULD YOU LIKE TO ENABLE AUDIO?
      </div>
      <div
        style={yesButtonStyles}
        onClick={props.handleYesButtonClick}>
        YES
      </div>
      <div
        style={noButtonStyles}
        onClick={props.handleNoButtonClick}>
        NO
      </div>
    </div>   
  )


}