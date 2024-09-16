import React from "react"
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const dummyData = Array(10)
  .fill()
  .map((_, index) => ({
    id: index,
    name: "Mohamed Izourne",
    username: "@izourne",
    amount: "350 DH",
    editedDate: "May 3",
  }))

const MyLoansScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="bg-blue-700 p-4">
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">My Loans</Text>
          <View className="flex-row">
            <TouchableOpacity className="mr-4">
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="refresh" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row bg-blue-600 rounded-full">
          <TouchableOpacity className="flex-1 bg-white rounded-full py-2">
            <Text className="text-center text-blue-700">Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-2">
            <Text className="text-center text-white">Events</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-white p-4 border-b border-gray-200">
            <Image
              source={{ uri: "https://via.placeholder.com/50" }}
              className="w-12 h-12 rounded-full mr-4"
            />
            <View className="flex-1">
              <Text className="font-bold">{item.name}</Text>
              <Text className="text-gray-600">{item.username}</Text>
            </View>
            <View>
              <Text className="text-blue-700 font-bold">{item.amount}</Text>
              <Text className="text-gray-500 text-right">
                Edited {item.editedDate}
              </Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity className="absolute bottom-6 right-6 bg-blue-700 rounded-full p-4">
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default MyLoansScreen
