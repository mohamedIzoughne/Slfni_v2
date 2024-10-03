import React, { useContext, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native"
import IconEntypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
import useHttp from "../../hooks/useHttp"
import { Context } from "../../store"
import AddUserIcon from "../../../assets/addUser.svg"

const CreateEventScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const { sendData } = useHttp()
  const { userConfiguration } = useContext(Context)

  const handleProceed = () => {
    const borrowingData = {
      title,
      amount: parseFloat(price),
      description,
      lenderId: userId,
    }

    const lendingData = {
      title,
      amount: parseFloat(price),
      description,
      borrowerId: userId,
    }

    sendData(
      `/loans/create-${loanStatus.toLowerCase()}`,
      {
        method: "POST",
        body: JSON.stringify(
          loanStatus === "Borrowing" ? borrowingData : lendingData
        ),
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
        },
      },
      (data) => {
        navigation.navigate("UserActivity", {
          friendId: userId,
          name: name,
          username: username,
        })
      },
      (err) => {
        Alert.alert("Error", err, [{ text: "OK" }])
      }
    )

    console.log({ title, price, description })
  }

  return (
    <View className="flex-1 bg-background-light">
      <View className="bg-primary px-4 pt-8">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            className="bg-background-light size-[26px] justify-center items-center rounded-full mr-auto"
            onPress={() => navigation.navigate("Home")}
          >
            <IconEntypo name="chevron-thin-left" size={15} color="#000" />
          </TouchableOpacity>
          <Text className=" text-white font-bold text-xl mr-auto">
            Create Event
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-4 ">
        {/* Form */}
        <View className="p-4 space-y-4 gap-6">
          {/* <View className="relative">
            <View className="bg-[#ffffffc0] p-4 rounded-md">
              <Text className="">{userConfiguration.name}</Text>
            </View>
            <Text
              // style={{ elevation: 2 }}
              className="text-primary absolute top-0 text-xs w-[50px] rounded-full pl-3 flex-grow-0 -mt-2 ml-2 bg-white"
            >
              Admin
            </Text>
          </View> */}

          <View className="relative">
            <TextInput
              className="bg-[#ffffffc0] rounded-md p-3   text-gray-700"
              placeholder="Enter title"
              placeholderTextColor={"#757575"}
              value={title}
              onChangeText={setTitle}
            />
            <Text
              // style={{ elevation: 2 }}
              className="text-primary absolute top-0 text-sm w-[50px] rounded-full pl-3 flex-grow-0 -mt-2 ml-2 bg-white"
            >
              Title
            </Text>
          </View>

          <View className="relative">
            <TextInput
              className="bg-[#ffffffc0] rounded-md p-3 text-gray-700"
              placeholder="Enter price (e.g 25Dh)"
              value={price}
              placeholderTextColor={"#757575"}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <Text className="text-primary absolute top-0 text-sm w-[50] rounded-full pl-3 flex-grow-0 -mt-2 ml-2 bg-white">
              Price
            </Text>
          </View>

          <View className="relative">
            <TextInput
              className="bg-[#ffffffc0] rounded-md p-3 pt-4 text-gray-700"
              placeholder="Enter a note/description(less than 250 characters)"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor={"#757575"}
              multiline
              numberOfLines={8}
              maxLength={250}
              textAlignVertical="top"
            />
            <Text
              // style={{ elevation: 2 }}
              className="text-primary absolute top-0 text-xs w-[80px] rounded-full pl-3 flex-grow-0 -mt-2 ml-2 bg-white"
            >
              Description
            </Text>
          </View>

          <ScrollView>
            <Text
              // style={{ elevation: 2 }}
              className="text-primary  text-sm w-[80px] pl-3  ml-2 "
            >
              Members
            </Text>
            <View className="ml-5">
              <Text className="ml text-lg ">Mohamed Izourne</Text>
            </View>
            <TouchableOpacity
              className="ml-4 mt-4 flex-row items-center bg-blue-900"
              onPress={() => {
                console.log("----")
                navigation.navigate("AddMembers")
              }}
            >
              <AddUserIcon color="#009EE0" width={30} />
              <Text className="ml text-lg text-[#003566]">Add member</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Proceed Button */}
      <View className="p-4">
        <TouchableOpacity
          className="bg-primary rounded-md py-4"
          onPress={handleProceed}
        >
          <Text className="text-white text-center font-bold">Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CreateEventScreen
