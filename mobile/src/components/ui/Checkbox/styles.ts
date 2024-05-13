import { StyleSheet } from "react-native";
import { colorSchemas } from "../../../themes/default";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 2,
    gap : 8,
    zIndex : 9
  },
  containerCheckbox: {
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    width: 40,
    backgroundColor: colorSchemas.zinc[500],
    borderColor: colorSchemas.zinc[400]
  },
  animatedContainer: {
    height: 40,
    width: 40,
    backgroundColor: colorSchemas.green[500],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyCheckbox: {
    height: 40,
    width: 40,
    backgroundColor: colorSchemas.zinc[900],
    borderRadius: 8,
  }
})