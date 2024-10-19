import React, { useCallback, useContext, useRef } from "react"
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
  DeviceEventEmitter,
  BackHandler,
} from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import Icon from "react-native-vector-icons/FontAwesome"
import Icon6 from "react-native-vector-icons/FontAwesome6"
import { useState } from "react"
import useHttp from "../../hooks/useHttp"
import { Context } from "../../store"

const Member = ({ item, onAdd, members, onRemove }) => {
  const memberIsAdded =
    members.findIndex((member) => member.id === item.id) !== -1

  const handlePress = useCallback(() => {
    if (!memberIsAdded) {
      onAdd({ id: item.id, name: item.name })
    } else {
      onRemove(item.id)
    }
  })

  return (
    <View className="flex-row items-center bg-background-light px-4 py-4">
      <View
        style={{ borderRadius: 16 }}
        className="bg-primary dark:bg-background mr-4 p-2 rounded-[16px]"
      >
        <Image
          source={require("../../../assets/person.png")}
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
      <TouchableOpacity className="p-2" onPress={handlePress}>
        <Text className="text-primary dark:text-white text-right text-sm font-medium">
          {memberIsAdded ? "Added" : "Add"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default function AddMembers({ navigation, route }) {
  const [searchedUsers, setSearchedUsers] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const { userConfiguration } = useContext(Context)
  const { sendData, isLoading } = useHttp()
  const { initialMembers = [], scannedData } = route.params

  // you remove it there yes but you don't remove it there, the sol: is to make a state for all members

  // here there is a problem, because when we delete a member from the list, the list is not updated.
  // especially when we go back to the previous screen, the list is not updated.
  const [newAddedMembers, setNewAddedMembers] = useState([...initialMembers])

  // remove it after going back
  // add it after going back
  const allMembers = [...newAddedMembers]

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

  const addMemberHandler = (newMember) => {
    DeviceEventEmitter.emit("onAddMember", newMember)
    setNewAddedMembers((prev) => [...prev, newMember])
  }

  const removeMemberHandler = (id) => {
    DeviceEventEmitter.emit("onRemoveMember", id)
    setNewAddedMembers((prev) => {
      return prev.filter((member) => member.id !== id)
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      if (scannedData) {
        setSearchInput(scannedData)
        submitHandler(scannedData)
      }
    }, [scannedData])
  )

  return (
    <SafeAreaView className="relative flex-1 bg-background dark:bg-background-dark">
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
          <TouchableOpacity
            onPress={submitHandler}
            style={{ position: "absolute", right: 12 }}
          >
            <Icon name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Scanner", {
              initialMembers: newAddedMembers,
            })
          }
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
                Choose new member
              </Text>
            </View>

            <FlatList
              data={searchedUsers}
              renderItem={({ item }) => (
                <Member
                  item={item}
                  onAdd={addMemberHandler}
                  onRemove={removeMemberHandler}
                  members={allMembers}
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
