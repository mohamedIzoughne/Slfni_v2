import React, { useContext } from "react"
import { View, Text, Pressable, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Context } from "../../store"

export default function Theme({ setbar }) {
  const { themeHandler } = useContext(Context)
  return (
    <View className="flex-1 bg-white">
      <View className="">
        <Pressable onPress={() => setbar("")} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text className="text-3xl font-bold mb-2">Theme</Text>
        <Text className="text-lg text-gray-500 mb-8">
          Choose your preferred theme
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => themeHandler("light")}
          className=" p-5 border-t border-solid border-t-gray-200"
        >
          <Text>Light</Text>
        </TouchableOpacity>
        <View className="h-[1px] bg-gray-200 my-2" />
        <TouchableOpacity
          onPress={() => themeHandler("dark")}
          className="  p-5 border-b border-solid border-b-gray-200"
        >
          <Text>Dark</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
