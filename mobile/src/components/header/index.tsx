import { View } from "react-native"

import Logo from '../../assets/logo.svg'
import { Button, Typography } from "../ui"
import { styles } from "./style"
import { colorSchemas } from "../../themes/default"
import { useNavigation } from "@react-navigation/native"

interface HeaderPpropsType {
  showBackButton?: boolean
}

export function Header({ showBackButton }: HeaderPpropsType) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {
        !showBackButton && <View style={styles.containerWithLogo}>
          <Logo />
          <View style={{ width: '30%', flexDirection : 'row', gap : 16 }}>
            <Button onPress={() => { navigation.navigate('profile' as never) }} variants="primary">
              <Typography style={{ fontWeight: '700' }} text="Perfil" />
            </Button>
          </View>
        </View>
      }
      {showBackButton &&
        <View style={styles.containerWithBack}>
          <Button onPress={() => { navigation.goBack() }} variants="tertiary">
            <Typography text="Voltar" />
          </Button>
        </View>
      }
    </View>
  )
}