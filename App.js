import { Text, View, StatusBar } from "react-native"
import { Slot, Link } from "expo-router"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./app/screens/Home"
import Login from "./app/screens/authentication/Login"
import { useFonts } from "expo-font"
import Signup from "./app/screens/authentication/Signup"
import PasswordRetrieve from "./app/screens/authentication/PasswordRetrieve"
import EmailVerification from "./app/screens/authentication/EmailVerification"
import OnboardingScreen from "./app/screens/landing/onBoardingScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AddFriend from "./app/screens/AddFriend"
import Icon from "react-native-vector-icons/FontAwesome"
import Setting from "./app/screens/Setting"


import ProfileSetup from "./app/screens/authentication/profileSetup"

import { useEffect } from "react"
import { SplashScreen } from "expo-router"
import Notifications from "./app/screens/Notifications"
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Home!</Text>
//     </View>
//   )
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Settings!</Text>
//     </View>
//   )
// }

function Tabs() {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name="home" size={size} color={focused ? "#00B8B9" : color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddFriend"
        component={AddFriend}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="user-plus"
              size={size}
              color={focused ? "#00B8B9" : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={"Stats"}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={"Settings"}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

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
    <View className="flex-1 bg-white">
            <StatusBar style="auto" animated={true} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ForgetPassword" component={PasswordRetrieve} />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerification}
          />
          <Stack.Screen name="onBoarding" component={OnboardingScreen} />
          <Stack.Screen name="AddFriend" component={AddFriend}/>
          <Stack.Screen name="profileSetup" component={ProfileSetup} />
          <Stack.Screen name="notification" component={Notifications} />
          <Stack.Screen name="setting" component={Setting} />
          <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}
