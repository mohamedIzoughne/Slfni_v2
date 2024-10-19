import React, { useContext, useState } from "react"
import { View, Text, Switch, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Context } from "../../store"

export default function Notifications({ setBar }) {
  // const [isEnabled, setIsEnabled] = useState(false)
  const {
    notificationSettingsHandler,
    userConfiguration: { notificationsPreference: isEnabled, theme },
  } = useContext(Context)

  const notificationHandler = () => {
    notificationSettingsHandler()
  }

  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  return (
    <View className="flex-1 p-4">
      <View>
        <TouchableOpacity onPress={() => setBar("")} className="mb-3 pr-3 py-3">
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme === "dark" ? "#F5F5F5" : "black"}
          />
        </TouchableOpacity>
        <Text className="text-3xl font-bold mb-2 dark:text-background">
          Notifications
        </Text>
        <Text className="text-lg text-gray-500 dark:text-gray-400 mb-8">
          Manage your notification settings
        </Text>
      </View>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg dark:text-background">
          Enable Notifications
        </Text>
        <Switch
          trackColor={{ false: "#003566", true: "#5394D0" }}
          thumbColor={isEnabled ? "#003566" : "#5394D0"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={notificationHandler}
          value={isEnabled}
        />
      </View>
      <Text className="text-base text-gray-500 dark:text-gray-400">
        {isEnabled
          ? "Notifications are enabled. You will receive updates and alerts."
          : "Notifications are disabled. You won't receive any updates or alerts."}
      </Text>
    </View>
  )
}
