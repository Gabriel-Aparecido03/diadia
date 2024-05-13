import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "../ui";
import { styles } from "./styles";
import { generateProgressPercentage } from "../../utils/generate-percentage";

interface IDay {
  onClick?: () => void
  completedLength?: number
  totalHabitsLength?: number
  highlight?: boolean
  disabled?: boolean
}

export function Day({ onClick, completedLength = 0, totalHabitsLength = 0, highlight = false,disabled = false }: IDay) {
  const amountAccomplishedPercentage = totalHabitsLength > 0 ? generateProgressPercentage(totalHabitsLength, completedLength) : 0
  let style;

  switch (true) {
    case amountAccomplishedPercentage === 0:
      style = styles.percentage0
      break;
    case amountAccomplishedPercentage >= 20 && amountAccomplishedPercentage < 40:
      style = styles.percentage20
      break;
    case amountAccomplishedPercentage >= 40 && amountAccomplishedPercentage < 60:
      style = styles.percentage40
      break;
    case amountAccomplishedPercentage >= 60 && amountAccomplishedPercentage < 80:
      style = styles.percentage60
      break;
    case amountAccomplishedPercentage >= 80:
      style = styles.percentage80
      break;
  }

  return (
    <TouchableOpacity onPress={onClick} style={[styles.container, style, highlight && styles.highlight]} />
  )
}