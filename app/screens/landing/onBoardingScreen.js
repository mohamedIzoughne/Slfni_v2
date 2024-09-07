import React, { useState, useRef, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const { width } = Dimensions.get("window")

const slides = [
  {
    id: "1",
    title: "Let's start tracking our finances !",
    description: "Say goodbye to financial misunderstandings with our app.",
    image: require("../../../assets/onboarding/onboarding-1.png"),
    imageStyles: {
      width: 280,
      height: 270,
    },
  },
  {
    id: "2",
    title: "Easy to Use",
    description: "Navigate through our user-friendly interface with ease.",
    image: require("../../../assets/onboarding/onboarding-2.png"),
    imageStyles: {
      width: 320,
      height: 320,
    },
  },
  {
    id: "3",
    title: "Get Started",
    description: "Start your journey with us today!",
    image: require("../../../assets/onboarding/onboarding-3.png"),
    imageStyles: {
      width: 320,
      height: 320,
    },
  },
]

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slidesRef = useRef(null)

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
        <Image
          source={item.image}
          style={{
            ...item.imageStyles,
            // resizeMode: "contain",
            marginBottom: 20,
          }}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
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
          styles.indicator,
          currentIndex === index && styles.activeIndicator,
        ]}
      />
    ),
    [currentIndex]
  )

  return (
    <SafeAreaView style={styles.container} className="text-red-500">
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
    backgroundColor: "#fff",
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
    backgroundColor: "#ccc",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeIndicator: {
    backgroundColor: "#000",
  },
  button: {
    backgroundColor: "#37C8C3",
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
