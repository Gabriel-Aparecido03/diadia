import { Text, TextProps } from "react-native";
import { styles } from "./style";

type TypographyProps = TextProps & {
  text?: string
}

export function Typography({ text, style, ...props }: TypographyProps) {
  return (
    <Text style={[styles.baseStyle, style]} {...props}>
      {text}
    </Text>
  )
}