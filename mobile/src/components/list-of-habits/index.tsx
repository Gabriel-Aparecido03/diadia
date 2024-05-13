import { FlatList, TouchableOpacity, View } from "react-native"
import { toggleHabit } from "../../services/toggle-habit"
import { colorSchemas, fontSizeSchemas } from "../../themes/default"
import { Button, Checkbox, Typography } from "../ui"
import { useNavigation } from "@react-navigation/native"
import { AntDesign } from '@expo/vector-icons'

interface ListOfHabitsPropsType {
  possibleHabits: never[]
  completedHabits: never[]
  refetch?: () => Promise<void>
  disabledToogle?: boolean
  text?: string
  canEdit?: boolean
  canAdd?: boolean
}

export function ListOfHabits({ completedHabits, possibleHabits, refetch, disabledToogle = false, text, canAdd = false, canEdit = false }: ListOfHabitsPropsType) {
  const navigation = useNavigation()
  return (
    <FlatList
      data={possibleHabits}
      keyExtractor={i => i.id}
      style={{ marginTop: 72, width: '100%' }}
      renderItem={({ item }) =>
        <View
          style={{
            flexDirection: 'row', alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: 2,
            gap: 8,
            width: '100%'
          }}
        >
          <Checkbox
            disabled={disabledToogle}
            onPress={
              async () => {
                await toggleHabit({ id: item.id })
                if (refetch) {
                  await refetch()
                }
              }
            }
            checked={completedHabits.find(i => i.id === item.id)}
          />
          <TouchableOpacity
            onPress={() => {
              if (canEdit) navigation.navigate('habit', { id: item.id })
            }}
            style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}
          >
            <Typography text={item.name} style={{ fontSize: fontSizeSchemas.lg, fontWeight: '600' }} />
          </TouchableOpacity>
        </View>
      }
      contentContainerStyle={{ gap: 12 }}
      ListHeaderComponentStyle={{ marginBottom: 16 }}
      ListHeaderComponent={() =>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography style={{ fontSize: fontSizeSchemas["3xl"], fontWeight: '700' }} text={text} />
          {canAdd && <View style={{ width: '16%', flexDirection: "row", gap: 12 }}>
            <Button style={{ width: "100%" }} variants="primary" onPress={() => navigation.navigate('habit' as never)} >
              <AntDesign name="plus" size={20} color={colorSchemas.white[500]} />
            </Button>
          </View>}
        </View>
      }
      ListEmptyComponent={() =>
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 24, flex: 1 }}>
          <Typography style={{ marginTop: 8, color: colorSchemas.zinc[400], textAlign: 'center', width: '80%', marginHorizontal: '10%' }} text="Você não nenhuma meta cadastrada ainda ! Começe cadastrando a primeira" />
          {canAdd && <Button style={{ width: '60%' }} variants="primary" onPress={() => navigation.navigate('habit' as never)} >
            <Typography text="Adicionar" />
          </Button>}
        </View>
      }
    />
  )
}