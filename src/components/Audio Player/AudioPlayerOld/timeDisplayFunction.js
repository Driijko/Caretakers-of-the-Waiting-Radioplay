export default function timeDisplayFunction(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsOfMinute = seconds % 60;
  let lessThanTenSeconds = "";
  if (secondsOfMinute < 10) {
    lessThanTenSeconds = "0";
  }
  return `${minutes}:${lessThanTenSeconds}${secondsOfMinute}`;
}