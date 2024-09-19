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
} from "react-native"
import { styled } from "nativewind"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import IconEntypo from "react-native-vector-icons/Entypo"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import useHttp from "../hooks/useHttp"
import { useContext, useEffect, useState } from "react"
import { Context } from "../store/index"

const notis = [
  {
    amount: "50",
    contextType: "event",
    date: "2024-09-15T12:00:00.000Z",
    id: 1001,
    imageUrl: null,
    name: "John Doe",
    priority: 2,
    title: "Event Canceled",
    type: "eventCanceled",
    withOpinion: false,

    senderName: "Mohamed Izourne",
    isSeen: true,
  },
  {
    amount: "30",
    contextType: "loan",
    date: "2024-09-14T11:00:00.000Z",
    id: 1002,
    imageUrl: null,
    name: "Jane Smith",
    priority: 3,
    title: "Payment Received",
    type: "paymentReceived",
    withOpinion: false,
    senderName: "Mohamed Izourne",
    isSeen: false,
  },
  {
    amount: "70",
    contextType: "event",
    date: "2024-09-13T10:00:00.000Z",
    id: 1003,
    imageUrl: null,
    name: "Alice Johnson",
    priority: 3,
    title: "Event Invitation",
    type: "eventInvitation",
    withOpinion: true,
    senderName: "Mohamed Izourne",
    isSeen: false,
  },
  {
    amount: "100",
    contextType: "loan",
    date: "2024-09-12T09:00:00.000Z",
    id: 1004,
    imageUrl: null,
    name: "Bob White",
    priority: 4,
    title: "Lending Initiated",
    type: "lendingInitiated",
    withOpinion: true,
    senderName: "Mohamed Izourne",
    isSeen: false,
  },
  {
    amount: "60",
    contextType: "loan",
    date: "2024-09-11T08:00:00.000Z",
    id: 1005,
    imageUrl: null,
    name: "Charles Green",
    priority: 1,
    title: "Successfully Paid",
    type: "successfullyPaid",
    withOpinion: false,
    senderName: "Mohamed Izourne",
    isSeen: true,
  },
  {
    amount: "80",
    contextType: "loan",
    date: "2024-09-10T07:00:00.000Z",
    id: 1006,
    imageUrl: null,
    name: "David Black",
    priority: 3,
    title: "Borrowing Initiated",
    type: "borrowingInitiated",
    withOpinion: true,
    senderName: "Mohamed Izourne",
    isSeen: false,
  },
  {
    amount: "25",
    contextType: "loan",
    date: "2024-09-09T06:00:00.000Z",
    id: 1007,
    imageUrl: null,
    name: "Eve Brown",
    priority: 4,
    title: "Refused Payment",
    type: "refusedPayment",
    withOpinion: false,
    senderName: "Mohamed Izourne",
    isSeen: true,
  },
  {
    amount: "45",
    contextType: "event",
    date: "2024-09-08T05:00:00.000Z",
    id: 1008,
    imageUrl: null,
    name: "Frank Yellow",
    priority: 4,
    title: "Member Refused",
    type: "memberRefused",
    withOpinion: false,
    senderName: "Mohamed Izourne",
    isSeen: true,
  },
  {
    amount: "55",
    contextType: "event",
    date: "2024-09-07T04:00:00.000Z",
    id: 1009,
    imageUrl: null,
    name: "George Blue",
    priority: 2,
    title: "Event Updated",
    type: "eventUpdated",
    withOpinion: false,
    senderName: "Mohamed Izourne",
    isSeen: false,
  },
  {
    amount: "90",
    contextType: "loan",
    date: "2024-09-06T03:00:00.000Z",
    id: 1010,
    imageUrl: null,
    name: "Hannah Red",
    priority: 4,
    title: "Refuse Lending",
    type: "refuseLending",
    withOpinion: true,
    senderName: "Mohamed Izourne",
    isSeen: true,
  },
  {
    amount: "75",
    contextType: "event",
    date: "2024-09-05T02:00:00.000Z",
    id: 1011,
    imageUrl: null,
    name: "Ivy Pink",
    priority: 3,
    title: "User Paid Event",
    type: "userPaidEvent",
    withOpinion: false,
    senderName: "Mohamed Izourne",
    isSeen: false,
  },
  {
    amount: "85",
    contextType: "loan",
    date: "2024-09-04T01:00:00.000Z",
    id: 1012,
    imageUrl: null,
    name: "Jack Purple",
    priority: 4,
    title: "Admin Declined Paying",
    type: "adminDeclinedPaying",
    withOpinion: false,
    senderName: "Mohamed Izourne",
    isSeen: true,
  },
]
const makeMessage = (senderName, type, title, amount = "") => {
  const messages = {
    eventCanceled: (
      <Text>
        The event <Text className="font-bold">{title}</Text> has been canceled.
        Please acknowledge this update.
      </Text>
    ),
    paymentReceived: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has sent a payment for
        your loan. Please confirm receipt.
      </Text>
    ),
    eventInvitation: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has invited you to the
        event <Text className="font-bold">"{title}"</Text> with an amount of{" "}
        {amount}. Do you accept this invitation?
      </Text>
    ),
    lendingInitiated: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has created a loan
        request of <Text className="font-bold">{title}</Text>. Do you accept
        this transaction?
      </Text>
    ),
    successfullyPaid: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has confirmed that the
        loan <Text className="font-bold">"{title}"</Text> has been fully paid.
        The transaction is now closed.
      </Text>
    ),
    borrowingInitiated: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has declared that you
        have lent them money.
      </Text>
    ),
    refusedPayment: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has refused your payment
        declaration for the loan <Text className="font-bold">"{title}"</Text>.
        They state that the debt has not been fully cleared. Please resolve this
        disagreement.
      </Text>
    ),
    memberRefused: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has declined the
        invitation to join the event as a member. Your participation has been
        canceled.
      </Text>
    ),
    eventUpdated: (
      <Text>
        The event <Text className="font-bold">"{title}"</Text> has been updated.
        Please review the changes and confirm your participation.
      </Text>
    ),
    refuseLending: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has refused your lending
        declaration. The transaction has not been accepted.
      </Text>
    ),
    userPaidEvent: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has declared that the
        payment for the event has been completed.
      </Text>
    ),
    adminDeclinedPaying: (
      <Text>
        The admin (<Text className="font-bold">{senderName}</Text>) has declined
        your payment declaration for the event "{title}". Please review and
        update the payment details.
      </Text>
    ),
  }
  return messages[type]
}

