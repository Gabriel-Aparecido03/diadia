import dayjs from "dayjs";
import { BaseScreen } from "../../components/base-screen";
import { Header } from "../../components/header";
import React, { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { Day } from "../../components/day";
import { Typography } from "../../components/ui";
import { fontSizeSchemas } from "../../themes/default";
import { styles } from "./style";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function Summary() {
  const [month, setMonth] = useState()

  const daysFromStartOfMoth = useMemo(() => {
    const startDate = dayjs().startOf('month')
    const endDate = dayjs().endOf('month')

    let dateRange = []
    let compareDate = startDate

    while (compareDate.isBefore(endDate)) {
      dateRange.push(compareDate.toDate())
      compareDate = compareDate.add(1, 'day')
    }
    return dateRange
  }, [month])

  return (
    <BaseScreen header={<Header showBackButton />}>
      <View style={styles.container}>
        <FlatList
          data={daysFromStartOfMoth}
          contentContainerStyle={{ gap: 12 }}
          columnWrapperStyle={{ gap: 16 }}
          renderItem={() => <Day />}
          numColumns={7}
          ListHeaderComponent={
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 16 }}>
              {weekDays.map(i => <Typography style={{ fontSize: fontSizeSchemas.xl, fontWeight: '600', width: 40, textAlign: 'center' }} text={i} />)}
            </View>
          }
        />
      </View>
    </BaseScreen>
  )
}