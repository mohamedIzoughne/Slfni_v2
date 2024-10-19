import React, { useContext } from "react"
import {
  View,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import QRCode from "react-native-qrcode-svg"
import { Context } from "../../store"
import { useColorScheme } from "react-native"

export default function Qrcode({ setBar }) {
  const { userConfiguration } = useContext(Context)
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  return (
    <View className="flex-1 p-4">
      <View className="">
        <TouchableOpacity onPress={() => setBar("")} className="mb-3 pr-3 py-3">
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? "#F5F5F5" : "black"}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-center items-center">
        <QRCode
          value={userConfiguration.username}
          size={Dimensions.get("window").width * 0.8}
          color="black"
          backgroundColor="white"
        />
      </View>
    </View>
  )
}
