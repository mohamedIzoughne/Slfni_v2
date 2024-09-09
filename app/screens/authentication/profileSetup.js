import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import * as ImagePicker from "expo-image-picker"

export default function ProfileSetup() {
  const [username, setUsername] = useState("")
  const [profileImage, setProfileImage] = useState(
    require("../../../assets/person.png")
  )

  const imagePickingHandler = async () => {
    try {
      // Open image picker

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })
      if (!result.canceled) {
        const selectedImage = result.assets[0]
        // Create form data
        const formData = new FormData()
        formData.append("image", {
          uri: selectedImage.uri,
          type: "image/jpeg",
          name: "image.jpg",
        })
        setProfileImage({ uri: selectedImage.uri })

        const response = await fetch("https://your-api-endpoint.com/upload", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        if (response.ok) {
          console.log("Image uploaded successfully")
          // Handle successful upload (e.g., update UI, save response data)
        } else {
          console.error("Failed to upload image")
        }
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-white ">
      <ScrollView className="flex-1 px-6 pt-24" behavior="padding">
        <View className="items-center mb-8">
          <Text className="text-xl font-semibold mb-1 ">Profile Setup</Text>
          <Text className="text-sm text-gray-400">
            please edit image if you want
          </Text>

          <View className="mt-6 relative">
            <Image
              source={profileImage}
              className="w-30 h-30 rounded-full bg-gray-300"
            />
            <TouchableOpacity
              className="absolute right-0 bottom-0 bg-teal-500 rounded-full p-2"
              onPress={imagePickingHandler}
            >
              <Icon name="edit" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-sm text-gray-400 mb-2">
            Please enter your username:
          </Text>
          <TextInput
            className="bg-gray-100 rounded-md p-3 text-gray-800"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      </ScrollView>

      <TouchableOpacity className="bg-primary mx-6 mb-5 mt-4 py-3 rounded-md">
        <Text className="text-white text-center font-semibold">Finish</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
