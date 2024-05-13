interface hoursMinutesToSecondsType {
  hours: number
  minutes: number
}

export function hoursMinutesToSeconds({ hours, minutes }: hoursMinutesToSecondsType) {
  return hours * 3600 + minutes * 60;
}