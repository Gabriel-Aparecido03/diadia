import { StyleSheet } from "react-native";
import { colorSchemas } from "../../themes/default";

export const styles = StyleSheet.create({
  container : {
    height : 40,
    borderRadius : 8,
    borderWidth : 2,
    width : 40,
    backgroundColor : colorSchemas.violet[500],
    borderColor : colorSchemas.violet[400]
  }
})