import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { styles } from "./styles";

interface Props {
  progress?: number;
}

export function ProgressBar({ progress = 0 }: Props) {
  const sharedProgress = useSharedValue(progress);
  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(progress)
  }, [progress])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[style,styles.progress]}
      />
    </View>
  )
}