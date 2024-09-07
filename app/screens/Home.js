import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

function Home() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Welcome Home
      </Text>
      <Text
        style={{ fontSize: 16, textAlign: "center", paddingHorizontal: 20 }}
      >
        This is an example home page for your React Native app. You can
        customize it with your own content and styling.
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          marginTop: "auto",
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Icon name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Icon name="user-plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Icon name="bar-chart" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Icon name="cog" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Home
