import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native"
import { Slot, Link } from "expo-router"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./app/screens/Home"
import Login from "./app/screens/authentication/Login"
import { useFonts } from "expo-font"
import Signup from "./app/screens/authentication/Signup"
import PasswordRetrieve from "./app/screens/authentication/PasswordRetrieve"
import ConfirmEmail from "./app/screens/authentication/ConfirmEmail"
import OnboardingScreen from "./app/screens/landing/onBoardingScreen"
import { useEffect } from "react"
import { SplashScreen } from "expo-router"

export default function App() {
  const Stack = createNativeStackNavigator()
  const [fontsLoaded, fontError] = useFonts({
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoThin: require("./assets/fonts/Roboto-Thin.ttf"),
  })

  useEffect(() => {
    if (fontError) throw fontError
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <StatusBar style="light" animated={true} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="onBoarding"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ForgetPassword" component={PasswordRetrieve} />
          <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
          <Stack.Screen name="onBoarding" component={OnboardingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
