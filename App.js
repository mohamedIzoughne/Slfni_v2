import { Text, View, StatusBar, processColor } from "react-native"
import { Slot, Link } from "expo-router"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./app/screens/Home"
import Home2 from "./app/screens/Home2"
import Login from "./app/screens/authentication/Login"
import { useFonts } from "expo-font"
import Signup from "./app/screens/authentication/Signup"
import PasswordRetrieve from "./app/screens/authentication/PasswordRetrieve"
import EmailVerification from "./app/screens/authentication/EmailVerification"
import OnboardingScreen from "./app/screens/landing/onBoardingScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import SelectUser from "./app/screens/SelectUser"
import Icon from "react-native-vector-icons/FontAwesome"
import Setting from "./app/screens/Setting"
import ProfileSetup from "./app/screens/authentication/profileSetup"
import Constants from "expo-constants"

import { useContext, useEffect, useState } from "react"
import { SplashScreen } from "expo-router"
import Notifications from "./app/screens/Notifications"
import { AppProvider, Context } from "./app/store/index"
import Oauth from "./app/screens/authentication/Oauth"
import Loans from "./app/screens/loans/index"
import UserLoanActivity from "./app/screens/loans/UserLoanActivity"
import CreateLoan from "./app/screens/loans/CreateLoan"
import CreateEvent from "./app/screens/events/CreateEvent"
import AddMembers from "./app/screens/events/AddMembers"
import EventDetails from "./app/screens/events/EventDetails"
import onBoardingScreen from "./app/screens/landing/onBoardingScreen"
import { useColorScheme } from "react-native"
import Scanner from "./app/screens/Scanner"
function Tabs() {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
          paddingBottom: 7,
          paddingTop: 10,
          height: 55,
          backgroundColor: isDarkMode ? "#272727" : "#fff",
        },
        tabBarActiveTintColor: isDarkMode ? "#F5F5F5" : "#2F5B84",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="home"
              size={size}
              color={focused ? (isDarkMode ? "#F5F5F5" : "#2F5B84") : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="cog"
              size={size}
              color={focused ? (isDarkMode ? "#F5F5F5" : "#2F5B84") : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  )
}

function Navigation() {
  const Stack = createNativeStackNavigator()
  const {
    userConfiguration: { isLoggedIn },
  } = useContext(Context)
  const [fontsLoaded, fontError] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoThin: require("./assets/fonts/Roboto-Thin.ttf"),
  })

  useEffect(() => {
    if (fontError) throw fontError
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  return (
    <View className="flex-1 bg-background  dark:bg-background-dark">
      <StatusBar style="auto" animated={true} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="profileSetup" component={ProfileSetup} />
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Tabs" component={Tabs} />
              <Stack.Screen name="AddMembers" component={AddMembers} />
              <Stack.Screen name="EventDetails" component={EventDetails} />
              <Stack.Screen name="UserActivity" component={UserLoanActivity} />
              <Stack.Screen name="CreateLoan" component={CreateLoan} />
              <Stack.Screen name="CreateEvent" component={CreateEvent} />
              <Stack.Screen name="SelectUser" component={SelectUser} />
              <Stack.Screen name="notification" component={Notifications} />
              <Stack.Screen name="Loans" component={Loans} />
              <Stack.Screen name="Scanner" component={Scanner} />
            </>
          ) : (
            <>
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen
                name="ForgetPassword"
                component={PasswordRetrieve}
              />

              <Stack.Screen name="Oauth" component={Oauth} />
            </>
          )}
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerification}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}
