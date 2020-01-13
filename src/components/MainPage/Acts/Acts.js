import React, {useState, useEffect} from 'react'

// Import Images /////////////////////////////////////////////////////////////////////////////////
import seedImage from '../../../assets/artwork/Plant Images/seed.png'
import sproutImage from '../../../assets/artwork/Plant Images/sprout.png'
import stemImage from '../../../assets/artwork/Plant Images/stem.png'
import branchImage from '../../../assets/artwork/Plant Images/branch.png'
import leafImage from '../../../assets/artwork/Plant Images/leaf.png'

// Import helper functions ///////////////////////////////////////////////////////////////////////
import windowCenter from '../../../globalHelperFunctions/windowCenter'

// Import Components /////////////////////////////////////////////////////////////////////////////
import Act from './Act'

export default function Acts(props) {

  // Current Track
  const [currentTrackNumber, setCurrentTrackNumber] = useState();

  // Act Size
  const actSize = Math.floor( (props.windowSize.height / 9) + (props.windowSize.width / 15) )

  // Act Positioning
  const actHorizontalPositions = []
  const horizontalOffsetFromCenter = Math.floor( props.windowSize.width / 6 )

  // Act Coloring
  const actBorderColorNormal = []
  const actBackgroundColorNormal = []
  const actBorderColorClicked = `255, 0, 0`
  const actBackgroundColorClicked = `0, 10, 50`
  const [actBorderColor, setActBorderColor] = useState([])
  const [actBackgroundColor, setActBackgroundColor] = useState([])

  for(let i = 0, j = -2 ; i < 5 ; i++, j++) {

    // Act Positioning
    actHorizontalPositions[i] = (
      windowCenter("horizontal", props.windowSize, actSize)
      + (horizontalOffsetFromCenter * j)
    )

    // Act Coloring
    actBorderColorNormal[i] = `${15 + (30 * i)}, 6, 0`
    actBackgroundColorNormal[i] = `0, ${8 + (4 * i)}, ${5 + (1 * i)}`

  }

  function setColorsForAllActs(clickedActNumber) {

    setActBorderColor(
      actBorderColorNormal.map(
        (normalColor, index) => {
          if (clickedActNumber === index) {
            return actBorderColorClicked
          }
          else {
            return normalColor
          }          
        }
      )
    )

    setActBackgroundColor(
      actBackgroundColorNormal.map(
        (normalColor, index) => {
          if (clickedActNumber === index) {
            return actBackgroundColorClicked
          }
          else {
            return normalColor
          }          
        }
      )
    )

  }

  // Set all acts to normal colors upon first render
  useEffect(
    () => {
      setColorsForAllActs()
    },
    []
  )

  // Change act colors depending on which gets clicked.
  function handleClick(actNumber) {
    setColorsForAllActs(actNumber)
  }


  return (
    <div>
      <Act 
        windowSize={props.windowSize}
        imageFilePath={seedImage}
        actSize={actSize}
        left={actHorizontalPositions[0]}
        actBorderColor={actBorderColor[0]}
        actBackgroundColor={actBackgroundColor[0]}
        handleClick={
          () => {
            handleClick(0);
            props.handleActClick(1);
          }
        }

      />
      
      <Act 
        windowSize={props.windowSize}
        imageFilePath={sproutImage}
        actSize={actSize}
        left={actHorizontalPositions[1]}
        actBorderColor={actBorderColor[1]}
        actBackgroundColor={actBackgroundColor[1]}
        handleClick={
          () => {
            handleClick(1);
            props.handleActClick(2)
          }
        }
      />

      <Act 
        windowSize={props.windowSize}
        imageFilePath={stemImage}
        actSize={actSize}
        left={actHorizontalPositions[2]}
        actBorderColor={actBorderColor[2]}
        actBackgroundColor={actBackgroundColor[2]}
        handleClick={
          () => {
            handleClick(2);
            props.handleActClick(3)
          }
        }
      /> 

      <Act 
        windowSize={props.windowSize}
        imageFilePath={branchImage}
        actSize={actSize}
        left={actHorizontalPositions[3]}
        actBorderColor={actBorderColor[3]}
        actBackgroundColor={actBackgroundColor[3]}
        handleClick={
          () => {
            handleClick(3);
            props.handleActClick(4)
          }
        }
      /> 

      <Act 
        windowSize={props.windowSize}
        imageFilePath={leafImage}
        actSize={actSize}
        left={actHorizontalPositions[4]}
        actBorderColor={actBorderColor[4]}
        actBackgroundColor={actBackgroundColor[4]}
        handleClick={
          () => {
            handleClick(4);
            props.handleActClick(5)
          }
        }
      />    
    </div>
  )
}