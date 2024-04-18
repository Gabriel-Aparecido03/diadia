import { Linking, View } from "react-native";
import { BaseScreen } from "../../components/base-screen";
import { Header } from "../../components/header";
import { Button, ModalConfirmation, TextField, Typography } from "../../components/ui";
import { fontSizeSchemas } from "../../themes/default";
import { styles } from "./styles";
import { useLayoutEffect, useState } from "react";
import { createHabit } from "../../services/create-habit";
import dayjs from "dayjs";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { getbyIdHabit } from "../../services/get-by-id-habit";
import { deleteHabit } from "../../services/delete-habit";
import { Weekday } from "../../types/weekday";
import { Schedule } from "../../components/schedule";
import { updateHabit } from "../../services/update-habit";
import { SaveAtGoogleCalendar } from "../../components/save-at-google-calendar";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function Habit({ route: { params } }) {
  const navigation = useNavigation()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [weekdays, setWeekdays] = useState([] as Weekday[]);

  const [titleInvalid, setTitleInvalid] = useState(false)
  const [descriptionInvalid, setDescriptionInvalid] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [showModal, setShowModal] = useState(false)

  function handleToggleWeekDay(weekDayIndex: number, timeInSeconds: number) {
    if (weekdays.find(i => i.weekday === weekDayIndex)) {
      setWeekdays(prevState => prevState.filter(i => i.weekday !== weekDayIndex))
    } else {
      setWeekdays(prevState => [...prevState, { timeInSeconds: Number(timeInSeconds ?? 0), weekday: weekDayIndex }])
    }
  }

  function handleChangeTime({ index, value }: { value: number, index: number }) {
    if (weekdays.find(i => i.weekday === index)) {
      const copy = weekdays.map(i => {
        if (i.weekday === index) {
          i.timeInSeconds = value
        }
        return i
      })
      setWeekdays(copy)
    }
  }

  async function getInfosAboutHabit() {
    setIsLoading(true)
    if (params?.id) {
      const { status, data } = await getbyIdHabit({ id: params.id })
      if (status === 200) {
        setIsEditing(true)
        setDescription(data.description)
        setTitle(data.name)
        setWeekdays(data.weekdays)
      }
    }
    setIsLoading(false)
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

  async function handleHabitAction() {
    if (valitedFields()) {
      if (params?.id) {
        const res = await updateHabit({ id: params.id, description, name: title, weekday: weekdays })
        if (res.status === 204) {
          Toast.show({
            type: 'success',
            text1: 'Hábito editado com sucesso',
          })
          navigation.navigate('home' as never)
        }
        return;
      }
      const day = dayjs().startOf('day').toDate()
      const res = await createHabit({ day, description, name: title, weekday: weekdays })
      if (res.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Hábito criado com sucesso',
        })
        navigation.navigate('home' as never)
      }
    }
  }

  async function handleDeleteHabit() {
    const res = await deleteHabit({ id: params.id })
    if (res.status === 204) {
      Toast.show({
        type: 'success',
        text1: 'Hábito apagado com sucesso',
      })
      navigation.navigate('home' as never)
    }
  }

  function saveAtGoogleCalendar() {
    Linking.openURL(`https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&details=${description}&dates=20241231T170000&recur=RRULE:FREQ=WEEKLY;BYDAY=${weekdays.map(i => String(i.weekday),)};BYHOUR=${weekdays.map(i => String(i.timeInSeconds).slice(0, 1),)};BYMINUTE=0

    `)
  }

  useLayoutEffect(() => {
    getInfosAboutHabit()
  }, [])


  return (
    <BaseScreen
      header={<Header showBackButton />}
      modal={
        <ModalConfirmation
          subtitle={isDeleting ? "Essa ação irá apagar esse hábito ! Deseja continuar ?" : "Essa ação irá editar esse hábito ! Deseja continuar ?"}
          title={isDeleting ? "Apagar hábito" : "Editar hábito"}
          open={showModal}
          onCancel={() => { setShowModal(false) }}
          onConfirm={isDeleting ? handleDeleteHabit : handleHabitAction}
          onClose={() => { setShowModal(false) }}
        />
      }
      showLoading={isLoading}
    >
      {!isLoading && <>
        <Typography text="Criação de um hábito" style={{ fontSize: fontSizeSchemas["3xl"], fontWeight: '700' }} />
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
          <Typography style={{ marginBottom: 12 }} text="Detalhes do hábitos" />
          <TextField
            placeholder="Exercicios,leitura,dormim bem, etc ..."
            value={description}
            onChangeText={e => setDescription(e)}
            error={descriptionInvalid}
            errorMessage="A descrição é obrigatória"
            multiline
          />
        </View>
        <View>
          <View style={styles.containerSchedule}>
            <Typography text="Dia da semana" />
            <Typography text="Horário" />
          </View>
          <View style={styles.containerListOfDays} >
            {availableWeekDays.map((i, x) =>
              <Schedule
                key={x}
                checked={weekdays.some(aux => aux.weekday === x)}
                handleToggleWeekDay={handleToggleWeekDay}
                weekdayIndex={x}
                weekdayName={i}
                timeInSecondsInitial={String(weekdays[x]?.timeInSeconds ?? '')}
                onChange={handleChangeTime}
              />
            )}
          </View>
          <SaveAtGoogleCalendar onClickToSave={saveAtGoogleCalendar} />
          <Button onPress={async () => {
            if (!isEditing) {
              await handleHabitAction()
              return;
            }
            setShowModal(true)
            setIsDeleting(false)
          }}
            style={{ marginTop: 32 }} variants="secondary" >
            <Typography text={isEditing ? "Salvar hábito" : "Criar hábito"} />
          </Button>
          {isEditing &&
            <Button onPress={() => {
              setShowModal(true)
              setIsDeleting(true)
            }}
              style={{ marginTop: 24 }} variants="tertiary" >
              <Typography text={"Apagar hábito"} />
            </Button>
          }
        </View>
      </>}
    </BaseScreen>
  )
}