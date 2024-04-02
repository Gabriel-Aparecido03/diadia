import { StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';
import { Routes } from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#09090A" }}>
      <SafeAreaProvider style={{ backgroundColor: "#09090A" }}>
        <StatusBar
          backgroundColor={"#09090A"}
          barStyle={"light-content"}
          translucent
        />
        <Routes />
      </SafeAreaProvider>
      <Toast />
    </View>
  );
}