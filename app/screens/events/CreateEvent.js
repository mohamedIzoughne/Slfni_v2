import React, { useCallback, useContext, useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  DeviceEventEmitter,
} from "react-native"
import IconEntypo from "react-native-vector-icons/Entypo"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import useHttp from "../../hooks/useHttp"
import { Context } from "../../store"
import AddUserIcon from "../../../assets/addUser.svg"
import AddMemberSVG from "../../../assets/svgs/AddMemberSVG"
import { useColorScheme } from "react-native"

const CreateEventScreen = ({ route, navigation }) => {
  const [eventName, setEventName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const { sendData, isLoading } = useHttp()
  const { userConfiguration } = useContext(Context)
  const [members, setMembers] = useState([])
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  console.log("members", members)
  const proceedHandler = () => {
    const memberIds = members.map((member) => member.id)

    const eventData = {
      eventName,
      defaultPrice: parseFloat(price),
      description,
      members: memberIds,
    }

    sendData(
      `/events/create-event`,
      {
        method: "POST",
        body: JSON.stringify(eventData),
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
        },
      },
      (data) => {
        Alert.alert("Success", "Successfully created an event", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ])
      },
      (err) => {
        Alert.alert("Error", err, [{ text: "OK" }])
      }
    )
  }

  const removeMemberHandler = (id) => {
    setMembers((members) => {
      const filteredMembers = members.filter((member) => member.id !== id)
      console.log("filtered-------", filteredMembers)
      return filteredMembers
    })
  }

  useEffect(() => {
    const addMemberListener = DeviceEventEmitter.addListener(
      "onAddMember",
      (newMember) => {
        setMembers((members) => {
          return [...members, newMember]
        })
      }
    )

    const removeMemberListener = DeviceEventEmitter.addListener(
      "onRemoveMember",
      (id) => removeMemberHandler(id)
    )

    return () => {
      addMemberListener.remove()
      removeMemberListener.remove()
    }
  }, [])

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <View className="bg-primary px-4 pt-8">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            className="bg-background size-[26px] justify-center items-center rounded-full mr-auto"
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
            <View className="bg-[#ffffffc0] dark:bg-gray-200 p-4 rounded-md">
              <Text className="">{userConfiguration.name}</Text>
            </View>
            <Text
              // style={{ elevation: 2 }}
              className="text-primary absolute top-0 text-xs w-[50px] rounded-full pl-3 flex-grow-0 -mt-2 ml-2 bg-white dark:bg-gray-200"
            >
              Admin
            </Text>
          </View> */}

          <View className="relative">
            <TextInput
              className="bg-[#ffffffc0] dark:bg-background rounded-md p-3   text-gray-700"
              placeholder="Enter title"
              placeholderTextColor={"#757575"}
              value={eventName}
              onChangeText={setEventName}
            />
            <Text
              // style={{ elevation: 2 }}
              className="text-primary absolute top-0 text-sm w-[50px] rounded-full pl-3 flex-grow-0 -mt-2 ml-2 bg-white dark:bg-background"
            >
              Title
            </Text>
          </View>

          <View className="relative">
            <TextInput
              className="bg-[#ffffffc0] dark:bg-background rounded-md p-3 text-gray-700"
              placeholder="Enter price (e.g 25Dh)"
              value={price}
              placeholderTextColor={"#757575"}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <Text className="text-primary absolute top-0 text-sm w-[50] rounded-full pl-3 flex-grow-0 -mt-2 ml-2 bg-white dark:bg-background">
              Price
            </Text>
          </View>

          <View className="relative">
            <TextInput
              className="bg-[#ffffffc0] dark:bg-background rounded-md p-3 pt-4 text-gray-700"
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
              className="text-primary absolute top-0 text-xs w-[80px] rounded-full pl-3 flex-grow-0 -mt-2 ml-2 bg-white dark:bg-background"
            >
              Description
            </Text>
          </View>

          <ScrollView>
            <Text
              // style={{ elevation: 2 }}
              className="text-primary dark:text-background  text-sm w-[80px] pl-3  ml-2 "
            >
              Members
            </Text>
            <ScrollView className="ml-5">
              {members.map((member) => {
                return (
                  <View
                    key={member.id}
                    className="flex-row items-center justify-between mb-2"
                  >
                    <Text className=" text-lg dark:text-background">
                      {member.name}
                    </Text>
                    <TouchableOpacity
                      className="p-1"
                      onPress={() => removeMemberHandler(member.id)}
                    >
                      <AntDesign name="delete" size={18} color="#DF5060" />
                    </TouchableOpacity>
                  </View>
                )
              })}
            </ScrollView>
            <TouchableOpacity
              className="ml-4 mt-4 flex-row items-centesr"
              onPress={() => {
                navigation.navigate("AddMembers", {
                  initialMembers: members,
                })
              }}
            >
              <AddMemberSVG isDark={isDarkMode} width={30} />
              <Text className="ml text-lg text-[#003566] dark:text-background">
                Add member
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Proceed Button */}
      <View className="p-4">
        <TouchableOpacity
          className={`${
            isLoading ? "opacity-40" : ""
          } bg-primary   rounded-md py-4`}
          onPress={proceedHandler}
        >
          <Text className="text-white text-center font-bold">Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CreateEventScreen
