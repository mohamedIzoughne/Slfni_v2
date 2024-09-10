import React from "react"
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Icon from "react-native-vector-icons/FontAwesome"
import Icon6 from "react-native-vector-icons/FontAwesome6"

export default function AddFriend({ navigation }) {
  const Crow = require("../../assets/59679082.png")

  const Friend = ({ child, location }) => {
    return (
      <View className="flex-row items-center mt-4  ">
        <View className="border border-primary rounded-lg ml-4 p-1">
          <Image source={Crow} className="w-[76px] h-[60px] rounded-xl  " />
        </View>

        <View className="flex-row items-center justify-between flex-grow mx-4 border border-t-0 border-r-0 border-l-0 border-gray-300 ">
          <View className="h-24  justify-center ">
            <Text className="text-2xl rounded-lg  ">{child}</Text>
            <Text className="text-gray-400  rounded-lg">{location}</Text>
          </View>
          <TouchableOpacity>
            <Icon6 name="plus" size={24} color="#37C8C3" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View className="flex-row justify-between items-center mt-20 mr-14 ml-4">
        <View className="flex-row items-center bg-slate-100 rounded-lg px-4 py-1 flex-grow mr-2">
          <TextInput
            className="flex-1 text-lg text-gray-800 font-medium rounded-lg py-2 pr-8"
            placeholder="Search.."
            placeholderTextColor="#9CA3AF"
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
        <View className="flex-row items-center rounded-lg px-4 py-1  mr-2">
          <Text className="text-base text-gray-400  rounded-lg py-2 pr-8">
            Choose your friend
          </Text>
        </View>
        <View>
          <Friend child="Mouad" location="Agadir, Maroc" />
          <Friend child="Mo7" location="Taroudant, Maroc" />
          <Friend child="Jamal" location="Taznakht, Maroc" />
          <Friend child="Khalid" location="Boujdour, Maroc" />
        </View>
      </View>
    </SafeAreaView>
  )
}
