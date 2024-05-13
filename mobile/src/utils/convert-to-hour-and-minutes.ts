export function secondsToHoursMinutes(totalSeconds: number) {
  let hours = Math.floor(totalSeconds / 3600).toString();
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let formattedMinutes = minutes < 10 ? minutes.toString() : `0${minutes}`
  console.log(minutes)
  return `${hours}${formattedMinutes}`;
}
