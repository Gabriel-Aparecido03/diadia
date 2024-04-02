import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { AppRoutes } from "./app.routes";
import { colorSchemas } from "../themes/default";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { UserContextProvider } from "../context/user-context";

export function Routes() {

  const { top, bottom } = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, marginTop: top, paddingHorizontal: '5%', backgroundColor: "#09090A" }}>
      <NavigationContainer>
        <UserContextProvider>
          <AppRoutes />
        </UserContextProvider>
      </NavigationContainer>
    </View>
  )
}