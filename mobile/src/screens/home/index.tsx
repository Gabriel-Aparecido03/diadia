import { View } from "react-native";
import { colorSchemas } from "../../themes/default";
import { Header } from "../../components/header";
import { WeekSummary } from "../../components/week-summary";
import { Button, Modal, Typography } from "../../components/ui";
import { BaseScreen } from "../../components/base-screen";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import dayjs from "dayjs";
import { gettingHabitsToday } from "../../services/getting-habits-today";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { toggleHabit } from "../../services/toggle-habit";
import { gettingGoalsToday } from "../../services/getting-goals-today";
import { ListOfHabits } from "../../components/list-of-habits";
import { ListOfGoals } from "../../components/list-of-goals";
import { toggleGoal } from "../../services/toggle-goal";
import { hintForRoutine } from "../../utils/hints-for-routine";

export function Home() {

  const isFocused = useIsFocused();
  const navigation = useNavigation()

  const [possibleHabits, setPossibleHabits] = useState([])
  const [completedHabits, setCompletedHabits] = useState([])

  const [loading, setLoading] = useState(false)

  const [possibleGoals, setPossibleGoals] = useState([])
  const [completedGoals, setCompletedGoals] = useState([])

  const [showHintModal, setShowHintModal] = useState(false)
  const [hint, setHint] = useState({})


  async function fetchHabits() {
    setLoading(true)
    const today = dayjs().startOf('day').toDate()
    const res = await gettingHabitsToday(today)
    if (res.status === 200) {
      setPossibleHabits(res.data.possibleHabits)
      setCompletedHabits(res.data.completedHabits)
    }
    setLoading(false)
  }

  async function fetchGoals() {
    setLoading(true)
    const today = dayjs().endOf('day').toDate()
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


  async function handleSuggest() {
    setHint(hintForRoutine[Math.floor(Math.random() * hintForRoutine.length)])
    setShowHintModal(true)
  }

  return (
    <BaseScreen modal={
      <Modal
        onClose={() => setShowHintModal(false)}
        open={showHintModal}
        subtitle={hint.subtitle}
        title={hint.title}
      />
    }
      header={<Header />}
      showLoading={loading}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <WeekSummary />
          <ListOfHabits
            completedHabits={completedHabits}
            possibleHabits={possibleHabits}
            refetch={fetchHabits}
            handleSuggest={handleSuggest}
          />
          <ListOfGoals
            completedGoals={completedGoals}
            possibleGoals={possibleGoals}
            refetch={fetchGoals}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button variants="tertiary" style={{ width: '50%' }}>
            <Typography style={{ color: colorSchemas.violet[400] }} text="Resumo" />
          </Button>
        </View>
      </View>
    </BaseScreen>
  )
}