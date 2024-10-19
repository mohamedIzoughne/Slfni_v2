import React, { useEffect, useContext, useState, useCallback } from "react"
import { Context } from "../../store"
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ToastAndroid,
  Pressable,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import IconEntypo from "react-native-vector-icons/Entypo"
import useHttp from "../../hooks/useHttp"
import Icon from "react-native-vector-icons/MaterialIcons"
import { Modal } from "../../components/UI/Modal"
import { LabeledInput } from "../authentication/Signup"

const EventDetailsScreen = ({ route, navigation }) => {
  const { sendData, isLoading } = useHttp()
  const { eventId, isAdmin = false } = route.params
  const { userConfiguration } = useContext(Context)
  const [event, setEvent] = useState({})
  const [isInChangingMode, setIsInChangingMode] = useState(false)
  const [eventName, setEventName] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventPrice, setEventPrice] = useState(0)
  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    sendData(
      `/events/${isAdmin ? "admin" : "member"}/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
        },
      },
      (data) => {
        console.log(data)
        setEvent(data.event)
        if (isAdmin) {
          setEventName(data.event.name)
          setEventPrice(data.event.defaultPrice)
          setEventDescription(data.event.description)
        } else {
          setIsPaid(data.event.isPaid)
        }
      },
      (error) => {
        Alert.alert("Error", error, [{ text: "OK" }])
      }
    )
  }, [])

  const submitHandler = () => {
    if (!isAdmin) {
      if (isPaid) {
        Alert.alert("Error", "The event is Already paid", [{ text: "OK" }])
      } else {
        sendData(
          `/events/mark-event-as-paid/${eventId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${userConfiguration.accessToken}`,
            },
          },
          (data) => {
            setIsPaid(true)
            ToastAndroid.show(data.message, ToastAndroid.SHORT)
          },
          (error) => {
            Alert.alert("Error", error, [{ text: "OK" }])
          }
        )
      }

      return
    }

    if (!isInChangingMode) {
      setIsInChangingMode(true)
      return
    }
    // change event data
    sendData(
      `/events/update-event/${eventId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
        },
        body: JSON.stringify({
          eventName,
          description: eventDescription,
          defaultPrice: parseFloat(eventPrice),
          oldMembers: event.members.map((member) => member.id),
        }),
      },
      (data) => {
        console.log("The event", data.event)
        setEvent((event) => ({ members: event.members, ...data.event }))
        setIsInChangingMode(false)
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      },
      (error) => {
        setIsInChangingMode(false)
        Alert.alert("Error", error, [{ text: "OK" }])
      }
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <Modal
        onPress={() => setIsInChangingMode(false)}
        isVisible={isInChangingMode}
      >
        <Modal.Container>
          <Modal.Header title="Edit Profile" />
          <Modal.Body>
            <Text className="text-sm  mb-4 text-gray-500 dark:text-gray-400 text-center">
              Update Your Profile Information
            </Text>
            <LabeledInput
              label="Event name"
              value={eventName}
              onChangeText={setEventName}
              placeholder="Enter event name"
            />
            <LabeledInput
              label="Event description"
              multiline
              numberOfLines={8}
              maxLength={250}
              value={eventDescription}
              onChangeText={setEventDescription}
              placeholder="Enter event description"
              textAlignVertical="top"
            />
            <LabeledInput
              label="Event price"
              value={eventPrice}
              onChangeText={setEventPrice}
              keyboardType="numeric"
              placeholder="Enter event price"
            />
          </Modal.Body>
          <Modal.Footer>
            <TouchableOpacity
              onPress={() => setIsInChangingMode(false)}
              className="ml-auto px-5 py-2 rounded-md"
            >
              <Text className="dark:text-background">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={submitHandler}
              className="bg-primary px-5 py-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white">Save</Text>
              )}
            </TouchableOpacity>
          </Modal.Footer>
        </Modal.Container>
      </Modal>

      <ScrollView>
        <View className="flex-row items-center p-4 bg-primary">
          <TouchableOpacity
            className="p-2 pl-0"
            onPress={() => navigation.goBack()}
          ></TouchableOpacity>
          <IconEntypo name="chevron-thin-left" size={15} color="#fff" />
          <Text className="text-white text-lg font-bold ml-4">
            Event Details
          </Text>
        </View>

        <View className="p-4 mt-4">
          <View className="flex-row items-center mb-3">
            <Image
              source={
                event?.adminImageUrl
                  ? { uri: event?.adminImageUrl }
                  : require("../../../assets/person.png")
              }
              className="w-[45px] h-[45px] rounded-full mr-2"
            />
            <Text className="text-lg font-bold -mt-2 dark:text-background">
              {event?.adminName}
            </Text>
          </View>

          <Text className="text-2xl font-bold mb-1 mt-2 dark:text-background">
            {event.name}
          </Text>

          <View className="mb-4 p-1">
            <Text className="mb-0 dark:text-background">Description</Text>
            <Text className=" text-[#979797]">{event.description}</Text>
          </View>

          <View className="flex-row justify-between p-2 mb-4">
            <Text className="text-sm dark:text-background">Price</Text>
            <Text
              className={`text-lg font-bold text-red-500 ${
                isPaid ? "line-through" : ""
              }`}
            >
              {event.defaultPrice} Dh
            </Text>
          </View>

          <View className="p-2">
            <Text className="text-lg font-bold mb-2 dark:text-background">
              Members
            </Text>
            <ScrollView
              contentContainerStyle={{
                gap: 10,
                flexDirection: "row",
                // alignItems: "center",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {event?.members?.map((member) => (
                <Member
                  setEvent={setEvent}
                  key={member.id}
                  member={member}
                  eventId={event.id}
                  isAdmin={isAdmin}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={submitHandler}
        style={{ borderRadius: 9, backgroundColor: "#0F3B64" }}
        className={`absolute bottom-24 right-12 bg-[#0F3B64] p-3  `}
      >
        <Icon
          name={isInChangingMode || !isAdmin ? "done" : "edit"}
          size={20}
          color="#FFF"
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

function Member({ member, eventId, isAdmin = false, setEvent }) {
  const { userConfiguration } = useContext(Context)
  const { sendData, isLoading } = useHttp()

  const deleteHandler = useCallback(() => {
    sendData(
      `/events/remove-member/${eventId}/${member.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
        },
        body: JSON.stringify({
          memberId: member.id,
        }),
      },
      (data) => {
        Alert.alert("Success", data.message, [{ text: "OK" }])
        setEvent((prev) => {
          return {
            ...prev,
            members: prev.members.filter((m) => m.id !== member.id),
          }
        })
      },
      (error) => {
        Alert.alert("Error", error, [{ text: "OK" }])
      }
    )
  }, [member.id, eventId])

  const onDeletePressed = () => {
    Alert.alert("Are you sure?", "You want to delete this member?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: deleteHandler,
      },
    ])
  }

  return (
    <View className="items-center mb-3 bg-white dark:bg-gray-800 rounded-lg p-3">
      <Image
        source={require("../../../assets/person.png")}
        className="size-[50px] rounded-full mb-2 mr-2"
      />
      <Text className="font-light mb-1 break-words w-[70px] text-center dark:text-white">
        {member.name}
      </Text>
      {isAdmin && (
        <TouchableOpacity
          onPress={onDeletePressed}
          className={`bg-red-500 ${
            isLoading && "opacity-30"
          } w-[81px]  py-1 rounded-md mt-2`}
        >
          <Text className=" text-white text-center  ">Delete</Text>
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity className="bg-red-500 w-[81px]  py-1 rounded-md mt-2">
        <Text className=" text-white text-center  ">Delete</Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default EventDetailsScreen
