import { Stack } from "expo-router";
import './globals.css'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

export default function RootLayout() {

   const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  if (!fontsLoaded) return null;


  return (
    <QueryClientProvider  client={queryClient}>
            <SafeAreaProvider>
    <GestureHandlerRootView>
      <Stack >

    <Stack.Screen name="tabs" options={{
      headerShown: false,
    }}/>
 
  </Stack>
  {/* //Toast */}
      <Toast />
      </GestureHandlerRootView>
  </SafeAreaProvider>
      </QueryClientProvider>

  )
}


