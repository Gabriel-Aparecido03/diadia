import { FlatList, TouchableOpacity, View } from "react-native"
import { toggleHabit } from "../../services/toggle-habit"
import { colorSchemas, fontSizeSchemas } from "../../themes/default"
import { Button, Checkbox, Modal, Typography } from "../ui"
import { useNavigation } from "@react-navigation/native"
import { FontAwesome6 } from '@expo/vector-icons'
import { generatePromptHabit } from "../../utils/generate-prompt-habit"
import { openAiPost } from "../../services/openai"
import { useState } from "react"

import { hintForRoutine } from "../../utils/hints-for-routine"

interface ListOfHabitsPropsType {
  possibleHabits: never[]
  completedHabits: never[]
  refetch: () => Promise<void>
  handleSuggest: () => void
}

export function ListOfHabits({ completedHabits, possibleHabits, refetch,handleSuggest }: ListOfHabitsPropsType) {
  const navigation = useNavigation()
  return (
    <>
    
    <FlatList
      data={possibleHabits}
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
            onPress={
              async () => {
                await toggleHabit({ id: item.id })
                await refetch()
              }}
            title={item.name}
            checked={completedHabits.find(i => i.id === item.id)}
          />
          <View>
            <Button
              onPress={() => navigation.navigate('habit', { id: item.id })}
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
          <Typography style={{ fontSize: fontSizeSchemas["3xl"], fontWeight: '700' }} text="Hábito para hoje" />
          <View style={{ width: '40%', flexDirection: "row", gap: 12 }}>
            <Button variants="primary" onPress={handleSuggest}>
              <FontAwesome6
                name="robot"
                style={{ color: colorSchemas.white[500] }}
              />
            </Button>
            <Button style={{ width: "100%" }} variants="tertiary" onPress={() => navigation.navigate('habit' as never)} >
              <Typography text="Criar" />
            </Button>
          </View>
        </View>
      }
      ListEmptyComponent={() =>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Typography style={{ marginTop: 8, color: colorSchemas.zinc[400], textAlign: 'center', width: '80%', marginHorizontal: '10%' }} text="Você não nenhum hábito cadastrado ainda ! Começe cadastrando o primeiro" />
        </View>
      }
    />
    </>
  )
}