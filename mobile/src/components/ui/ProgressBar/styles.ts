// w-full h-3 rounded-xl bg-zinc-700 mt-4
// h-3 rounded-xl bg-violet-600

import { StyleSheet } from "react-native";
import { colorSchemas } from "../../../themes/default";

export const styles = StyleSheet.create({
  container : {
    width : '100%',
    borderRadius : 12,
    backgroundColor : colorSchemas.zinc[700]
  },
  progress : {
    height : 12,
    borderRadius : 12,
    backgroundColor : colorSchemas.violet[600]
  }
})