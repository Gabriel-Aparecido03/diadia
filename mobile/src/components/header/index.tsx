import { View } from "react-native"

import Logo from '../../assets/logo.svg'
import { Button, Typography } from "../ui"
import { styles } from "./style"
import { colorSchemas } from "../../themes/default"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons';

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
          <Button style={{ width : '20%'}} onPress={() => { navigation.navigate('profile' as never) }} variants="tertiary">
            <Ionicons name="person" size={20} color={colorSchemas.violet[500]} />
          </Button>
        </View>
      }
      {showBackButton &&
        <View style={styles.containerWithBack}>
          <Button style={{ width : '80%'}} onPress={() => { navigation.goBack() }} variants="tertiary">
            <Ionicons name="return-up-back-outline" size={24} color={colorSchemas.violet[500]} />
          </Button>
        </View>
      }
    </View>
  )
}