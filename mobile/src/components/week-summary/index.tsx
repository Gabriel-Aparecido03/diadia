import { View } from "react-native";
import { Typography } from "../ui";
import { Day } from "../day";
import { styles } from "./styles";
import { fontSizeSchemas } from "../../themes/default";

export function WeekSummary() {
  return (
    <View style={styles.container}>
      <View style={styles.containerDay}>
        <Typography style={{ fontSize : fontSizeSchemas.xl , fontWeight : '600'}} text="D" />
        <Day />
      </View>
      <View style={styles.containerDay}>
        <Typography style={{ fontSize : fontSizeSchemas.xl , fontWeight : '600'}} text="S" />
        <Day />
      </View>
      <View style={styles.containerDay}>
        <Typography style={{ fontSize : fontSizeSchemas.xl , fontWeight : '600'}} text="T" />
        <Day />
      </View>
      <View style={styles.containerDay}>
        <Typography style={{ fontSize : fontSizeSchemas.xl , fontWeight : '600'}} text="Q" />
        <Day />
      </View>
      <View style={styles.containerDay}>
        <Typography style={{ fontSize : fontSizeSchemas.xl , fontWeight : '600'}} text="Q" />
        <Day />
      </View>
      <View style={styles.containerDay}>
        <Typography style={{ fontSize : fontSizeSchemas.xl , fontWeight : '600'}} text="S" />
        <Day />
      </View>
      <View style={styles.containerDay}>
        <Typography style={{ fontSize : fontSizeSchemas.xl , fontWeight : '600'}} text="S" />
        <Day />
      </View>
    </View>
  )
}