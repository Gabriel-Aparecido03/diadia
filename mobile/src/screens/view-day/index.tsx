import { FlatList, View } from "react-native";
import { BaseScreen } from "../../components/base-screen";
import { Header } from "../../components/header";
import { Checkbox, ProgressBar, TextField, Typography } from "../../components/ui";
import { colorSchemas, fontSizeSchemas } from "../../themes/default";
import { gettingHabitsToday } from "../../services/getting-habits-today";
import dayjs from "dayjs";
import { gettingGoalsToday } from "../../services/getting-goals-today";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ListOfHabits } from "../../components/list-of-habits";
import { ListOfGoals } from "../../components/list-of-goals";
import { generateProgressPercentage } from "../../utils/generate-percentage";

const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function ViewDay({ route }) {

  const selectedDate = dayjs(route.params.date)
  const isFocused = useIsFocused();

  const navigation = useNavigation()

  const [possibleHabits, setPossibleHabits] = useState([])
  const [completedHabits, setCompletedHabits] = useState([])

  const [loading, setLoading] = useState(false)

  const [possibleGoals, setPossibleGoals] = useState([])
  const [completedGoals, setCompletedGoals] = useState([])

  async function fetchHabits() {
    setLoading(true)
    const today = selectedDate.startOf('day').toDate()
    const res = await gettingHabitsToday(today)
    if (res.status === 200) {
      setPossibleHabits(res.data.possibleHabits)
      setCompletedHabits(res.data.completedHabits)
    }
    setLoading(false)
  }

  async function fetchGoals() {
    setLoading(true)
    const today = selectedDate.endOf('day').toDate()
    const res = await gettingGoalsToday(today)
    if (res.status === 200) {
      setPossibleGoals(res.data.possibleGoals)
      setCompletedGoals(res.data.completedGoals)
    }
    setLoading(false)
  }

  useEffect(() => {
    Promise.all([fetchGoals(), fetchHabits()])
  }, [isFocused])

  return (
    <BaseScreen header={<Header showBackButton />} showLoading={loading}>
      <View style={{ marginTop: 12, marginBottom: 16, gap: 8 }}>
        <Typography style={{ color: colorSchemas.zinc[400], fontSize: fontSizeSchemas.xl }} text={weekDays[selectedDate.get('day')]} />
        <Typography style={{ fontWeight: '700', fontSize: fontSizeSchemas["3xl"] }} text={`${selectedDate.get('date')}/${selectedDate.get('month') + 1}`} />
        <ProgressBar progress={generateProgressPercentage(possibleHabits.length, completedHabits.length)} />
      </View>
      <View>
        <ListOfHabits
          disabledToogle
          completedHabits={completedHabits}
          possibleHabits={possibleHabits}
          text="Habitos"
        />
        <ListOfGoals
          disabledToogle
          completedGoals={completedGoals}
          possibleGoals={possibleGoals}
          text="Metas"
        />
      </View>
    </BaseScreen>
  )
}