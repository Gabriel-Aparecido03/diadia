import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

import Logo from '../../assets/logo-xl.svg'
import { Button, TextField, Typography } from "../../components/ui";
import { colorSchemas, fontSizeSchemas } from "../../themes/default";
import { BaseScreen } from "../../components/base-screen";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { validatedName } from "../../utils/validate-name";
import { validateEmail } from "../../utils/validate-email";
import { registerUserAccount } from "../../services/register-account";
import Toast from "react-native-toast-message";

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export function Register() {

  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isPending, setIsPending] = useState(false)

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

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

  async function handleMakeRegister() {
    setIsPending(true)
    try {
      if (validatedFields()) {
        const res = await registerUserAccount({ email, name, password })
        setIsPending(false)
        if (res.status === 200) {
          setEmailInvalid(true)
          Toast.show({
            type: 'success',
            autoHide: true,
            text1: 'Conta Criada com Sucesso !!',
            text2: 'Agora basta fazer seu login !',
            position: 'bottom',
            visibilityTime: 2000,
          })
          return navigation.navigate('login' as never)
        }
        Toast.show({
          type: 'error',
          autoHide: true,
          text1: 'Email inválido',
          text2: 'Verique o email , se já tiver uma conta com ele , faça o login !',
          position: 'bottom',
          visibilityTime: 2000,
        })
        setEmailInvalid(true)
      }
    } catch (error) {}
  }

  return (
    <BaseScreen showLoading={isPending}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo />
        </View>
        <View style={styles.registerContainer}>
          <View style={styles.registerBox}>
            <Typography text="Email" />
            <TextField
              value={email}
              onChangeText={e => setEmail(e)}
              placeholder="email@examplo.com"
              error={emailInvalid}
              errorMessage={emailInvalidMessage}
            />
          </View>
          <View style={styles.registerBox}>
            <Typography text="Nome" />
            <TextField
              value={name}
              onChangeText={e => setName(e)}
              placeholder="Exemplo"
              error={nameInvalid}
              errorMessage={nameInvalidMessage}
            />
          </View>
          <View style={styles.registerBox}>
            <Typography text="Senha" />
            <TextField
              value={password}
              onChangeText={e => setPassword(e)}
              secureTextEntry={!passwordVisible}
              error={passwordInvalid}
              errorMessage={passwordInvalidMessage}
              iconRight={passwordVisible ?
                <AntDesign onPress={() => setPasswordVisible(false)} name="eye" size={24} color="white" /> : <Entypo name="eye-with-line" size={24} color="white" onPress={() => setPasswordVisible(true)} />
              }
            />
          </View>
          <View style={styles.registerBox}>
            <Typography text="Confirmar senha" />
            <TextField
              value={confirmPassword}
              onChangeText={e => setConfirmPassword(e)}
              secureTextEntry={!confirmPasswordVisible}
              error={confirmPasswordInvalid}
              errorMessage={confirmPasswordInvalidMessage}
              iconRight={confirmPasswordVisible ?
                <AntDesign onPress={() => setConfirmPasswordVisible(false)} name="eye" size={24} color="white" /> : <Entypo name="eye-with-line" size={24} color="white" onPress={() => setConfirmPasswordVisible(true)} />
              }
            />
          </View>
          <Button disabled={isPending} onPress={handleMakeRegister} variants="primary" style={{ marginTop: 12, width: '80%' }}>
            <Typography style={{ fontWeight: '800', fontSize: fontSizeSchemas.lg }} text="Criar" />
          </Button>
          <Typography
            onPress={() => navigation.navigate("login" as never)}
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