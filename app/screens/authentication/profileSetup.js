import React, { useContext, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import * as ImagePicker from "expo-image-picker"
import { Context } from "../../store"
import useHttp from "../../hooks/useHttp"

export default function ProfileSetup() {
  const { userConfiguration } = useContext(Context)
  const [username, setUsername] = useState(userConfiguration.username)
  const [profileImage, setProfileImage] = useState({})
  const { sendData } = useHttp()
  // require("../../../assets/person.png")

  const imagePickingHandler = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!")
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        maxFileSize: 1 * 1024 * 1024,
      })

      if (!result.canceled) {
        const selectedImage = result.assets[0]
        setProfileImage(selectedImage)
      }
    } catch (error) {
      console.error("Error picking image:", error)
      alert("Failed to pick image. Please try again.")
    }
  }

  const submitHandler = async () => {
    // Create a FormData object to send the image
    const formData = new FormData()
    // formData.append("profileImage", {
    //   uri: profileImage.uri,
    //   type: profileImage.type || "image/jpeg", // Dynamically set the image type, fallback to jpeg
    //   name: profileImage.fileName || "profile_image.jpg", // Use dynamic filename if available
    // })

    formData.append("username", username)
    // Send the image to your server
    sendData(
      "/auth/profile-setup",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      },
      (data) => {
        console.log("Success...", data)
      },
      (err) => {
        Alert.alert("Error", err)
        console.log(err)
        console.log("Failed....")
      }
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark  ">
      <KeyboardAvoidingView className=" px-6 pt-24">
        <View className="items-center mb-8">
          <Text className="text-xl font-semibold mb-1 text-bl dark:text-background">
            Profile Setup
          </Text>
          <Text className="text-sm text-gray-400">
            please edit your profile image if you need to
          </Text>

          <Pressable onPress={imagePickingHandler} className="mt-6 relative">
            <Image
              style={{ width: 100, height: 100 }}
              source={
                profileImage.uri
                  ? { uri: profileImage.uri }
                  : require("../../../assets/person.png")
              }
              className="rounded-full bg-gray-300"
            />
            <TouchableOpacity
              className="absolute right-0 bottom-0 bg-teal-500 rounded-full p-2"
              onPress={imagePickingHandler}
            >
              <Icon name="edit" size={18} color="white" />
            </TouchableOpacity>
          </Pressable>
        </View>

        <View className="mb-8">
          <Text className="text-sm text-gray-400 mb-2">
            Please enter your username:
          </Text>
          <TextInput
            className="bg-primary dark:bg-background rounded-md p-3 text-gray-800"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity
        onPress={submitHandler}
        className="bg-primary mx-6 mb-2 mt-auto py-3 rounded-md "
      >
        <Text className="text-white text-center font-semibold">Finish</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
