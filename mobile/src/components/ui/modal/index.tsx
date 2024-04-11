import { View } from "react-native"
import { styles } from "./styles"
import { Typography } from "../Typography"
import { Button } from "../Button"
import { TouchableOpacity } from "react-native-gesture-handler"
import { EvilIcons } from '@expo/vector-icons';
import { useSafeAreaFrame } from "react-native-safe-area-context"
import { fontSizeSchemas } from "../../../themes/default"

interface ModalPropsType {
  open?: boolean
  onClose?: () => void
  title?: string
  subtitle?: string
}


export function Modal({ onClose, open, subtitle, title }: ModalPropsType) {
  if (!open) return null

  const { height } = useSafeAreaFrame()

  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.containerModal}>
        <View style={styles.headerModal}>
          <Typography text={title} style={{ fontWeight: '700', fontSize: fontSizeSchemas["2xl"] }} />
          <TouchableOpacity onPress={onClose}>
            <EvilIcons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.contentModal}>
          <Typography text={subtitle} style={{ fontWeight: '400', fontSize: fontSizeSchemas.lg, textAlign: 'center' }} />
        </View>
      </View>
    </View>
  )
}