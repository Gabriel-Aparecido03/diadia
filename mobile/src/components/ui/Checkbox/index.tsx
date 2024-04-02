import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { colorSchemas, fontSizeSchemas } from "../../../themes/default";
import { styles } from "./styles";
import { Typography } from "../Typography";

interface Props extends TouchableOpacityProps {
  title?: string;
  checked?: boolean;
}

export function Checkbox({ title, checked = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      {...rest}
    >
      {checked
        ?
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          style={styles.animatedContainer}
        >
          <Feather
            name="check"
            size={20}
            color={colorSchemas.white[500]}
          />
        </Animated.View>
        :
        <View style={styles.emptyCheckbox} />
      }

      <Typography text={title}  style={{ fontSize : fontSizeSchemas.lg , fontWeight : '600' }} />
    </TouchableOpacity>
  )
}