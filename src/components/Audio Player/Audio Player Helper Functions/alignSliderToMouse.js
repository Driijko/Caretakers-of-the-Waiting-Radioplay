// This function helps position a slider horizontally with the horizontal position of the mouse,
// if the mouse's horizontal position is within an appropriate range.
// The 'positions' parameter should take an object with at least the two keys
// 'initialLeft' and 'maxLeft'.
export default function alignSliderToMouse(event, positions) {
  const mouseHpos = event.clientX;
  const minLeft = positions.minLeft;
  const maxLeft = positions.maxLeft;
  const sliderWidth = positions.width;
  if(mouseHpos - (sliderWidth/2) < minLeft) {
    return 0;
  }
  else if (mouseHpos + (sliderWidth/2) > maxLeft) {
    return (maxLeft - sliderWidth) - minLeft;
  } 
  else {
    return (mouseHpos - (sliderWidth/2)) - minLeft;
  }
} 