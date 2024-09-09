import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native"
import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "react-native-vector-icons"
// import { styled } from "nativewind"
import { LinearGradient } from "expo-linear-gradient"
import Svg, { Circle } from "react-native-svg"
import IncreaseGraphArrow from "../../assets/icons/streamline_graph-arrow-increase.svg"
import DecreaseGraphArrow from "../../assets/icons/streamline_graph-arrow-decrease.svg"

const buttons = [
  { title: "Create a lending", icon: "cash-plus", color: "bg-orange-400" },
  { title: "Start a borrowing", icon: "rocket-launch", color: "bg-sky-400" },
  {
    title: "Pay off a lending",
    icon: "credit-card-check",
    color: "bg-red-400",
  },
  { title: "Organize an Event", icon: "calendar-plus", color: "bg-purple-400" },
  { title: "Your Events", icon: "clock-outline", color: "bg-pink-500" },
  { title: "History", icon: "history", color: "bg-emerald-400" },
  { title: "Your borrowings", icon: "account-cash", color: "bg-violet-400" },
]

const DashboardButton = ({ title, icon, color }) => (
  <TouchableOpacity
    className={`flex-row  items-center p-1 rounded-xl min-h-20 bg-white shadow-md mb-4 ml-1`}
  >
    <View className={`${color} w-9 h-9 justify-center items-center rounded-md`}>
      <MaterialCommunityIcons name={icon} size={20} color="white" />
    </View>
    <Text className="ml-3 text-[#828282]  text-sm">{title}</Text>
  </TouchableOpacity>
)

const LendingDashboard = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100 mt-2">
      <View className="flex-row flex-wrap justify-between">
        {buttons.map((button, index) => (
          <View key={index} className="w-[49%] ">
            <DashboardButton {...button} />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default function Dashboard({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isPopupShown, setIsPopupShown] = useState(false)
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev)

  const showPopUp = () => {
    console.log("Yesss")
    setIsPopupShown((prev) => !prev)
  }
  return (
    <View
      className={`flex-1 px-5  ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/* Header */}
      <View className="relative  flex-row justify-between items-center mt-8 mb-5">
        <TouchableOpacity onPress={showPopUp}>
          <Image
            source={require("../../assets/koro.png")}
            className="w-12 h-12 rounded-full"
          />
        </TouchableOpacity>
        <View className="relative">
          <TouchableOpacity onPress={() => navigation.navigate("notification")}>
            <Ionicons
              name="notifications-outline"
              size={28}
              color={isDarkMode ? "white" : "black"}
            />
          </TouchableOpacity>
          <View className="bg-primary absolute top-[2px] right-[1px] justify-center items-center w-[11px] h-[11px] rounded-full">
            <Text className="text-[8px] text-white">3</Text>
          </View>
        </View>
        <View
          className={
            !isPopupShown
              ? "hidden"
              : "flex absolute -bottom-[85px] left-10 bg-white rounded-lg shadow-lg"
          }
        >
          <View className="flex-row items-center gap-3 border-b border-solid border-gray-200 p-3">
            <Ionicons name="settings-outline" size={20} color="#C4C4C4" />
            <Text>Settings</Text>
          </View>

          <View className="p-3 flex-row gap-3 justify-between items-center">
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={25}
              color="#C4C4C4"
            />
            <Text>Dark Mode</Text>
            {/* <Switch value={isDarkMode} onValueChange={toggleDarkMode} /> */}
          </View>
        </View>
      </View>

      <View className="flex-row gap-3 justify-between">
        <LinearGradient
          colors={["#F46403", "#EF0D74"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            height: 256,
            borderRadius: 8,
            // padding: 16,
            // justifyContent: "center",
            alignItems: "flex-start",
            textAlign: "left",
            padding: 0,
            position: "relative",
          }}
        >
          <MaterialIcons
            style={{ textAlign: "center" }}
            name="balance"
            size={180}
            color="rgba(255, 255, 255, 0.42)"
          />
          <View className="absolute bottom-0 left-0 right-0 p-4">
            <Text className="text-white -mb-3">Balance</Text>
            <Text className="text-white text-2xl font-bold mt-2">- 50Dh</Text>
          </View>
        </LinearGradient>
        <View className="flex-1 gap-3">
          <View className="flex-1 rounded-lg items-start text-left p-0 relative bg-[#BB5ECA]">
            {/* <MaterialIcons
              className="text-center"
              name="balance"
              size={180}
              color="rgba(255, 255, 255, 0.42)"
            /> */}
            {/* <IncreaseGraphArrow width={100} height={100} /> */}

            <IncreaseGraphArrow
              style={{ marginLeft: -10, marginTop: -25 }}
              width={180}
            />

            <View className="absolute bottom-0 left-0 right-0 p-4">
              <Text className="text-white -mb-3">Lending</Text>
              <Text className="text-white text-2xl font-bold mt-2">50Dh</Text>
            </View>
          </View>
          <View className="flex-1 rounded-lg items-start text-left p-0 relative bg-[#8E5ECA]">
            <DecreaseGraphArrow
              style={{ marginLeft: -10, marginTop: -5 }}
              width={180}
            />
            <View className="absolute bottom-0 left-0 right-0 p-4">
              <Text className="text-white -mb-3">Borrowing</Text>
              <Text className="text-white text-2xl font-bold mt-2">100Dh</Text>
            </View>
          </View>
        </View>
      </View>

      <LendingDashboard />
      {/* Bottom Tab Navigation (Placeholder) */}
      {/* <View className="absolute bottom-0 left-0 right-0 flex-row justify-around py-4 bg-white border-t border-gray-200">
        <TouchableOpacity>
          <Ionicons name="home-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={28} color="black" />
        </TouchableOpacity>
      </View> */}
    </View>
  )
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
})
