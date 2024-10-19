import React, { useContext, useEffect } from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  BackHandler,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Icon from "react-native-vector-icons/FontAwesome5"
import Icon6 from "react-native-vector-icons/FontAwesome6"
import { useState } from "react"
import Language from "./settings/Language"
import Notifications from "./settings/Notifications"
import Theme from "./settings/Theme"
import Qrcode from "./settings/Qrcode"
import { Context } from "../store"
import { useColorScheme } from "react-native"
import { Modal } from "../components/UI/Modal"
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated"

import { LabeledInput } from "./authentication/Signup"
import useHttp from "../hooks/useHttp"

export default function Setting({ navigation }) {
  const [bar, setBar] = useState("")
  const { userConfiguration, nameHandler } = useContext(Context)
  const colorScheme = useColorScheme()
  const { sendData, isLoading } = useHttp()
  const isDarkMode = colorScheme === "dark"
  const profileImage = require("../../assets/koro.png") // Replace with actual path
  const [editInfosModalIsVisible, setEditInfosModalIsVisible] = useState("")
  const [newName, setNewName] = useState(userConfiguration.name)
  const [newUsername, setNewUsername] = useState(userConfiguration.username)
  const SettingItem = ({ icon, icontype, title, value }) => (
    <Pressable
      onPress={() => setBar(title)}
      className="flex-row items-center justify-between py-4 px-2 rounded-2xl my-2 bg-primary focus:bg-slate-400 dark:bg-background"
    >
      <View className="flex-row items-center">
        <View className="mr-3 bg-gray-200 dark:bg-background-dark w-14 h-12 rounded-2xl items-center justify-center">
          {icontype === "Icon6" ? (
            <Icon6
              name={icon}
              size={24}
              color={isDarkMode ? "#FFF" : "#2F5B84"}
            />
          ) : (
            <Ionicons
              name={icon}
              size={24}
              color={isDarkMode ? "#FFF" : "#2F5B84"}
            />
          )}
        </View>
        <Text className="text-base text-background dark:text-gray-800 font-bold">
          {title}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Text className="text-sm text-background dark:text-gray-500 mr-2">
          {value}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={isDarkMode ? "#666" : "#FFF"}
        />
      </View>
    </Pressable>
  )
  const isUsername = editInfosModalIsVisible === "username"

  useEffect(() => {
    if (bar.length > 0) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          setBar("")
          return true
        }
      )

      return () => backHandler.remove()
    }
  }, [bar])

  const renderContent = () => {
    switch (bar) {
      case "Language":
        return <Language setBar={setBar} />
      case "Notifications":
        return <Notifications setBar={setBar} />
      case "Theme":
        return <Theme setBar={setBar} />
      case "Qr code":
        return <Qrcode setBar={setBar} />
      default:
        return (
          <ScrollView>
            <Text className="text-lg text-gray-500 dark:text-gray-400 mb-3">
              Preferences
            </Text>

            <SettingItem
              icon="language"
              title="Language"
              value={
                userConfiguration.language.charAt(0).toUpperCase() +
                userConfiguration.language.slice(1)
              }
            />
            <SettingItem
              icon="notifications"
              title="Notifications"
              value={
                userConfiguration.notificationsPreference
                  ? "Enabled"
                  : "Disabled"
              }
            />
            <SettingItem
              icon="brush"
              icontype="Icon6"
              title="Theme"
              value={colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}
            />
            <SettingItem icon="qr-code" title="Qr code" value="" />
          </ScrollView>
        )
    }
  }

  const cancelUpdateInfosHandler = () => {
    setEditInfosModalIsVisible("")
    setNewName(userConfiguration.name)
    setNewUsername(userConfiguration.username)
  }

  const submitUpdateInfosHandler = () => {
    sendData(
      `/auth/change-infos`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
        },
        body: JSON.stringify({ name: newName, username: newUsername }),
      },
      (data) => {
        nameHandler(data.updatedUser.name, data.updatedUser.username)
        setEditInfosModalIsVisible("")
      },
      (err) => {
        cancelUpdateInfosHandler()
        Alert.alert("Error", "Failed updating user information", [
          { text: "OK" },
        ])
      }
    )
  }

  return (
    <ScrollView className="flex-1 bg-background dark:bg-background-dark">
      <Modal
        onPress={cancelUpdateInfosHandler}
        isVisible={!!editInfosModalIsVisible}
      >
        <Modal.Container>
          <Modal.Header title="Edit Profile" />
          <Modal.Body>
            <Text className="text-sm  mb-4 text-gray-500 dark:text-gray-400 text-center">
              Update Your Profile Information
            </Text>
            <LabeledInput
              label={isUsername ? "Username" : "Full name"}
              value={isUsername ? newUsername : newName}
              placeholder={isUsername ? "New username here" : "New name here"}
              onChangeText={isUsername ? setNewUsername : setNewName}
            />
          </Modal.Body>
          <Modal.Footer>
            <TouchableOpacity
              onPress={cancelUpdateInfosHandler}
              className="ml-auto px-5 py-2 rounded-md"
            >
              <Text className="dark:text-background">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={submitUpdateInfosHandler}
              className="bg-primary px-5 py-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white">Save</Text>
              )}
            </TouchableOpacity>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
      <View className="mt-10 mx-5">
        <View className="items-center mb-6 mt-14">
          <Image source={profileImage} className="w-20 h-20 rounded-full" />
          <View className="mt-3 items-center">
            <TouchableOpacity
              onPress={() => setEditInfosModalIsVisible("name")}
              className="flex-row items-center"
            >
              <Text className="text-xl mr-2 dark:text-background">
                {userConfiguration.name}
              </Text>
              <Icon name="edit" size={15} color="#2F5B84" />
            </TouchableOpacity>
            <View className="flex-row items-center mt-1">
              <TouchableOpacity
                onPress={() => setEditInfosModalIsVisible("username")}
                className="flex-row items-center"
              >
                <Text className="text-gray-500 dark:text-gray-400 mr-2">
                  @{userConfiguration.username}
                </Text>
                <Icon name="edit" size={15} color="#2F5B84" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Animated.View
          entering={SlideInRight.duration(300)}
          exiting={SlideOutLeft.duration(300)}
          style={{
            minHeight: 400,
          }}
          key={bar}
        >
          {renderContent()}
        </Animated.View>
      </View>
    </ScrollView>
  )
}
