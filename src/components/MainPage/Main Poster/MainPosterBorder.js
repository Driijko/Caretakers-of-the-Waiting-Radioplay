import React from 'react'

export default function MainPosterBorderLeft(props) {

  // Border Left Image /////////////////////////////////////////////////////////////////////

  const originalSize = {
    width: 901,
    height: 2654
  }

  const sizeReductionAmount = originalSize.height / props.mainPosterHeight

  const width = originalSize.width / sizeReductionAmount

  const imageLayer = props.borderLayer

  const imageStyles = {
    position: "absolute",
    height: `${props.mainPosterHeight}px`,
    left: `${props.left}px`,
    zIndex: `${imageLayer}`
  }

  // Overlay ///////////////////////////////////////////////////////////////////////////////
  const overlayStyles = {
    position: "absolute",
    height: `${props.mainPosterHeight}px`,
    width: `${width}px`,
    left: `${props.left}px`,
    zIndex: `${imageLayer + 1}`,
    backgroundColor: `rgb(0, 0, 0, ${props.overlayTransparency}`,
  }


  return (
    <div>
      {/* <div>{`${props.sizeReductionAmount}`}</div> */}
      <img
        src={props.image}
        style={imageStyles}
      />
      <div
        style={overlayStyles}>
      </div>
    </div>
  )
}