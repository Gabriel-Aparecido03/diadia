import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./style";
import { ReactNode } from "react";

type ButtonProps = TouchableOpacityProps & {
  children?: ReactNode,
  variants?: 'primary' | 'secondary' | 'tertiary'
}

export function Button({ children, variants = "primary", style, ...props }: ButtonProps) {

  let variantStyle;

  switch (variants) {
    case "secondary":
      variantStyle = styles.secondary
      break;
    case "tertiary":
      variantStyle = styles.tertiary
      break;
    default:
      variantStyle = styles.primary;
  }

  return (
    <TouchableOpacity style={[variantStyle, styles.baseStyle, style]} {...props}>
      {children}
    </TouchableOpacity>
  )
}