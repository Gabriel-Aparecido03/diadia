import dayjs from "dayjs";
import { BaseScreen } from "../../components/base-screen";
import { Header } from "../../components/header";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { Day } from "../../components/day";
import { Typography } from "../../components/ui";
import { fontSizeSchemas } from "../../themes/default";
import { styles } from "./style";
import { fetchSummaryMonth } from "../../services/fetch-summary-month";
import { useNavigation } from "@react-navigation/native";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function Summary() {
  const [month, setMonth] = useState()
  const [allHabitsFromMonth, setAllHabitsFromMonth] = useState()
  const [loading, setLoading] = useState(false)
  const [jumpsOfWeek, setJumpsOfWeek] = useState(0)

  const navigation = useNavigation()

  const today = new Date()
  const actuallyDay = today.getDate()


  const daysFromStartOfMoth = useMemo(() => {
    const startDate = dayjs().startOf('month')
    const endDate = dayjs().endOf('month')
    let jumps = startDate.toDate().getDay()
    setJumpsOfWeek(startDate.toDate().getDay())
    let dateRange = []

    if (jumps > 0) {
      dateRange = [...Array.from({ length: jumps })] as any[]
    }
    let compareDate = startDate

    while (compareDate.isBefore(endDate)) {
      dateRange.push(compareDate.toDate())
      compareDate = compareDate.add(1, 'day')
    }
    return dateRange
  }, [navigation])

  async function handleGetsummary() {
    setLoading(true)
    const res = await fetchSummaryMonth(new Date())
    if (res.status === 200) {
      setAllHabitsFromMonth(res.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    handleGetsummary()
  }, [])

  return (
    <BaseScreen header={<Header showBackButton />} showLoading={loading}>
      {!loading && allHabitsFromMonth && <View style={styles.container}>
        <FlatList
          data={daysFromStartOfMoth}
          contentContainerStyle={{ gap: 12 }}
          columnWrapperStyle={{ gap: 16 }}
          renderItem={({ index, item }) => {
            if (item === undefined) return <Day />
            const items = allHabitsFromMonth[index - jumpsOfWeek] ?? { completedHabits: [], possibleHabits: [] }
            return <Day
              onClick={() => navigation.navigate('view-day', { date: items.date })}
              completedLength={items.completedHabits.length}
              totalHabitsLength={items.possibleHabits.length}
              highlight={actuallyDay === index - jumpsOfWeek + 1}
              disabled={index <= jumpsOfWeek}
            />
          }
          }
          keyExtractor={(i) => {
            return i
          }}
          numColumns={7}
          ListHeaderComponent={
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 16 }}>
              {weekDays.map((i, x) => <Typography key={x} style={{ fontSize: fontSizeSchemas.xl, fontWeight: '600', width: 40, textAlign: 'center' }} text={i} />)}
            </View>
          }
        />
      </View>}
    </BaseScreen>
  )
}