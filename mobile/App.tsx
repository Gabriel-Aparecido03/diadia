import { StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';
import { Routes } from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { UserContextProvider } from './src/context/user-context';
export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#09090A" }}>
      <UserContextProvider>
        <StatusBar
          backgroundColor={"#09090A"}
          barStyle={"light-content"}
          translucent
        />
        <Routes />
        <Toast />
      </UserContextProvider>
    </SafeAreaProvider>
  );
}