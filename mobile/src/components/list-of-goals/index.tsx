import { FlatList, TouchableOpacity, View } from "react-native"
import { toggleGoal } from "../../services/toggle-goal"
import { colorSchemas, fontSizeSchemas } from "../../themes/default"
import { Button, Checkbox, Typography } from "../ui"
import { useNavigation } from "@react-navigation/native"

interface ListOfGoalsPropsType {
  possibleGoals: never[]
  completedGoals: never[]
  refetch: () => Promise<void>
}

export function ListOfGoals({ completedGoals, possibleGoals, refetch }: ListOfGoalsPropsType) {
  const navigation = useNavigation()

  return (
    <FlatList
      data={possibleGoals}
      keyExtractor={i => i.id}
      style={{ marginTop: 72 }}
      renderItem={({ item }) =>
        <TouchableOpacity
          style={{
            flexDirection: 'row', alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 2,
            gap: 8,
            width: '100%'
          }}
        >
          <Checkbox
            onPress={async () => {
              await toggleGoal({ id: item.id })
              await refetch()
            }}
            title={item.name}
            checked={completedGoals.find(i => i.id === item.id)}
          />
          <View>
            <Button
              onPress={() => navigation.navigate('goal', { id: item.id })}
              style={{ width: '60%' }}
              variants="tertiary"
            >
              <Typography text="editar" />
            </Button>
          </View>
        </TouchableOpacity>
      }
      contentContainerStyle={{ gap: 12 }}
      ListHeaderComponentStyle={{ marginBottom: 16 }}
      ListHeaderComponent={() =>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography style={{ fontSize: fontSizeSchemas["3xl"], fontWeight: '700' }} text="Metas ativa !" />
          <View style={{ width: '20%' }}>
            <Button variants="tertiary" onPress={() => navigation.navigate('goal' as never)} >
              <Typography text="Criar" />
            </Button>
          </View>
        </View>
      }
      ListEmptyComponent={() =>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Typography style={{ marginTop : 8, color: colorSchemas.zinc[400], textAlign: 'center', width: '80%', marginHorizontal: '10%' }} text="Você não nenhuma meta cadastrada ainda ! Começe cadastrando a primeira" />
        </View>
      }
    />
  )
}