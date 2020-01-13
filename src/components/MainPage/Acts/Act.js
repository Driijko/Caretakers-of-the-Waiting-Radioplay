import React, {useState} from 'react'

// Import helper functions.
import windowCenter from '../../../globalHelperFunctions/windowCenter'

export default function Act(props) {
  
  // Spatial Layout ///////////////////////////////////////////////////////////////////

  // Size
  const size = props.actSize

  // Positioning
  const top = (windowCenter("vertical", props.windowSize, size) - (props.windowSize.height / 20))
  const left = props.left

  // Color Scheme //////////////////////////////////////////////////////////////////////
  const borderColor = props.actBorderColor
  const backgroundColor = props.actBackgroundColor

  const styles = {
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${size}px`,
    border: `5px solid rgb(${borderColor}, 1)`,
    backgroundColor: `rgb(${backgroundColor}, 0.5)`,
    cursor: "pointer"
  }

  return (
    <img
      src={props.imageFilePath}
      style={styles}
      onClick={props.handleClick}
    />
  )
}