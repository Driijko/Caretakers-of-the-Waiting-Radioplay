import React from 'react';

import combineObjects from '../../globalHelperFunctions/combineObjectsFunction';

// This component simply provides a border for the audio player.
export default function Container(props) {

  const styles = (
    combineObjects([
      props.spatialLayoutStyles,
      {
        border: "2px solid aquamarine",
        backgroundColor: "rgb(0, 0, 0, 0.5)",
        zIndex: "-2"
      }
    ])
  )


  return (
    <div
      style={styles}>
    </div>
  )
}