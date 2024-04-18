import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 96,
    padding: 16,
    backgroundColor: 'transparent',
    zIndex : 1,
  },
  containerWithLogo: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection : 'row'
  },
  containerWithBack: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '20%',
    flexDirection : 'row'
  },
})