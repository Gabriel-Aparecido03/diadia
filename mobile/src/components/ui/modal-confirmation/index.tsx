import { View } from "react-native"
import { styles } from "./styles"
import { Typography } from "../Typography"
import { Button } from "../Button"
import { TouchableOpacity } from "react-native-gesture-handler"
import { EvilIcons } from '@expo/vector-icons';
import { useSafeAreaFrame } from "react-native-safe-area-context"
import { fontSizeSchemas } from "../../../themes/default"

interface ModalConfirmationPropsType {
  open?: boolean
  onClose?: () => void
  title?: string
  subtitle?: string
  onConfirm?: () => void
  onCancel?: () => void
}


export function ModalConfirmation({ onCancel, onClose, onConfirm, open, subtitle, title }: ModalConfirmationPropsType) {
  if (!open) return null

  const { height } = useSafeAreaFrame()

  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.containerModal}>
        <View style={styles.headerModal}>
          <Typography text={title} style={{ fontWeight : '700' , fontSize : fontSizeSchemas["2xl"]}} />
          <TouchableOpacity onPress={onClose}>
            <EvilIcons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.contentModal}>
          <Typography text={subtitle} style={{ fontWeight : '400' , fontSize : fontSizeSchemas.xl , textAlign : 'center'}} />
        </View>
        <View style={styles.actionModal}>
          <Button variants="tertiary" onPress={onCancel} style={{ width : '48%'}}>
            <Typography text="Não" />
          </Button>
          <Button variants="primary" onPress={onConfirm} style={{ width : '48%'}}>
            <Typography text="Sim" />
          </Button>
        </View>
      </View>
    </View>
  )
}