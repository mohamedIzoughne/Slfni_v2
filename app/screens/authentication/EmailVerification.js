import React, { useState, useRef, useEffect } from "react"
import {
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native"
import { Link } from "@react-navigation/native"
import useHttp from "../../hooks/useHttp"
import { useContext } from "react"
import { Context } from "../../store"
import { formatTimeToMinutesSeconds } from "../../utils"

const CountdownTimer = ({ initialSeconds, onExpire, key }) => {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + initialSeconds * 1000

    const interval = setInterval(() => {
      const currentTime = Date.now()
      const remainingSeconds = Math.max(
        0,
        Math.ceil((endTime - currentTime) / 1000)
      )

      setSeconds(remainingSeconds)

      if (remainingSeconds <= 0) {
        clearInterval(interval)
        onExpire()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [initialSeconds, onExpire, key])

  return (
    <View className="flex-row items-center gap-1">
      <Text className="text-xl text-primary font-semibold">
        {formatTimeToMinutesSeconds(seconds)}
      </Text>
    </View>
  )
}

export default function EmailVerification({ navigation, route }) {
  const [code, setCode] = useState(["", "", "", "", ""])
  const inputs = useRef([])
  const { isLoading, sendData } = useHttp()
  const { email } = route.params || {}
  const {
    userConfiguration: { accessToken },
  } = useContext(Context)
  const [timerKey, setTimerKey] = useState(0)

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
        navigation.navigate("profileSetup")
      },
      (error) => {
        Alert.alert("Verification failed", error, [{ text: "OK" }])
      }
    )
  }

  const resendCodeHandler = () => {
    sendData(
      "/auth/resend-verification-code",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      (data) => {
        Alert.alert("Verification code sent", "Please check your email", [
          { text: "OK" },
        ])
        setTimerKey((prevKey) => prevKey + 1)
      },
      (error) => {
        Alert.alert("Failed", error, [{ text: "OK" }])
      }
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark px-10">
      {isLoading && (
        <View className="absolute w-full h-full inset-0 flex items-center justify-center">
          <ActivityIndicator size="large" color="#554686" />
        </View>
      )}

      <View className="items-center mt-28">
        <Text className="text-2xl font-medium mb-2 dark:text-background">
          Verify email address
        </Text>
        <Text className="text-lg text-gray-500 dark:text-gray-400 mb-8">
          code has been sent to {email}
        </Text>

        <View className="flex-row mb-8 ">
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              className={`w-16 h-16 mx-2 rounded-lg text-center text-2xl justify-center items-center ${
                digit
                  ? "bg-primary text-white"
                  : "bg-white border border-primary"
              }`}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              value={digit}
            />
          ))}
        </View>

        <View>
          <CountdownTimer
            key={timerKey}
            initialSeconds={60 * 15}
            onExpire={() => {
              Alert.alert(
                "Verification code expired",
                "Would you like to resend the code?",
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "Resend", onPress: resendCodeHandler },
                ]
              )
            }}
          />
        </View>
        <TouchableOpacity onPress={resendCodeHandler}>
          <Text className="text-xl dark:text-background ">
            Didn't get the code?{" "}
            <Text className="text-[#2F5B84]  text-lg">Resend code</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <Pressable
        onPress={submitHandler}
        className="bg-primary rounded-lg py-4 items-center mt-8 mb-8"
      >
        <Text className="text-white font-bold text-xl">Continue</Text>
      </Pressable>
    </SafeAreaView>
  )
}
