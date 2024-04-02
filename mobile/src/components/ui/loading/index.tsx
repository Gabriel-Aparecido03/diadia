import { ActivityIndicator, View } from "react-native";
import { styles } from "./style";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { colorSchemas } from "../../../themes/default";

export function Loading() {

  const { height } = useSafeAreaFrame()

  return (
    <View style={[styles.container, { height }]}>
      <ActivityIndicator size={36} color={colorSchemas.violet[500]}/>
    </View>
  )
}