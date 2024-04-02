import { View } from "react-native"
import { Checkbox, TextField } from "../ui"
import { styles } from "./styles"
import { useEffect, useState } from "react"
import { maskHourAndMinutes } from "../../utils/mask-hour-and-minutes"

interface SchedulePropsType {
  weekdayName: string
  handleToggleWeekDay(weekDayIndex: number, timeInSeconds: number): void
  checked: boolean
  weekdayIndex: number
  timeInSecondsInitial: string
  onChange: ({ index, value }: { value: string, index: number }) => void
}

export function Schedule({ handleToggleWeekDay, weekdayName, checked, weekdayIndex, timeInSecondsInitial, onChange }: SchedulePropsType) {
  const [timeInSeconds, setTimeInSeconds] = useState('')
  useEffect(() => {
    setTimeInSeconds(timeInSecondsInitial ?? '0')
  }, [])

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
        value={maskHourAndMinutes(timeInSeconds)}
        onChangeText={e => {
          setTimeInSeconds(e)
          onChange({ index : weekdayIndex , value : timeInSeconds})
        }}
      />
    </View>
  )
}