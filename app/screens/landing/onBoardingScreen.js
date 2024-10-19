import React, { useState, useRef, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import OnBoarding1SVG from "../../../assets/svgs/onBoarding1SVG.js"
import OnBoarding2SVG from "../../../assets/svgs/onBoarding2SVG.js"
import OnBoarding3SVG from "../../../assets/svgs/onBoarding3SVG.js"

const { width } = Dimensions.get("window")

const slides = [
  {
    id: "1",
    title: "Gain Control Over Your Finances",
    description:
      "Track how much you spend on loans and payments, and manage your finances with ease.",
    image: <OnBoarding1SVG />,
    imageStyles: {
      width: 280,
      height: 270,
    },
  },
  {
    id: "2",
    title: "Stay Organized with Events",
    description:
      "Easily manage group events and shared expenses, keeping everyone on the same page.",
    // image: require("../../../assets/onboarding/onboarding-2.png"),
    image: <OnBoarding2SVG />,
    imageStyles: {
      width: 320,
      height: 320,
    },
  },
  {
    id: "3",
    title: "Improve Communication with Friends",
    description:
      "Avoid misunderstandings by keeping clear records of your shared loans and payments.",
    image: <OnBoarding3SVG />,
    // image: require("../../../assets/onboarding/onboarding-3.png"),
    imageStyles: {
      width: 320,
      height: 320,
    },
  },
]

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slidesRef = useRef(null)
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"
  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index)
    }
  }, [])

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollTo = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 })
    } else {
      navigation.navigate("Signup")
    }
  }, [currentIndex, navigation])

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.slide}>
        {item.image}
        <Text style={[styles.title, { color: isDarkMode ? "#FFF" : "000" }]}>
          {item.title}
        </Text>
        <Text className="text-center  px-5 text-gray-500 dark:text-gray-400">
          {item.description}
        </Text>
      </View>
    ),
    []
  )

  const keyExtractor = useCallback((item) => item.id, [])

  const renderIndicator = useCallback(
    (_, index) => (
      <View
        key={index}
        style={[
          [
            styles.indicator,
            { backgroundColor: isDarkMode ? "#8A8A8A" : "#E4E4E4" },
          ],
          currentIndex === index && [
            { backgroundColor: isDarkMode ? "#FFF" : "#000" },
            ,
          ],
        ]}
      />
    ),
    [currentIndex]
  )

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#212121" : "#F5F5F5" },
      ]}
    >
      <View style={styles.slideContainer}>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Image
            style={{ width: 100, resizeMode: "contain" }}
            source={require("../../../assets/logo-2.png")}
          ></Image>
        </View>
        <FlatList
          data={slides}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={keyExtractor}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={3}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map(renderIndicator)}
        </View>
        <TouchableOpacity style={styles.button} onPress={scrollTo}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 3,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 20,
    color: "#C4C4C4",
  },
  footer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    height: 10,
    width: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#2F5B84",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
})
export default React.memo(OnboardingScreen)
