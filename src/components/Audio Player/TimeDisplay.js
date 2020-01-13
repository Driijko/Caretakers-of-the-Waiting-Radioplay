import React from 'react';

import timeDisplayFunction from './Audio Player Helper Functions/timeDisplayFunction';

import combineObjects from '../../globalHelperFunctions/combineObjectsFunction';

export default function TimeDisplay(props) {

  const styles = (
    combineObjects([
      props.spatialStyles,
      {
        fontSize: "22px",
        fontFamily: "Cute Font"
      }
    ])
  );

  return (
    <p 
      style={styles}
    >
      {`${timeDisplayFunction(props.currentTime)} / ${timeDisplayFunction(props.currentTrackDuration)}`}
    </p>
  )
}