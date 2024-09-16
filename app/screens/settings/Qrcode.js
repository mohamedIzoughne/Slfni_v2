import React, { useContext } from "react"
import { View, Text, Pressable, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import QRCode from "react-native-qrcode-svg"
import { Context } from "../../store"

export default function Qrcode({ setbar }) {
  const { userConfiguration } = useContext(Context)
  return (
    <View className="flex-1 bg-white p-4">
      <View className="">
        <Pressable onPress={() => setbar("")} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
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
