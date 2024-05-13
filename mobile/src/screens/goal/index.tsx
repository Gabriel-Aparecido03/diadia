import { View } from "react-native";
import { BaseScreen } from "../../components/base-screen";
import { Header } from "../../components/header";
import { Button, Checkbox, ModalConfirmation, TextField, Typography } from "../../components/ui";
import { fontSizeSchemas } from "../../themes/default";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { createGoal } from "../../services/create-goal";
import dayjs from "dayjs";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { getbyIdGoal } from "../../services/get-by-id-goal";
import { deleteGoal } from "../../services/delete-goal";
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateGoal } from "../../services/update-goal";

export function Goal({ route: { params } }) {
  const navigation = useNavigation()

  const [loading, setLoading ] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState<Date>(new Date())
  const [showModalDeadline, setShowModalDealine] = useState(false)

  const [titleInvalid, setTitleInvalid] = useState(false)
  const [descriptionInvalid, setDescriptionInvalid] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [showModal, setShowModal] = useState(false)

  async function getInfosAboutGoal() {
    setLoading(true)
    if (params?.id) {
      const { status, data } = await getbyIdGoal({ id: params.id })
      if (status === 200) {
        setIsEditing(true)
        setDescription(data.description)
        setTitle(data.name)
      }
    }
    setLoading(false)
  }

  function valitedFields() {

    setDescriptionInvalid(false)
    setTitleInvalid(false)

    if (description.trim().length === 0) {
      setDescriptionInvalid(true);
      return false;
    }
    if (title.trim().length === 0) {
      setTitleInvalid(true);
      return false;
    }
    return true
  }

  async function handleGoalAction() {
    if (valitedFields()) {
      if (params?.id) {
        const res = await updateGoal({ description, id: params.id, name: title })
        if (res.status === 204) {
          Toast.show({
            type: 'success',
            text1: 'Meta editada com sucesso',
          })
          navigation.navigate('home' as never)
        }
        return
      }
      const day = dayjs(deadline).startOf('day').toDate()
      const res = await createGoal({ day, description, name: title })
      if (res.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Meta criada com sucesso',
        })
        navigation.navigate('home' as never)
      }
    }
  }

  async function handleDeleteGoal() {
    const res = await deleteGoal({ id: params.id })
    if (res.status === 204) {
      Toast.show({
        type: 'success',
        text1: 'Meta apagada com sucesso',
      })
      navigation.navigate('home' as never)
    }
  }

  useLayoutEffect(() => {
    getInfosAboutGoal()
  }, [])

  return (
    <BaseScreen
      header={<Header showBackButton />}
      showLoading={loading}
      modal={
        <ModalConfirmation
          subtitle={isDeleting ? "Essa ação irá apagar essa meta ! Deseja continuar ?" : "Essa ação irá editar essa meta ! Deseja continuar ?"}
          title={isDeleting ? "Apagar meta" : "Editar meta"}
          open={showModal}
          onCancel={() => { setShowModal(false) }}
          onConfirm={isDeleting ? handleDeleteGoal : handleGoalAction}
          onClose={() => { setShowModal(false) }}
        />
      }
    >
      <Typography text="Criação de uma meta" style={{ fontSize: fontSizeSchemas["3xl"], fontWeight: '700' }} />
      <View style={{ marginTop: 12, marginBottom: 16 }}>
        <Typography style={{ marginBottom: 12 }} text="Qual o seu comprometimento ?" />
        <TextField
          placeholder="Exercicios,leitura,dormim bem, etc ..."
          value={title}
          onChangeText={e => setTitle(e)}
          error={titleInvalid}
          errorMessage="O título é obrigatório"
        />
      </View>
      <View style={{ marginTop: 12, marginBottom: 16 }}>
        <Typography style={{ marginBottom: 12 }} text="Detalhes do metas" />
        <TextField
          placeholder="Exercicios,leitura,dormim bem, etc ..."
          value={description}
          onChangeText={e => setDescription(e)}
          error={descriptionInvalid}
          errorMessage="A descrição é obrigatória"
          multiline
        />
      </View>
      {!isEditing && <View style={{ marginTop: 12, marginBottom: 16 }}>
        <Typography style={{ marginBottom: 12 }} text="Deadline" />
        <View style={{ width: '40%' }}>
          <Button variants="primary" onPress={() => setShowModalDealine(true)}>
            <Typography text="Selecionar deadline" />
          </Button>
        </View>
      </View>}
      <View style={{ marginTop: 24 , flex : 1, justifyContent : 'flex-end' }}>
        <Button
          onPress={async () => {
            if (!isEditing) {
              await handleGoalAction()
              return
            }
            setShowModal(true)
            setIsDeleting(false)
          }}
          style={{ marginTop: 32 }}
          variants="secondary"
        >
          <Typography text={isEditing ? "Salvar meta" : "Criar meta"} />
        </Button>
        {isEditing &&
          <Button
            onPress={() => {
              setShowModal(true)
              setIsDeleting(true)
            }}
            style={{ marginTop: 24 }}
            variants="tertiary"
          >
            <Typography text={"Apagar meta"} />
          </Button>
        }
      </View>
      {showModalDeadline &&
        <DateTimePicker
          onChange={e => {
            setShowModalDealine(false)
            setDeadline(new Date(e.nativeEvent.timestamp))
          }}
          value={deadline}
          mode="date"
        />
      }
    </BaseScreen>
  )
}