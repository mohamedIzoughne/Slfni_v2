import React, { useContext, useEffect, useState } from "react"
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import IconEntypo from "react-native-vector-icons/Entypo"
import { Octicons } from "react-native-vector-icons"
import useHttp from "../../hooks/useHttp"
import { Context } from "../../store"
import { formatDateToLongMonthAndDay } from "../../utils/index"

const dummyData = Array(10)
  .fill()
  .map((_, index) => ({
    id: index + 1705,
    name: "Mohamed Izourne",
    username: "@izourne",
    amount: "350 DH",
    editedDate: "May 3",
  }))

const Friend = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-background-light px-4 py-4"
    >
      <View
        style={{ borderRadius: 16 }}
        className="bg-primary mr-4 p-2 rounded-[16px]"
      >
        <Image
          source={require("../../../assets/person.png")}
          className="w-12 h-12 rounded-full "
        />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-[#003566] text-sm ">{item.name}</Text>
        <Text className="text-gray-600 ">@{item.username}</Text>
      </View>
      <View>
        <Text className="text-primary text-right text-xs">
          {item.updatedAt
            ? formatDateToLongMonthAndDay(item.updatedAt)
            : "No loan"}
        </Text>
        <View className="bg-primary py-1 px-1 justify-center items-center rounded-md mt-2">
          <Text
            className={`text-white font-bold text-xs ${
              item.settled ? "line-through" : ""
            }`}
          >
            {parseFloat(item.lendingBalance)
              .toFixed(2)
              .replace(/\.?0+$/, "")}
            Dh
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const MyLoansScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([])
  const { sendData } = useHttp()
  const { userConfiguration } = useContext(Context)
  console.log("---------")
  useEffect(() => {
    sendData(
      "/friendship/v2",
      {
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
        },
      },
      (data) => {
        console.log(data)
        console.log("----datas")
        setFriends(data.relationships)
      },
      (error) => {
        Alert.alert("Error", error, [{ text: "OK" }])
        console.log(error)
      }
    )
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <View className="bg-primary px-4 pt-8 pb-4">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            className="bg-background-light size-[26px] justify-center items-center rounded-full"
            onPress={() => navigation.navigate("Home")}
          >
            <IconEntypo name="chevron-thin-left" size={15} color="#000" />
          </TouchableOpacity>
          <Text className="mx-auto text-white font-bold text-xl mr-auto">
            Notifications
          </Text>
          <TouchableOpacity className="bg-background-light size-[26px] justify-center items-center rounded-full ml-auto">
            <Ionicons name="search-outline" size={12} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-background-light size-[26px] justify-center items-center rounded-full ml-2">
            <Octicons name="history" size={12} color="#000" weight="lighter" />
          </TouchableOpacity>
        </View>

        <View
          style={{ width: 250, maxWidth: "90%" }}
          className="flex-row bg-white mx-auto rounded-full overflow-hidden border border-solid border-black"
        >
          <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 border-2 border-t-0 border-b-0 border-l-0 border-solid border-black">
            <IconEntypo name="check" size={14} color="#2F5B84" />
            <Text className="text-center text-primary font-bold ml-1">
              Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3 bg-primary">
            <Text className="text-center text-white font-bold">Events</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={friends}
        className="px-3 py-3 mb-3"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Friend
            onPress={() => {
              console.log(item.id)
              navigation.navigate("UserActivity", {
                imageUrl: item.imageUrl,
                friendId: item.id,
                name: item.name,
                username: item.username,
                lendingBalance: item.lendingBalance,
                settled: item.settled,
              })
            }}
            key={item.id}
            item={item}
          />
        )}
      />
      <TouchableOpacity
        style={{ borderRadius: 9, backgroundColor: "#0F3B64" }}
        className="absolute bottom-6 right-6 bg-[#0F3B64]  p-3"
      >
        <Ionicons name="add" size={26} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default MyLoansScreen
