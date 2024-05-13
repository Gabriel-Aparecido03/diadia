import { StyleSheet } from "react-native";
import { colorSchemas } from "../../themes/default";

export const styles = StyleSheet.create({
  container : {
    height : 40,
    borderRadius : 8,
    borderWidth : 2,
    width : 40,
  },
  percentage0 : {
    backgroundColor : colorSchemas.zinc[900],
    borderColor : colorSchemas.zinc[800]
  },
  percentage20 : {
    backgroundColor : colorSchemas.violet[900],
    borderColor : colorSchemas.violet[700]
  },
  percentage40 : {
    backgroundColor : colorSchemas.violet[800],
    borderColor : colorSchemas.violet[600]
  },
  percentage60 : {
    backgroundColor : colorSchemas.violet[700],
    borderColor : colorSchemas.violet[500]
  },
  percentage80 : {
    backgroundColor : colorSchemas.violet[600],
    borderColor : colorSchemas.violet[400]
  },
  percentage100 : {
    backgroundColor : colorSchemas.violet[500],
    borderColor : colorSchemas.violet[400]
  },
  highlight : {
    borderColor : colorSchemas.green[500]
  }
})