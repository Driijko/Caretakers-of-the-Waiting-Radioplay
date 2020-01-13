import React from 'react';

// HELPER FUNCTIONS
import combineObjects from '../../globalHelperFunctions/combineObjectsFunction'

export default function TrackTitleDisplay(props) {

  const styles = (
    combineObjects([
      props.spatialStyles,
      {
        fontFamily: "Alata"
      }
    ])
    
  );

  return (
    <div
      style={styles}>
      {props.trackTitle}
    </div>
  )
}