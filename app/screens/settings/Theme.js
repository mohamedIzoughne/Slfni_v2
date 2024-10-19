import React, { useContext, useState } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import IconEntypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Context } from "../../store"
import { useColorScheme } from "react-native"

const ThemeOption = ({ title, icon, selected = false }) => {
  const { themeHandler, userConfiguration } = useContext(Context)
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  return (
    <TouchableOpacity
      className="flex-row items-center p-1"
      onPress={() => themeHandler(title.toLowerCase())}
    >
      <View className="w-14 h-12 rounded-2xl mr-3 justify-center items-center">
        {icon}
      </View>
      <Text className="text-lg dark:text-background">{title}</Text>
      {selected && (
        <IconEntypo
          name="check"
          size={20}
          color={isDarkMode ? "#F5F5F5" : "#2F5B84"}
          className="ml-auto"
        />
      )}
    </TouchableOpacity>
  )
}

export default function Theme({ setBar }) {
  const { userConfiguration } = useContext(Context)
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  const themes = [
    {
      title: "Light",
      icon: (
        <IconEntypo
          name="light-up"
          size={24}
          color={isDarkMode ? "#F5F5F5" : "black"}
        />
      ),
    },
    {
      title: "Dark",
      icon: (
        <MaterialIcons
          name="dark-mode"
          size={24}
          color={isDarkMode ? "#F5F5F5" : "black"}
        />
      ),
    },
  ]

  return (
    <View className="flex-1 p-4">
      <View>
        <TouchableOpacity onPress={() => setBar("")} className="mb-3 pr-3 py-3">
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? "#F5F5F5" : "black"}
          />
        </TouchableOpacity>
        <Text className="text-3xl font-bold mb-2 dark:text-background">
          Theme
        </Text>
        <Text className="text-lg text-gray-500 dark:text-gray-400s mb-8">
          Choose your preferred theme
        </Text>
      </View>
      <View className=" mb-4 ml-1 gap-3">
        {themes.map((theme, index) => (
          <ThemeOption
            key={theme.title}
            title={theme.title}
            icon={theme.icon}
            selected={colorScheme === theme.title.toLowerCase()}
          />
        ))}
      </View>
    </View>
  )
}
