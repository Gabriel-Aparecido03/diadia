import { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./style";
import { Loading, ModalConfirmation } from "../ui";

interface BaseScreenPropsType {
  header?: ReactNode
  children?: ReactNode
  modal?: ReactNode
  showLoading?: boolean
}

export function BaseScreen({ children, header, modal, showLoading = false }: BaseScreenPropsType) {

  const { bottom, top } = useSafeAreaInsets()

  return (
    <>
      <View style={[styles.container, { paddingTop: top + 15, paddingBottom: bottom + 90 }]}>
        {header}
        <View style={{ flex: 1 }}>
          {children}
        </View>
      </View>
      {modal && modal}
      {showLoading && <Loading />}
    </>
  )
}