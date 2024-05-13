import { FlatList, Touchable, View } from "react-native";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
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
      <View style={{ marginTop: 12, marginBottom: 16, gap: 8 }}>
        <Typography style={{ fontWeight: '700', fontSize: fontSizeSchemas["3xl"] }} text="Perfil" />
      </View>
      <View>
        <View style={styles.profileBox}>
          <Typography text="Nome" style={{ fontWeight: '600', fontSize: fontSizeSchemas["xl"] }} />
          <Typography text={name} style={{ fontWeight: '500', fontSize: fontSizeSchemas.lg, color: colorSchemas.zinc[300] }} />
        </View>
        <View style={styles.profileBox}>
          <Typography text="Email" style={{ fontWeight: '600', fontSize: fontSizeSchemas["xl"] }} />
          <Typography text={email} style={{ fontWeight: '500', fontSize: fontSizeSchemas.lg, color: colorSchemas.zinc[300] }} />
        </View>
        <View>
          <Typography style={{ fontWeight: "700", fontSize: fontSizeSchemas["2xl"], marginTop: 16 }} text="General" />
          <View style={{ gap: 16, marginTop: 24 }}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('profile-edit' as never) }}
              style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 4, gap: 8 }}
            >
              <AntDesign name="infocirlceo" size={24} color="white" />
              <Typography text="Meus dados" style={{ fontWeight: '500', fontSize: fontSizeSchemas.lg, color: colorSchemas.zinc[300] }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await makeLogout()
                navigation.navigate('login')
              }}
              style={{ flexDirection: 'row',  paddingTop: 24 , justifyContent: 'flex-start', alignItems: 'center', padding: 4, gap: 8, borderTopColor: colorSchemas.zinc[400], borderWidth: 1, borderStyle: 'solid' }}>
              <Ionicons name="exit-outline" size={24} color={colorSchemas.red[500]} />
              <Typography text="Logout" style={{ color: colorSchemas.red[500], fontWeight: '500', fontSize: fontSizeSchemas.lg, }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseScreen>
  )
}