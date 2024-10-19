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
import { useFocusEffect } from "@react-navigation/native"

const Friend2 = ({ item, navigation, loanStatus }) => {
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

const Friend = ({ item, navigation, loanStatus }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("CreateLoan", {
          userId: item.id,
          name: item.name,
          loanStatus: loanStatus,
          username: item.username,
        })
      }}
      className="flex-row items-center bg-background-light px-4 py-4"
    >
      <View
        style={{ borderRadius: 16 }}
        className="bg-primary dark:bg-background mr-4 p-2 rounded-[16px]"
      >
        <Image
          source={require("../../assets/person.png")}
          className="w-12 h-12 rounded-full "
        />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-[#003566] dark:text-background text-sm ">
          {item.name}
        </Text>
        <Text className="text-gray-600 dark:text-gray-400">
          @{item.username}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default function AddFriend({ navigation, route }) {
  const [searchedUsers, setSearchedUsers] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const { userConfiguration } = useContext(Context)
  const { sendData, isLoading } = useHttp()
  const { loanStatus, scannedData } = route.params
  const submitHandler = (scanned) => {
    if (scanned && scanned.length < 4 && searchInput.length < 4) {
      Alert.alert(
        "Invalid Input",
        "Please enter at least 4 characters to search for users.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      )
    }

    sendData(
      `/friendship/search/${scanned || searchInput}`,
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

  console.lo
  console.log("scanned-----", scannedData)

  useFocusEffect(
    React.useCallback(() => {
      if (scannedData) {
        setSearchInput(scannedData)
        submitHandler(scannedData)
      }
    }, [scannedData])
  )

  return (
    <SafeAreaView className="relative flex-1 bg-background dark:bg-background-dark ">
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
        <TouchableOpacity
          onPress={() => navigation.navigate("Scanner")}
          className="bg-primary p-3 rounded-lg"
        >
          <Icon6 name="qrcode" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="mt-6  px-4 py-2  border border-r-0 border-b-0 border-l-0 border-slate-200 dark:border-gray-700 h-full">
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
                  item={item}
                  loanStatus={loanStatus}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  )
}
