import React, { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import IconEntypo from "react-native-vector-icons/Entypo"
import { Octicons } from "react-native-vector-icons"
import Relationships from "../../components/Loans/Relationships"
import Events from "../../components/Loans/Events"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated"

const MyLoansScreen = ({ navigation, route }) => {
  const [isRelationships, setIsRelationships] = useState(true)
  const animatedValue = useSharedValue(0)

  const toggleView = useCallback(() => {
    setIsRelationships((prev) => !prev)
    animatedValue.value = withTiming(isRelationships ? 1 : 0, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })
  }, [isRelationships])

  const animatedStyleRelationships = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, [0, 1], [1, 0])
    const translateX = interpolate(animatedValue.value, [0, 1], [0, -300])
    return {
      opacity,
      transform: [{ translateX }],
    }
  })

  const animatedStyleEvents = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, [0, 1], [0, 1])
    const translateX = interpolate(animatedValue.value, [0, 1], [300, 0])
    return {
      opacity,
      transform: [{ translateX }],
    }
  })

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <View className="bg-primary px-4 pt-8 pb-4">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            className="bg-background size-[26px] justify-center items-center rounded-full"
            onPress={() => navigation.navigate("Home")}
          >
            <IconEntypo name="chevron-thin-left" size={15} color="#000" />
          </TouchableOpacity>
          <Text className="mx-auto text-white font-bold text-xl mr-auto">
            Loans/Events
          </Text>
          <TouchableOpacity className="bg-background size-[26px] justify-center items-center rounded-full ml-auto">
            <Ionicons name="search-outline" size={12} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-background size-[26px] justify-center items-center rounded-full ml-2">
            <Octicons name="history" size={12} color="#000" weight="lighter" />
          </TouchableOpacity>
        </View>

        <View
          style={{ width: 250, maxWidth: "90%" }}
          className="flex-row bg-white mx-auto rounded-full overflow-hidden border border-solid border-black"
        >
          <TouchableOpacity
            onPress={toggleView}
            className={`flex-1 flex-row items-center justify-center py-4 border-1  border-t-0 border-b-0 border-l-0 border-solid border-blue-200" ${
              isRelationships ? "bg-white" : "bg-primary"
            }`}
          >
            {isRelationships && (
              <IconEntypo name="check" size={14} color="#2F5B84" />
            )}
            <Text
              className={`text-center  font-bold ml-1 ${
                isRelationships ? "text-primary" : "text-white"
              }`}
            >
              Loans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleView}
            className={`flex-1 flex-row items-center justify-center  border-1 border-t-0 border-b-0 border-r-0 border-solid border-black py-3 ${
              isRelationships ? "bg-primary" : "bg-white"
            }`}
          >
            {!isRelationships && (
              <IconEntypo name="check" size={14} color="#2F5B84" />
            )}
            <Text
              className={`text-center font-bold ml-1 ${
                isRelationships ? "text-white" : "text-primary"
              }`}
            >
              Events
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, overflow: "hidden" }}>
        <Animated.View
          style={[
            { position: "absolute", width: "100%", height: "100%" },
            animatedStyleRelationships,
          ]}
        >
          <Relationships />
        </Animated.View>
        <Animated.View
          style={[
            { position: "absolute", width: "100%", height: "100%" },
            animatedStyleEvents,
          ]}
        >
          <Events />
        </Animated.View>
      </View>
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
