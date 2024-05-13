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
  },
  containerModal: {
    minHeight: 140,
    backgroundColor: colorSchemas.zinc[900],
    borderRadius: 12,
    padding: 16,
    width: '90%',
    opacity: 1,
    zIndex : 9
  },
  headerModal: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent : 'space-between'
  },
  contentModal: {
    width: '90%',
    marginHorizontal: '5%',
    marginVertical : 32
  },
  actionModal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12
  }
})