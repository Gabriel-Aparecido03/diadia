import { View } from "react-native"
import { Checkbox, TextField } from "../ui"
import { styles } from "./styles"
import { useEffect, useState } from "react"
import { maskHourAndMinutes } from "../../utils/mask-hour-and-minutes"
import { secondsToHoursMinutes } from "../../utils/convert-to-hour-and-minutes"
import { hoursMinutesToSeconds } from "../../utils/convert-to-seconds"

interface SchedulePropsType {
  weekdayName: string
  handleToggleWeekDay(weekDayIndex: number, timeInSeconds: number): void
  checked: boolean
  weekdayIndex: number
  timeInSecondsInitial: string
  onChange: ({ index, value }: { value: number, index: number }) => void
}

export function Schedule({ handleToggleWeekDay, weekdayName, checked, weekdayIndex, timeInSecondsInitial, onChange }: SchedulePropsType) {
  const [timeInSeconds, setTimeInSeconds] = useState(timeInSecondsInitial)

  return (
    <View style={styles.containerSchedule}>
      <Checkbox
        title={weekdayName}
        checked={checked}
        onPress={() => { handleToggleWeekDay(weekdayIndex, Number(timeInSeconds)) }}
      />
      <TextField
        keyboardType="number-pad"
        style={{ width: 80 }}
        value={maskHourAndMinutes(secondsToHoursMinutes(Number(timeInSeconds)))}
        onChangeText={e => {
          setTimeInSeconds(e)
          onChange({ index: weekdayIndex, value: hoursMinutesToSeconds({ hours: Number(timeInSeconds.slice(0, 1)), minutes: Number(timeInSeconds.slice(1, 3)) }) })
        }}
      />
    </View>
  )
}