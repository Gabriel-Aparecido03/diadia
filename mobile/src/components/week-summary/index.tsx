import { View } from "react-native";
import { Typography } from "../ui";
import { Day } from "../day";
import { styles } from "./styles";
import { fontSizeSchemas } from "../../themes/default";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { fetchSummaryMonth } from "../../services/fetch-summary-month";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

interface WeekSummaryParamsType {
  habitsWeek: never[]
}

export function WeekSummary({ habitsWeek }: WeekSummaryParamsType) {


  const navigate = useNavigation()

  const startDate = dayjs().startOf('week')
  const endDate = dayjs().endOf('week')

  const actuallyDay = new Date().getDay()

  const daysFromStartOfWeek = useMemo(() => {

    let dateRange = []
    let compareDate = startDate

    while (compareDate.isBefore(endDate)) {
      dateRange.push(compareDate.toDate())
      compareDate = compareDate.add(1, 'day')
    }
    return dateRange
  }, [])

  function handleNavigate(date: string) {
    navigate.navigate('view-day', { date })
  }

  return (
    <View style={styles.container}>
      {
        habitsWeek && daysFromStartOfWeek.map((item, index) => {
          const items = habitsWeek[index - 1] ?? { completedHabits: [], possibleHabits: [] }
          return (
            <View key={item.toISOString()} style={styles.containerDay}>
              <Typography style={{ fontSize: fontSizeSchemas.xl, fontWeight: '600' }} text={weekDays[index]} />
              <Day
                completedLength={items.completedHabits.length}
                totalHabitsLength={items.possibleHabits.length}
                onClick={() => { handleNavigate(item.toUTCString()) }}
                highlight={actuallyDay == item.getDay()}
              />
            </View>

          )
        })
      }
    </View>
  )
}