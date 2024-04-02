import { FlatList, View } from "react-native";
import { BaseScreen } from "../../components/base-screen";
import { Typography, ProgressBar, Checkbox, TextField, Button } from "../../components/ui";
import { fontSizeSchemas, colorSchemas } from "../../themes/default";
import { Header } from "../../components/header";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { styles } from "./styles";
import { validateEmail } from "../../utils/validate-email";
import { validatedName } from "../../utils/validate-name";
import { updateProfile } from "../../services/update-profile";
import { deleteProfile } from "../../services/delete-profile";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export function Profile() {

  const { user, makeLogout, gettingUserInfo } = useUser()

  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [email, setEmail] = useState(user?.email ?? '')
  const [name, setName] = useState(user?.username ?? '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [emailInvalid, setEmailInvalid] = useState(false)
  const [nameInvalid, setNameInvalid] = useState(false)
  const [passwordInvalid, setPasswordInvalid] = useState(false)
  const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState(false)

  const [emailInvalidMessage, setEmailInvalidMessage] = useState('')
  const [nameInvalidMessage, setNameInvalidMessage] = useState('')
  const [passwordInvalidMessage, setPasswordInvalidMessage] = useState('')
  const [confirmPasswordInvalidMessage, setConfirmPasswordInvalidMessage] = useState('')

  function validatedFields() {

    setEmailInvalidMessage('')
    setNameInvalidMessage('')
    setPasswordInvalidMessage('')
    setConfirmPasswordInvalidMessage('')

    setEmailInvalid(false)
    setNameInvalid(false)
    setPasswordInvalid(false)
    setConfirmPasswordInvalid(false)

    if (!validateEmail(email)) {
      setEmailInvalidMessage("Email inválido");
      setEmailInvalid(true);
      return false;
    }

    if (!validatedName(name)) {
      setNameInvalidMessage("Nome inválido");
      setNameInvalid(true);
      return false;
    }

    if (password.trim().length < 4 || confirmPassword.trim().length < 4) {
      setPasswordInvalidMessage("Senha inválida");
      setPasswordInvalid(true);
      setConfirmPasswordInvalidMessage("Confirmação de senha inválida");
      setConfirmPasswordInvalid(true);
      return false;
    }

    if (password !== confirmPassword) {
      setPasswordInvalidMessage("As senhas não conferem");
      setPasswordInvalid(true);
      setConfirmPasswordInvalid(true)
      return false;
    }

    return true
  }

  async function handleProfileSave() {
    if (validatedFields()) {
      const res = await updateProfile({ email, name, password })
      await gettingUserInfo()
      if (res.status === 204) {
        Toast.show({
          type: 'success',
          text1: 'Usuário editado com sucesso',
        })
        navigation.navigate('home' as never)
      }
    }
  }

  async function handleProfileDelete() {
    const res = await deleteProfile()
    if (res.status === 204) {
      Toast.show({
        type: 'success',
        text1: 'Usuário apagado com sucesso',
      })
      navigation.navigate('login' as never)
    }
  }

  return (
    <BaseScreen header={<Header showBackButton />}>
      <Typography text="Criação de um hábito" style={{ fontSize: fontSizeSchemas["3xl"], fontWeight: '700' }} />
      <View style={{ marginTop: 12, marginBottom: 16, gap: 8 }}>
        <Typography style={{ fontWeight: '700', fontSize: fontSizeSchemas["3xl"] }} text="Perfil" />
      </View>
      <View>
        <View style={styles.profileBox}>
          <Typography text="Email" />
          <TextField
            value={email}
            onChangeText={e => setEmail(e)}
            placeholder="email@examplo.com"
            error={emailInvalid}
            errorMessage={emailInvalidMessage}
          />
        </View>
        <View style={styles.profileBox}>
          <Typography text="Nome" />
          <TextField
            value={name}
            onChangeText={e => setName(e)}
            placeholder="Exemplo"
            error={nameInvalid}
            errorMessage={nameInvalidMessage}
          />
        </View>
        <View style={styles.profileBox}>
          <Typography text="Senha" />
          <TextField
            value={password}
            onChangeText={e => setPassword(e)}
            secureTextEntry
            error={passwordInvalid}
            errorMessage={passwordInvalidMessage}
          />
        </View>
        <View style={styles.profileBox}>
          <Typography text="Confirmar senha" />
          <TextField
            value={confirmPassword}
            onChangeText={e => setConfirmPassword(e)}
            secureTextEntry
            error={confirmPasswordInvalid}
            errorMessage={confirmPasswordInvalidMessage}
          />
        </View>
        <Button onPress={handleProfileSave} style={{ marginTop: 32 }} variants="secondary" >
          <Typography text={"Salvar"} />
        </Button>

        <Button onPress={() => {
          makeLogout()
          navigation.navigate('login' as never)
        }} style={{ marginTop: 24 }} variants="tertiary" >
          <Typography text={"Sair"} />
        </Button>
        <Button onPress={handleProfileDelete} style={{ marginTop: 24 }} variants="tertiary" >
          <Typography text={"Apagar"} />
        </Button>

      </View>
    </BaseScreen>
  )
}