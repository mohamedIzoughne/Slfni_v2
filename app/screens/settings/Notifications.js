import React, { useContext, useState } from "react"
import { View, Text, Pressable, Switch } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Context } from "../../store"

export default function Notifications({ setbar }) {
  const [isEnabled, setIsEnabled] = useState(false)
  const { notificationSettingsHandler } = useContext(Context)

  const notificationHandler = () => {
    notificationSettingsHandler()
    setIsEnabled((previousState) => !previousState)
  }

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  return (
    <View className="flex-1 bg-white p-4">
      <View>
        <Pressable onPress={() => setbar("")} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text className="text-3xl font-bold mb-2">Notifications</Text>
        <Text className="text-lg text-gray-500 mb-8">
          Manage your notification settings
        </Text>
      </View>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg">Enable Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={notificationHandler}
          value={isEnabled}
        />
      </View>
      <Text className="text-base text-gray-500">
        {isEnabled
          ? "Notifications are enabled. You will receive updates and alerts."
          : "Notifications are disabled. You won't receive any updates or alerts."}
      </Text>
    </View>
  )
}
