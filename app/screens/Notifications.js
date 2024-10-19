// import React from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Pressable,
  StyleSheet,
  ToastAndroid,
  Alert,
} from "react-native"
import { styled } from "nativewind"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import IconEntypo from "react-native-vector-icons/Entypo"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import useHttp from "../hooks/useHttp"
import { useContext, useEffect, useState, useCallback } from "react"
import { Context } from "../store/index"
import {
  getNotificationsApiOptions,
  makeMessage,
} from "../utils/notificationHandlers"
import { formatRelativeTime } from "../utils"

const filterConditions = {
  All: () => true,
  Loans: (notification) => notification.contextType === "loan",
  Events: (notification) => notification.contextType === "event",
}

const DeleteNotificationButton = ({ notificationId, isSeen }) => {
  const [isShowed, setIsShowed] = useState(false)
  const { sendData } = useHttp()
  const { userConfiguration, notificationFilterHandler } = useContext(Context)

  const isShowedHandler = () => {
    setIsShowed((prev) => !prev)
  }

  const deleteNotificationHandler = () => {
    sendData(
      `/notifications/${notificationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
        },
      },
      (data) => {
        notificationFilterHandler(notificationId, isSeen)
      },
      (err) => {
        Alert.alert("Error", err, [{ text: "OK" }])
      }
    )
  }

  return (
    <View className="relative z-20 ">
      {isShowed && (
        <View
          style={{ top: 28 }}
          className="absolute z-10 right-0  bg-white rounded-md shadow-md"
        >
          <TouchableOpacity
            onPress={deleteNotificationHandler}
            className="px-4 py-2 border-b border-gray-200"
          >
            <Text className="text-gray-800">Delete from notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={isShowedHandler} className="px-4 py-2">
            <Text className="text-gray-800">Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={isShowedHandler}
        style={{ top: 16 }}
        className="absolute right-0 top-4"
      >
        <SimpleLineIcons name="options" size={15} color="#2F5B84" />
      </TouchableOpacity>
    </View>
  )
}

const NotificationItem = ({ item }) => {
  // actually not all of them it's just 4 I guess

  return (
    <View className="text-[#5A5A5A] p-6 pb-7  rounded-lg flex-row items-start border-b border-solid border-[#6999c6] border-opacity-70 relative z-20">
      {!item.isSeen && (
        <View className="w-2 h-2 rounded-full bg-primary  mt-[13px] mr-1"></View>
      )}
      <View className="w-9 h-9 rounded-full mr-2 overflow-hidden">
        <Image
          className="w-full h-full"
          style={{ resizeMode: "cover" }}
          source={
            item.imageUrl
              ? { uri: item.imageUrl }
              : require("../../assets/person.png")
          }
        />
      </View>

      <View className="flex-1">
        <Text className="text-primary font-semibold text-sm mt-[2px]">
          {item.senderName}
        </Text>
        <Text className="mb-1 mt-[2px] text-[#003566] pr-2 tracking-wider">
          {makeMessage(item.senderName, item.type, item.title, item.amount)}
        </Text>
      </View>

      <View style={{ zIndex: 10 }}>
        <View className="relative">
          <Text className="absolute top-0 right-0 text-[#94A3B8] text-xs mb-[2px]">
            {formatRelativeTime(item.createDate)}
          </Text>
        </View>
        <DeleteNotificationButton
          isSeen={item.isSeen}
          notificationId={item.id}
        />
      </View>
    </View>
  )
}

const WithOpinionNotification = ({ item, accessToken }) => {
  // actually not all of them it's just 4 I guess
  const { sendData, isLoading } = useHttp()
  const { notificationFilterHandler } = useContext(Context)

  const acceptHandler = useCallback(() => {
    sendData(
      ...getNotificationsApiOptions(
        accessToken,
        item.type,
        item.id,
        item.loanId,
        item.eventId,
        item.senderId
      ).accept,
      (data) => {
        notificationFilterHandler(item.id, item.isSeen) // I think data should already have those notifications no ?
        if (data.message) {
          ToastAndroid.show(data.message, ToastAndroid.SHORT)
        }
      },
      (err) => {
        Alert.alert("Invalid Input", err, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ])
      }
    )
  }, [item])

  const declineHandler = useCallback(() => {
    sendData(
      ...getNotificationsApiOptions(
        accessToken,
        item.type,
        item.id,
        item.loanId,
        item.eventId,
        item.senderId
      ).refuse,
      (data) => {
        notificationFilterHandler(item.id, item.isSeen) // I think data should already have those notifications no ?
        if (data.message) {
          ToastAndroid.show(data.message, ToastAndroid.SHORT)
        }
      },
      (err) => {
        Alert.alert("Error", err, [{ text: "OK" }])
      }
    )
  }, [item])

  return (
    <View className="text-[#5A5A5A] p-6 pb-7  rounded-lg flex-row items-start border-b border-solid border-[#6999c6] border-opacity-70">
      {!item.isSeen && (
        <View className="w-2 h-2 rounded-full bg-primary  mt-[13px] mr-1"></View>
      )}
      <View className="w-9 h-9 rounded-full mr-2 overflow-hidden">
        <Image
          className="w-full h-full"
          style={{ resizeMode: "cover" }}
          source={
            item.imageUrl
              ? { uri: item.imageUrl }
              : require("../../assets/person.png")
          }
        />
      </View>

      <View className="flex-1">
        <Text className="mb-1 mt-[2px] text-[#003566] pr-2 tracking-wider">
          {makeMessage(item.senderName, item.type, item.title, item.amount)}
        </Text>
        <View className="flex-row mt-2">
          <TouchableOpacity
            onPress={acceptHandler}
            style={{ width: 84, borderRadius: 4 }}
            className="bg-primary focus:bg-white mr-3 items-center  py-2 rounded-[4px]"
          >
            <Text className="text-white text-sm">Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={declineHandler}
            style={{ width: 84, borderRadius: 4 }}
            className="border border-solid border-primary py-2 items-center"
          >
            <Text className="text-primary text-sm">Decline</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="items-center">
        <Text className="text-[#94A3B8] text-xs mb-[2px] mt-2">
          {formatRelativeTime(item.createDate)}
        </Text>
        {/* <SimpleLineIcons name="options" size={15} color="#2F5B84" /> */}
      </View>
    </View>
  )
}

let fixedNotifications = []

const NotificationsScreen = ({ navigation }) => {
  const { sendData, isLoading } = useHttp()
  const { userConfiguration } = useContext(Context)
  const [notificationType, setNotificationType] = useState("All")
  const { notificationsData, notificationsHandler } = useContext(Context)
  const [showedNotifications, setShowedNotifications] = useState([])

  useEffect(() => {
    setShowedNotifications(() => {
      let filteredNotifications = [...notificationsData.notifications]

      filteredNotifications = filteredNotifications.filter(
        filterConditions[notificationType] || filterConditions.All
      )

      return filteredNotifications
    })
    setShowedNotifications(notificationsData.notifications)
  }, [notificationsData])

  const notificationFilterHandler = (type) => {
    setNotificationType(type)
    setShowedNotifications(() => {
      let filteredNotifications = [...notificationsData.notifications]

      filteredNotifications = filteredNotifications.filter(
        filterConditions[type] || filterConditions.All
      )

      return filteredNotifications
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <View className="bg-primary px-4 pt-8">
        <View className="flex-row items-center">
          <TouchableOpacity
            className="bg-background size-[26px] justify-center items-center rounded-full"
            onPress={() => navigation.navigate("Home")}
          >
            <IconEntypo name="chevron-thin-left" size={15} color="#000" />
          </TouchableOpacity>
          <Text className="mx-auto text-white font-bold text-xl mr-auto">
            Notifications
          </Text>
        </View>
        <View className="mt-7 flex-row gap-3">
          {["All", "Loans", "Events"].map((item, index) => (
            <Pressable
              key={index}
              className={`items-center  border-b-4 border-solid p-4 flex-row ${
                item === notificationType
                  ? "border-[#2E70E8]"
                  : "border-transparent"
              } `}
              onPress={() => {
                notificationFilterHandler(item)
              }}
            >
              <Text
                className={`${
                  item === notificationType ? "text-white" : "text-gray-400"
                }`}
              >
                {item}
              </Text>
              {notificationsData.unSeenCount > 0 && item === "All" && (
                <View className="bg-[#64748B] bg-opacity-25 ml-2 size-[23px] rounded-full justify-center items-center">
                  <Text className="text-xs text-[#E2E8F0]">
                    {notificationsData.unSeenCount}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </View>
      {showedNotifications.length !== 0 ? (
        <FlatList
          data={showedNotifications}
          renderItem={({ item }) =>
            item.withOpinion ? (
              <WithOpinionNotification
                setNotifications={notificationsHandler}
                accessToken={userConfiguration.accessToken}
                item={item}
              />
            ) : (
              <NotificationItem
                setNotifications={notificationsHandler}
                item={item}
              />
            )
          }
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View className="flex-1 justify-start items-center mt-16">
          <Image
            source={require("../../assets/icons/no-notifications.png")}
            style={{ width: 239.46, height: 340.28, marginBottom: 20 }}
          />
          <Text className="text-4xl text-gray-500 dark:text-gray-400 mt-4">
            Nothing New Here !
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default NotificationsScreen