const NotificationItem = ({ item }) => {
  // actually not all of them it's just 4 I guess

  return (
    <View className="text-[#5A5A5A] p-6 pb-7  rounded-lg flex-row items-start border-b border-solid border-[#6999c6] border-opacity-70">
      <View className="w-9 h-9 rounded-full mr-2 overflow-hidden">
        <Image
          className="w-full h-full"
          style={{ resizeMode: "cover" }}
          source={
            item.imageUrl
              ? { uri: item.imageUrl }
              : require("../../assets/koro.png")
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
        {/* <TouchableOpacity className="flex-row justify-end mt-4">
          <Text className="text-primary">Mark as read</Text>
          <Ionicons
            className="ml-1 overflow-hidden relative -bottom-[2px]"
            name="checkmark-done-outline"
            size={15}
            color="#00B8B9"
          />
        </TouchableOpacity> */}
      </View>

      <View className="items-center">
        <Text className="text-[#94A3B8] text-xs mb-[2px] mt-2">15h</Text>
        <SimpleLineIcons name="options" size={15} color="#2F5B84" />
      </View>
    </View>
  )
}

const WithOpinionNotification = ({ item }) => {
  // actually not all of them it's just 4 I guess

  return (
    <View className="text-[#5A5A5A] p-6 pb-7  rounded-lg flex-row items-start border-b border-solid border-[#6999c6] border-opacity-70">
      <View className="w-9 h-9 rounded-full mr-2 overflow-hidden">
        <Image
          className="w-full h-full"
          style={{ resizeMode: "cover" }}
          source={
            item.imageUrl
              ? { uri: item.imageUrl }
              : require("../../assets/koro.png")
          }
        />
      </View>

      <View className="flex-1">
        <Text className="mb-1 mt-[2px] text-[#003566] pr-2 tracking-wider">
          {makeMessage(item.senderName, item.type, item.title, item.amount)}
        </Text>
        <View className="flex-row mt-2">
          <Pressable
            style={{ width: 84, borderRadius: 4 }}
            className="bg-primary focus:bg-white mr-3 items-center  py-2 rounded-[4px]"
          >
            <Text className="text-white text-sm">Accept</Text>
          </Pressable>
          <Pressable
            style={{ width: 84, borderRadius: 4 }}
            className="border border-solid border-primary py-2 items-center"
          >
            <Text className="text-primary text-sm">Decline</Text>
          </Pressable>
        </View>
      </View>

      <View className="items-center">
        <Text className="text-[#94A3B8] text-xs mb-[2px] mt-2">15h</Text>
        <SimpleLineIcons name="options" size={15} color="#2F5B84" />
      </View>
    </View>
  )
}

let fixedNotifications = []

const NotificationsScreen = ({ navigation }) => {
  const { sendData, isLoading } = useHttp()
  const { userConfiguration } = useContext(Context)
  const [notifications, setNotifications] = useState([])
  const [notificationType, setNotificationType] = useState("All")
  const [isSeenCount, setIsSeenCount] = useState(0)

  useEffect(() => {
    fixedNotifications = notis
    setNotifications(notis)
    const seenNotificationsCount = notis.filter(
      (notification) => notification.isSeen
    ).length
    setIsSeenCount(seenNotificationsCount)

    // sendData(
    //   "/notifications",
    //   {
    //     headers: {
    //       authorization: `Bearer ${userConfiguration.accessToken}`,
    //     },
    //   },
    //   (data) => {
    //     setNotifications(data.notifications)
    //     fixedNotifications = data.notifications

    //     const seenNotificationsCount = data.notifications.filter(
    //       (notification) => notification.isSeen
    //     ).length
    //     setIsSeenCount(seenNotificationsCount)
    //   },
    //   (err) => {
    //     console.log(err)
    //   }
    // )
  }, [])

  console.log(notifications)

  const handleNotificationTypeChange = (type) => {
    setNotificationType(type)
    setNotifications((notifications) => {
      let filteredNotifications = [...fixedNotifications]

      const condition = {
        All: () => true,
        Loans: (notification) => notification.contextType === "loan",
        Events: (notification) => notification.contextType === "event",
      }

      filteredNotifications = filteredNotifications.filter(
        condition[type] || condition.All
      )

      return filteredNotifications
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <View className="bg-primary px-4 pt-8">
        <View className="flex-row items-center">
          <TouchableOpacity
            className="bg-background-light size-[26px] justify-center items-center rounded-full"
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
                handleNotificationTypeChange(item)
              }}
            >
              <Text
                className={`${
                  item === notificationType ? "text-white" : "text-gray-400"
                }`}
              >
                {item}
              </Text>
              {isSeenCount > 0 && item === "All" && (
                <View className="bg-[#64748B] bg-opacity-25 ml-2 size-[23px] rounded-full justify-center items-center">
                  <Text className="text-xs text-[#E2E8F0]">{isSeenCount}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </View>
      {notifications.length !== 0 ? (
        <FlatList
          data={notifications}
          renderItem={({ item }) =>
            item.withOpinion ? (
              <WithOpinionNotification item={item} />
            ) : (
              <NotificationItem item={item} />
            )
          }
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View className="flex-1 justify-start items-center mt-16">
          <Image
            source={require("../../assets/icons/no-notifications.png")}
            style={{ width: 325, height: 325, marginBottom: 20 }}
          />
          <Text className="text-4xl text-[#757575] mt-4">
            Nothing New Here !
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default NotificationsScreen

// const NotificationsScreen = () => {
//   return (
//     <View>
//       <Text>Hello world</Text>
//     </View>
//   )
// }

// export default NotificationsScreen
