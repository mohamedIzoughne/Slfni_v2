import React, { useContext, useEffect, useState } from "react"
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native"
import useHttp from "../../hooks/useHttp"
import { Context } from "../../store"
import { formatDateToDayMonthDay } from "../../utils"
import { useNavigation } from "@react-navigation/native"

const Event = ({ item, isAdmin }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("EventDetails", { eventId: item.id, isAdmin })
      }
      className="flex-row  p-2 pl-5 mb-2 rounded-2xl bg-white dark:bg-gray-200"
    >
      <View className="  mr-5">
        <Image
          source={require("../../../assets/event_image.jpg")}
          className="w-[79px] h-[92px] rounded-lg"
        />
      </View>
      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text className="text-[#003566]">
            {formatDateToDayMonthDay(item.startingDate)}
          </Text>
          {isAdmin ? (
            item.isPaid ? (
              <Text className="text-[#1C9D21] font-medium">Settled</Text>
            ) : (
              <Text className="text-[#FE6381] font-medium">Unsettled</Text>
            )
          ) : item.hasAdminAcceptedPayment ? (
            <Text className="text-[#1C9D21] font-medium">Paid</Text>
          ) : (
            <Text className="text-[#FE6381] font-medium">Not paid</Text>
          )}
        </View>
        <View>
          <Text className="text-xl  font-medium">
            {item.name || "--------"}
          </Text>
          <Text
            className="text-sm text-gray-500"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Events = ({ className }) => {
  const { sendData, isLoading } = useHttp()
  const { userConfiguration } = useContext(Context)
  const [MemberEvents, setMemberEvents] = useState([])
  const [adminEvents, setAdminEvents] = useState([])
  useEffect(() => {
    Promise.all([
      sendData(
        "/events/admin",
        {
          headers: {
            Authorization: `Bearer ${userConfiguration.accessToken}`,
          },
        },

        (data) => {
          setAdminEvents(data.events)
        }
      ),
      sendData(
        "/events/member",
        {
          headers: {
            Authorization: `Bearer ${userConfiguration.accessToken}`,
          },
        },

        (data) => {
          setMemberEvents(data.events)
        }
      ),
    ]).catch((error) => {
      Alert.alert("Error", error, [{ text: "OK" }])
    })
  }, [])

  return (
    <View className={"flex-1 " + className}>
      {adminEvents.length > 0 && (
        <View>
          <Text className="text-sm font-bold text-gray-500  ml-4 my-3">
            Administrative Events
          </Text>
          <FlatList
            data={adminEvents}
            className="px-3 py-3 flex-1s"
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Event isAdmin={true} item={item} />}
          />
        </View>
      )}
      {MemberEvents.length > 0 && (
        <View>
          <Text className="text-sm font-bold text-gray-500 mt-3 ml-4">
            Personal Events
          </Text>
          <FlatList
            data={MemberEvents}
            className="px-3 py-3 mb-4"
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Event isAdmin={false} item={item} />}
          />
        </View>
      )}
    </View>
  )
}

export default Events
