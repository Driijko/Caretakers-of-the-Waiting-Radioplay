export default function windowCenter(axis, windowSize, elementSize) {
  if (axis === "vertical") {
    return (windowSize.height / 2) - (elementSize / 2)
  }
  else if (axis === "horizontal") {
    return (windowSize.width / 2) - (elementSize / 2)
  }
}