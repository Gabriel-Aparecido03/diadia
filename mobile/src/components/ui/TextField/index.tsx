import { TextInput, TextInputProps, View } from "react-native";
import { styles } from "./style";
import { ReactNode } from "react";
import { colorSchemas } from "../../../themes/default";
import { Typography } from "../Typography";

type TextFieldProps = TextInputProps & {
  iconLeft?: ReactNode
  iconRight?: ReactNode
  error?: boolean
  errorMessage?: string
}

export function TextField({ iconLeft, style, error = false, errorMessage, iconRight, ...props }: TextFieldProps) {
  return (
    <>
      <View style={[styles.container, style, error && styles.error]}>
        {iconLeft && iconLeft}
        <TextInput
          style={[{
            width: '100%',
            paddingHorizontal: 6,
            color: colorSchemas.zinc[100],
            flex : 1,
          }]}
          placeholderTextColor={colorSchemas.zinc[400]}
          {...props}
        />
        {iconRight && iconRight}
      </View>
      {error && <Typography style={{ color: colorSchemas.red[500] }} text={errorMessage} />}
    </>
  )
}