import { StyleSheet } from "react-native";
import { colorSchemas } from "../../../themes/default";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: colorSchemas.black[500],
    opacity: 0.9,
  }
})