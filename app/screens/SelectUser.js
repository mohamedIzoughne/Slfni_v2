import React, { useContext, useRef } from "react"
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Icon from "react-native-vector-icons/FontAwesome"
import Icon6 from "react-native-vector-icons/FontAwesome6"
import { useState } from "react"
import useHttp from "../hooks/useHttp"
import { Context } from "../store"

const Friend = ({ item, navigation, loanStatus }) => {
  const Crow = require("../../assets/59679082.png")

  return (
    <TouchableOpacity
      className="flex-row items-center mt-4"
      onPress={() => {
        navigation.navigate("CreateLoan", {
          userId: item.id,
          name: item.name,
          loanStatus: loanStatus,
          username: item.username,
        })
      }}
    >
      <View className="border border-primary rounded-lg ml-4 p-1">
        <Image source={Crow} className="w-[76px] h-[60px] rounded-xl  " />
      </View>
      <View className="flex-row items-center justify-between flex-grow mx-4 border border-t-0 border-r-0 border-l-0 border-gray-300 ">
        <View className="h-24  justify-center ">
          <Text className="text-2xl rounded-lg  ">{item.name}</Text>
          <Text className="text-gray-400  rounded-lg">{item.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default function AddFriend({ navigation, route }) {
  const [searchedUsers, setSearchedUsers] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const { userConfiguration } = useContext(Context)
  const { sendData, isLoading } = useHttp()
  const { loanStatus } = route.params
  const submitHandler = () => {
    if (searchInput.length < 4) {
      Alert.alert(
        "Invalid Input",
        "Please enter at least 4 characters to search for users.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      )
    }

    sendData(
      `/friendship/search/${searchInput}`,
      {
        headers: {
          authorization: `Bearer ${userConfiguration.accessToken}`,
        },
      },
      (data) => {
        setSearchedUsers(data.users)
      },
      (err) => {
        console.log(err)
      }
    )
    console.log(searchInput)
  }

  return (
    <SafeAreaView className="relative flex-1 bg-white ">
      <View className="flex-row justify-between items-center mt-20 mr-14 ml-4">
        <View className="flex-row items-center bg-slate-100 rounded-lg px-4 py-1 flex-grow mr-2">
          <TextInput
            className="flex-1 text-lg text-gray-800 font-medium rounded-lg py-2 pr-8"
            onChangeText={(text) => setSearchInput(text)}
            value={searchInput}
            placeholder="Search.."
            placeholderTextColor="#9CA3AF"
            onSubmitEditing={submitHandler}
            returnKeyType="search"
          />
          <Icon
            name="search"
            size={24}
            color="black"
            style={{ position: "absolute", right: 12 }}
          />
        </View>
        <TouchableOpacity className="bg-primary p-3 rounded-lg">
          <Icon6 name="qrcode" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="mt-6 bg-slate-50 px-4 py-2  border border-r-0 border-b-0 border-l-0 border-slate-200 h-full">
        {isLoading ? (
          <ActivityIndicator className="mt-28" size="large" color="#554686" />
        ) : searchedUsers.length === 0 ? (
          <View className="flex-row items-center justify-center mt-20">
            <Text className="text-gray-400  rounded-lg py-2 pr-8">
              No users found
            </Text>
          </View>
        ) : (
          <>
            <View className="flex-row items-center rounded-lg px-4 py-1  mr-2">
              <Text className="text-base text-gray-400  rounded-lg py-2 pr-8">
                Choose your friend
              </Text>
            </View>
            <FlatList
              data={searchedUsers}
              renderItem={({ item }) => (
                <Friend
                  key={item.id}
                  item={item}
                  loanStatus={loanStatus}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item.child}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  )
}
