import { FlatList, View } from "react-native";
import { BaseScreen } from "../../components/base-screen";
import { Header } from "../../components/header";
import { Checkbox, ProgressBar, TextField, Typography } from "../../components/ui";
import { colorSchemas, fontSizeSchemas } from "../../themes/default";

export function ViewDay() {
  return (
    <BaseScreen header={<Header showBackButton />}>
      <Typography text="Criação de um hábito" style={{ fontSize: fontSizeSchemas["3xl"], fontWeight: '700' }} />
      <View style={{ marginTop: 12, marginBottom: 16, gap: 8 }}>
        <Typography style={{ color: colorSchemas.zinc[400], fontSize: fontSizeSchemas.xl }} text="Segunda-feira" />
        <Typography style={{ fontWeight: '700', fontSize: fontSizeSchemas["3xl"] }} text="03/01" />
        <ProgressBar progress={50} />
      </View>
      <View>
        <FlatList
          data={['']}
          renderItem={() =>
            <Checkbox title="Lorem" />
          }
        />
      </View>
    </BaseScreen>
  )
}