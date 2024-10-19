import React, { useState, useEffect, useContext } from "react"
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native"
import useHttp from "../../hooks/useHttp"
import { Context } from "../../store"
import { formatDateToLongMonthAndDay } from "../../utils"
import { useNavigation } from "@react-navigation/native"

const Relationship = ({ item, onPress }) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center px-3 mx-2 py-3 rounded-2xl ${
        isDarkMode ? "bg-gray-200" : "bg-transparent"
      }`}
    >
      <View
        style={{ borderRadius: 16 }}
        className="bg-primary dark:bg-background-dark mr-4 p-2 rounded-[16px]"
      >
        <Image
          source={require("../../../assets/person.png")}
          className="w-12 h-12 rounded-full "
        />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-[#003566] dark:text-background-dark text-sm ">
          {item.name}
        </Text>
        <Text className="text-gray-600 ">@{item.username}</Text>
      </View>
      <View>
        <Text className="text-primary dark:text-background-dark text-right text-xs">
          {item.updatedAt
            ? formatDateToLongMonthAndDay(item.updatedAt)
            : "No loan"}
        </Text>
        <View className="bg-primary dark:bg-background-dark py-1 px-1 justify-center items-center rounded-md mt-2">
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

const Relationships = ({ className }) => {
  const [relationships, setRelationships] = useState([])
  const navigation = useNavigation()
  const { sendData } = useHttp()
  const { userConfiguration } = useContext(Context)
  useEffect(() => {
    sendData(
      "/friendship/v2",
      {
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
        },
      },
      (data) => {
        setRelationships(data.relationships)
      },
      (error) => {
        Alert.alert("Error", error, [{ text: "OK" }])
      }
    )
  }, [])

  return (
    <FlatList
      data={relationships}
      className={"px-3 py-3 mb-3 " + className}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Relationship
          onPress={() => {
            navigation.navigate("UserActivity", {
              imageUrl: item.imageUrl,
              friendId: item.id,
              name: item.name,
              username: item.username,
              lendingBalance: item.lendingBalance,
              settled: item.settled,
            })
          }}
          item={item}
        />
      )}
    />
  )
}

export default Relationships
