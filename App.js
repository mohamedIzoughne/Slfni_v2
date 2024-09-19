import { Text, View, StatusBar } from "react-native"
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
import AddFriend from "./app/screens/AddFriend"
import Icon from "react-native-vector-icons/FontAwesome"
import Setting from "./app/screens/Setting"
import ProfileSetup from "./app/screens/authentication/profileSetup"
import Constants from "expo-constants"
import { useEffect } from "react"
import { SplashScreen } from "expo-router"
import Notifications from "./app/screens/Notifications"
import { AppProvider } from "./app/store/index"
import Oauth from "./app/screens/authentication/Oauth"
import Loans from "./app/screens/loans/index"
import UserLoanActivity from "./app/screens/loans/UserLoanActivity"
import CreateLoan from "./app/screens/loans/CreateLoan"

function Tabs() {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator>
      {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name="home" size={size} color={focused ? "#00B8B9" : color} />
          ),
        }}
      /> */}
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
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name="cog" size={size} color={focused ? "#00B8B9" : color} />
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
    <AppProvider>
      <View className="flex-1 bg-light">
        <StatusBar style="auto" animated={true} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="CreateLoan"
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
            {/* <Stack.Screen name="onBoarding" component={OnboardingScreen} /> */}
            <Stack.Screen name="AddFriend" component={AddFriend} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="profileSetup" component={ProfileSetup} />
            <Stack.Screen name="notification" component={Notifications} />
            <Stack.Screen name="Oauth" component={Oauth} />
            <Stack.Screen name="Loans" component={Loans} />
            <Stack.Screen name="UserActivity" component={UserLoanActivity} />
            <Stack.Screen name="CreateLoan" component={CreateLoan} />
            <Stack.Screen name="Tabs" component={Tabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AppProvider>
  )
}
