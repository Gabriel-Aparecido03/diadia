import { StyleSheet } from "react-native";
import { colorSchemas, fontSizeSchemas } from "../../../themes/default";

export const styles = StyleSheet.create({
  baseStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
    minHeight: 52,
    borderRadius: 8,
    alignItems : 'center',
    borderWidth : 1,
    borderStyle : "solid"
  },
  primary : {
    backgroundColor: colorSchemas.violet[500],
    borderColor: colorSchemas.violet[500],
  },
  secondary : {
    backgroundColor : colorSchemas.green[500],
    borderColor: colorSchemas.green[500],
  },
  tertiary : {
    backgroundColor : 'transparent',
    borderColor: colorSchemas.violet[500],
  },
  error : {
    backgroundColor : colorSchemas.red[500],
    borderColor: colorSchemas.red[500],
  }
})