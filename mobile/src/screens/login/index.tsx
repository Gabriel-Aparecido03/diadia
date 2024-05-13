import { View } from "react-native";
import { styles } from "./style";

import Logo from '../../assets/logo-xl.svg';
import { Button, TextField, Typography } from "../../components/ui";
import { colorSchemas, fontSizeSchemas } from "../../themes/default";
import { BaseScreen } from "../../components/base-screen";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { validateEmail } from "../../utils/validate-email";
import { useUser } from "../../hooks/useUser";
import Toast from "react-native-toast-message";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
export function Login() {

  const navigation = useNavigation()

  const { makeLogin, user } = useUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const [isPending, setIsPending] = useState(false)

  const [emailInvalid, setEmailInvalid] = useState(false)
  const [passwordInvalid, setPasswordInvalid] = useState(false)

  const [emailInvalidMessage, setEmailInvalidMessage] = useState('')
  const [passwordInvalidMessage, setPasswordInvalidMessage] = useState('')

  function validatedFields() {

    setEmailInvalidMessage('')
    setPasswordInvalidMessage('')

    setEmailInvalid(false)
    setPasswordInvalid(false)

    if (!validateEmail(email)) {
      setEmailInvalidMessage("Email inválido");
      setEmailInvalid(true);
      return false;
    }

    if (password.trim().length === 0) {
      setPasswordInvalidMessage("Senha inválida");
      setPasswordInvalid(true);
      return false;
    }

    return true
  }

  async function handleMakeLogin() {
    setIsPending(true)
    if (validatedFields()) {
      const res = await makeLogin(email, password)
      setIsPending(false)
      if (res) {
        setEmail('')
        setPassword('')
        return navigation.navigate('home' as never)
      }
      Toast.show({
        type: 'error',
        text1: 'Email e/ou senha inválidos',
        text2: 'Valide que seja um senha/email válido, ou o email ja esteja cadastrado !',
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
      })
      setEmailInvalid(true)
      setPasswordInvalid(true)
    }
  }

  useEffect(() => {
    function redirect() {
      if (user) navigation.navigate('home' as never)
    }

    redirect()
  })

  return (
    <BaseScreen showLoading={isPending}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo />
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.loginBox}>
            <Typography text="Email" />
            <TextField
              value={email}
              onChangeText={e => setEmail(e)}
              placeholder="email@examplo.com"
              error={emailInvalid}
              errorMessage={emailInvalidMessage}
            />
          </View>
          <View style={styles.loginBox}>
            <Typography text="Senha" />
            <TextField
              value={password}
              onChangeText={e => setPassword(e)}
              secureTextEntry={!showPassword}
              error={passwordInvalid}
              errorMessage={passwordInvalidMessage}
              iconRight={showPassword ?
                <Entypo name="eye-with-line" size={24} color="white" onPress={() => setShowPassword(false)} /> :<AntDesign onPress={() => setShowPassword(true)} name="eye" size={24} color="white" /> 
              }
            />
          </View>
          <Button disabled={isPending} onPress={handleMakeLogin} variants="primary" style={{ marginTop: 12, width: '80%' }}>
            <Typography style={{ fontWeight: '800', fontSize: fontSizeSchemas.lg }} text="Acessar" />
          </Button>
          <Typography
            onPress={() => navigation.navigate("register" as never)}
            style={{
              fontWeight: '400',
              fontSize: fontSizeSchemas.lg,
              textDecorationStyle: "solid",
              textAlign: 'center',
              textDecorationLine: 'underline',
              width: '100%',
              marginTop: 20,
              color: colorSchemas.zinc[400]
            }}
            text="Se já tem uma conta ! Faça o login ."
          />
        </View>
      </View>
    </BaseScreen>
  )
}