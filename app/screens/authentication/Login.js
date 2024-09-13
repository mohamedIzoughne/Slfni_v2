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

const LabeledInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  isTextSecure = false,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-base mb-1 font-bold">{label}</Text>
      <TextInput
        className="border-2 border-[#C5C5C5] p-3 rounded-md focus:border-primary "
        secureTextEntry={isTextSecure}
        placeholder={placeholder}
        placeholderTextColor="#757575"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

function Login({ navigation }) {
  const { sendData, isLoading } = useHttp()
  const {
    userConfiguration,
    accessTokenHandler,
    refreshTokenHandler,
    nameHandler,
    imageHandler,
    languageHandler,
    notificationSettingsHandler,
  } = useContext(Context)
  const [identifier, setIdentifier] = useState("izourne003@gmail.com")
  const [password, setPassword] = useState("123456")

  const handleLoginSubmission = () => {
    sendData(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ identifier, password }),
      },
      (data) => {
        accessTokenHandler(data.accessToken)
        refreshTokenHandler(data.refreshToken)
        nameHandler(data.user.name)
        imageHandler(data.user.imageUrl)
        languageHandler(data.user.preferredLanguage)
        navigation.navigate("Tabs")
      },
      (error) => {
        console.log(error)
        Alert.alert("Login failed", error, [{ text: "OK" }])
      }
    )
  }

  return (
    <View
      className={`flex-1 px-5 pt-10 ${
        userConfiguration.theme === "light" ? "bg-light" : "bg-dark"
      } `}
    >
      {isLoading && (
        <View className="absolute w-full h-full inset-0 flex items-center justify-center">
          <ActivityIndicator size="large" color="#554686" />
        </View>
      )}
      <ScrollView className="">
        <View className="mb-8">
          <Text className="font-bold text-2xl">Hey, there 👋</Text>
          <Text className="font-bold text-2xl ">
            Experience Hassle-Free Lending and
          </Text>
          <Text className="font-bold text-2xl ">Borrowing Today!</Text>
          <Text className="text-gray-500 text-sm mt-2">
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
          className="text-right text-sm font-medium text-black mb-4"
          to={{ screen: "ForgetPassword" }}
        >
          Forget password?
        </Link>

        <Pressable
          onPress={handleLoginSubmission}
          className={`p-3 rounded-md mb-4 ${
            userConfiguration.theme === "light"
              ? "bg-primary"
              : "bg-primary-dark"
          }`}
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
          <Text className="text-black font-semibold">Continue with Google</Text>
        </Pressable>
      </ScrollView>

      <Link className="text-center items-center" to={{ screen: "Signup" }}>
        <View className="mt-auto pb-3 text-center">
          <Text className="text-center">
            Don't have an account?{" "}
            <Text className="text-primary font-bold">Register Now</Text>
          </Text>
        </View>
      </Link>
    </View>
  )
}

export default Login
