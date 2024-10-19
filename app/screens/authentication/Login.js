import {
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { Link } from "@react-navigation/native"
import "../../../global.css"
import { useContext, useRef, useState } from "react"
import { Context } from "../../store"
import { Alert } from "react-native"
import useHttp from "../../hooks/useHttp"
import NetInfo, { refresh } from "@react-native-community/netinfo"
import { useEffect } from "react"
import { useColorScheme } from "react-native"
import { LabeledInput } from "./Signup"

// const LabeledInput = ({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   isTextSecure = false,
// }) => {
//   return (
//     <View className="mb-4">
//       <Text className="text-base mb-1 font-bold">{label}</Text>
//       <TextInput
//         className="border-2 border-[#C5C5C5] p-3 rounded-md focus:border-primary "
//         secureTextEntry={isTextSecure}
//         placeholder={placeholder}
//         placeholderTextColor="#757575"
//         value={value}
//         onChangeText={onChangeText}
//       />
//     </View>
//   )
// }

function Login({ navigation }) {
  const { sendData, isLoading } = useHttp()
  const { userConfiguration, nameHandler, languageHandler, loginHandler } =
    useContext(Context)
  const [identifier, setIdentifier] = useState("izourne003@gmail.com")
  const [password, setPassword] = useState("123456")
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  const handleLoginSubmission = () => {
    sendData(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ identifier, password }),
      },
      (data) => {
        loginHandler(data.accessToken, data.refreshToken, data.expirationDate)
        nameHandler(data.user.name, data.user.username)
        // imageHandler(data.user.imageUrl)
        languageHandler(data.user.preferredLanguage)
      },
      (error) => {
        Alert.alert("Login failed", error, [{ text: "OK" }])
      }
    )
  }

  return (
    <View className={"flex-1 px-5 pt-10 bg-background dark:bg-background-dark"}>
      {isLoading && (
        <View className="absolute w-full h-full inset-0 flex items-center justify-center">
          <ActivityIndicator size="large" color="#554686" />
        </View>
      )}
      <ScrollView className="">
        <View className="mb-8">
          <Text className="font-bold text-2xl dark:text-background">
            Hey, there 👋
          </Text>
          <Text className="font-bold text-2xl dark:text-background">
            Experience Hassle-Free Lending and
          </Text>
          <Text className="font-bold text-2xl dark:text-background">
            Borrowing Today!
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            From here on out, you can now easily track your borrowers and
            lenders at any time.
          </Text>
        </View>

        <View className="mx-2">
          <LabeledInput
            label="Username or email"
            placeholder="Enter your username or email"
            value={identifier}
            onChangeText={setIdentifier}
          />
          <LabeledInput
            label="Password"
            isTextSecure={true}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Link
          className="text-right text-sm font-medium text-black dark:text-background mb-4"
          to={{ screen: "ForgetPassword" }}
        >
          Forget password?
        </Link>

        <Pressable
          onPress={handleLoginSubmission}
          className={`p-3 rounded-md mb-4  ${
            isDarkMode ? "bg-primary" : "bg-primary"
          } bg-primary`}
        >
          <Text className="text-white font-bold text-lg text-center">
            Login
          </Text>
        </Pressable>

        <Pressable className="border border-primary rounded-md p-3 flex-row justify-center items-center mb-8">
          <Image
            source={require("../../../assets/google-icon.webp")}
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
          <Text className="text-black dark:text-background font-semibold">
            Continue with Google
          </Text>
        </Pressable>
      </ScrollView>

      <Link className="text-center items-center" to={{ screen: "Signup" }}>
        <View className="mt-auto pb-3 text-center">
          <Text className="text-center dark:text-background">
            Don't have an account?
            <Text className="text-primary font-bold"> Register Now</Text>
          </Text>
        </View>
      </Link>
    </View>
  )
}

export default Login
