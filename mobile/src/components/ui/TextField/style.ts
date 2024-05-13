import { StyleSheet } from "react-native";
import { colorSchemas } from "../../../themes/default";

export const styles = StyleSheet.create({
  container : {
    flexDirection : 'row',
    padding : 2,
    borderWidth : 1,
    borderColor : colorSchemas.zinc[800],
    backgroundColor : colorSchemas.zinc[900],
    minHeight : 52,
    borderRadius : 8,
    width : '100%',
    alignItems : 'center',
    paddingHorizontal : 6
  },
  error : {
    borderColor : colorSchemas.red[500]
  }
})