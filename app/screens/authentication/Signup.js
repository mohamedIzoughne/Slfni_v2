import {
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native"
import { Link } from "@react-navigation/native"
import "../../../global.css"
import { useContext, useRef, useState } from "react"
import { Context } from "../../store"
import useHttp from "../../hooks/useHttp"

const LabeledInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  isTextSecure = false,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-sm mb-1">{label}</Text>
      <TextInput
        className="border-2 border-[#C5C5C5] p-3 rounded-md focus:border-primary"
        secureTextEntry={isTextSecure}
        placeholder={placeholder}
        placeholderTextColor="#757575"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default function Signup({ navigation }) {
  const [authUrl, setAuthUrl] = useState(null)
  const {
    userConfiguration,
    accessTokenHandler,
    refreshTokenHandler,
    nameHandler,
    languageHandler,
  } = useContext(Context)
  const { sendData, isLoading } = useHttp()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const handleSignupSubmission = async () => {
    const submissionData = {
      ...formData,
      username: formData.name ? formData.name.split(" ").join("") : "",
    }

    await sendData(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(submissionData),
      },
      async (data) => {
        console.log("access token: ", data.accessToken)
        accessTokenHandler(data.accessToken)
        refreshTokenHandler(data.refreshToken)
        nameHandler(data.user.name)

        navigation.navigate("EmailVerification")
      },
      (error) => {
        Alert.alert("Signup failed", error, [{ text: "OK" }])
      }
    )
  }

  return (
    <View
      className={`flex-1  ${
        userConfiguration.theme === "light" ? "bg-light" : "bg-dark"
      } bg-light`}
    >
      {isLoading && (
        <View className="absolute w-full h-full inset-0 flex items-center justify-center">
          <ActivityIndicator size="large" color="#554686" />
        </View>
      )}
      <ScrollView className=" px-5 pt-3">
        <View className="mt-10 mb-6">
          <Text className="font-bold text-2xl pb-1">Hey, there! 👋</Text>
          <Text className="font-bold text-2xl">
            Simplify lending borrowing with our app!
          </Text>
          <Text className="text-[#969696] text-sm mt-2">
            From here on out, you can now easily track your borrowers and
            lenders at any time.
          </Text>
        </View>

        <View className="flex-1 justify-between mx-3">
          <LabeledInput
            label="Full name"
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <LabeledInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <LabeledInput
            label="Password"
            isTextSecure={true}
            placeholder="Enter password"
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <LabeledInput
            label="Confirm password"
            isTextSecure={true}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
          />

          <Pressable
            onPress={handleSignupSubmission}
            className="bg-primary rounded-md p-3 mt-6"
          >
            <Text className="text-white font-bold text-lg text-center">
              Sign up
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Oauth")}
            className="border border-primary rounded-md p-3 mt-4 flex-row justify-center items-center"
          >
            <Image
              source={require("../../../assets/google-icon.webp")}
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
            <Text className="text-black font-semibold">
              Continue with Google
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <Link className="text-center items-center" to={{ screen: "login" }}>
        <View className="mt-auto pb-3 text-center">
          <Text className="text-center">
            Already have an account ?{" "}
            <Text className="text-primary font-bold">Login</Text>
          </Text>
        </View>
      </Link>
    </View>
  )
}
