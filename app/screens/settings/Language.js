import React, { useContext, useState } from "react"
import { View, Text, Image, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import IconEntypo from "react-native-vector-icons/Entypo"
import { Context } from "../../store"
import useHttp from "../../hooks/useHttp"
import { useColorScheme } from "react-native"

const Language = ({ title, image, selected = false, changeLanguage }) => {
  const { userConfiguration } = useContext(Context)
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"
  return (
    <TouchableOpacity
      className="flex-row items-center"
      onPress={() => changeLanguage(title.toLowerCase())}
    >
      <View className="w-14 h-12 rounded-2xl mr-3">
        <Image source={image} className="w-full h-full rounded-2xl" />
      </View>
      <Text className="text-lg dark:text-background">{title}</Text>
      {selected && (
        <IconEntypo
          name="check"
          size={20}
          color={isDarkMode ? "#fff" : "#2F5B84"}
          className="ml-auto"
        />
      )}
    </TouchableOpacity>
  )
}

const languages = [
  {
    title: "Arabic",
    image: require("../../../assets/icons/flags/saudi-arabia.png"),
  },
  {
    title: "English",
    image: require("../../../assets/icons/flags/united-kingdom.png"),
  },
]

export default function Languages({ setBar }) {
  const { userConfiguration, languageHandler } = useContext(Context)
  const { sendData } = useHttp()
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  const changeLanguage = (language) => {
    languageHandler(language)

    sendData(
      "/auth/change-infos",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
        },
        body: JSON.stringify({
          preferredLanguage: language,
        }),
      },
      (data) => {
        console.log("This is data")
        console.log(data)
      },
      (err) => {
        Alert.alert("Error", err, [{ text: "OK" }])
      }
    )
  }

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
          Language
        </Text>
        <Text className="text-lg text-gray-500 dark:text-gray-400 mb-8">
          Select your preferred language
        </Text>
      </View>
      <View className=" mb-4 ml-4 gap-3">
        {languages.map((language, index) => (
          <Language
            key={language.title}
            title={language.title}
            changeLanguage={changeLanguage}
            image={language.image}
            selected={
              userConfiguration.language === language.title.toLowerCase()
            }
          />
        ))}
      </View>
    </View>
  )
}
