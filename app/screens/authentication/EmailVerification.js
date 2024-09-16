import React, { useState, useRef } from "react"
import {
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native"
import { Link } from "@react-navigation/native"
import useHttp from "../../hooks/useHttp"
import { useContext } from "react"
import { Context } from "../../store"

export default function EmailVerification({ navigation }) {
  const [code, setCode] = useState(["", "", "", "", ""])
  const inputs = useRef([])
  const { isLoading, sendData } = useHttp()
  const {
    userConfiguration: { accessToken },
  } = useContext(Context)

  const handleCodeChange = (text, index) => {
    const newCode = [...code]
    newCode[index] = text
    setCode(newCode)

    if (text.length === 1 && index < 3) {
      inputs.current[index + 1].focus()
    }
  }

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && code[index] === "") {
      inputs.current[index - 1].focus()
      const newCode = [...code]
      newCode[index - 1] = ""
      setCode(newCode)
    }
  }

  const submitHandler = () => {
    const codeString = code.join("")

    sendData(
      "/auth/verify-email",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          code: codeString,
        }),
      },
      (data) => {
        console.log("Hello")
        navigation.navigate("Tabs")
      },
      (error) => {
        Alert.alert("Verification failed", error, [{ text: "OK" }])
      }
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-10">
      {isLoading && (
        <View className="absolute w-full h-full inset-0 flex items-center justify-center">
          <ActivityIndicator size="large" color="#554686" />
        </View>
      )}
      <View className="flex-row justify-end mt-14">
        <Link
          to={{ screen: "Home" }}
          className="text-primary text-2xl font-medium"
        >
          skip→
        </Link>
      </View>

      <View className="items-center mt-28">
        <Text className="text-2xl font-medium mb-2">Verify phone</Text>
        <Text className="text-lg text-gray-500 mb-8">
          code has been sent to +212603311188
        </Text>

        <View className="flex-row mb-8 ">
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              className={`w-16 h-16 mx-2 rounded-lg text-center text-2xl justify-center items-center ${
                digit
                  ? "bg-[#37C8C3] text-white"
                  : "bg-white border border-[#37C8C3]"
              }`}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              value={digit}
            />
          ))}
        </View>

        <Pressable>
          <Text className="text-xl ">Didn't get the code?</Text>
        </Pressable>
        <Pressable>
          <Text className="text-[#37C8C3] font-semibold text-lg">
            Resend code
          </Text>
        </Pressable>
      </View>

      <Text className="flex-1 text-lg text-gray-400 text-center mt-6">
        manage your credits seamlessly and keep your finances straightforward
      </Text>

      <Pressable
        onPress={submitHandler}
        className="bg-[#37C8C3] rounded-lg py-4 items-center mb-8"
      >
        <Text className="text-white font-bold text-xl">Continue</Text>
      </Pressable>
    </SafeAreaView>
  )
}
