import {
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native"
import { Link } from "@react-navigation/native"
import { Platform } from "react-native"
import "../../../global.css"

function WelcomeText({ children }) {
  return <Text className="font-bold text-xl">{children}</Text>
}

const LabeledInput = ({ label, placeholder, isTextSecure = false }) => {
  return (
    <View>
      <Text className="text-sm">{label}</Text>
      <TextInput
        className="border border-[#C5C5C5] p-1 rounded w-[295px] h-[46px]"
        secureTextEntry={isTextSecure}
        placeholder={placeholder}
        placeholderTextColor="#757575"
      />
    </View>
  )
}

function Login({ navigation }) {
  return (
    <View className="flex-1 px-5 pt-5">
      <View className="mt-[50px]">
        <WelcomeText>Hey, there</WelcomeText>
        <WelcomeText>
          Experience Hassle-Free Lending and Borrowing Today!
        </WelcomeText>
      </View>
      <Text className="text-[#969696] text-sm">
        From here on out, you can now easily track your borrowers and lenders at
        any time.
      </Text>

      <View className="self-start">
        <View className="mt-5 space-y-2.5">
          <LabeledInput
            label="Username or email"
            placeholder="Enter your username or email"
          />
          <LabeledInput
            label="Password"
            isTextSecure={true}
            placeholder="Enter password"
          />
        </View>
        <Link
          className="text-right text-xs underline"
          to={{ screen: "ForgetPassword" }}
        >
          Forget password?
        </Link>
        <View className="flex-1 justify-between mb-[170px]">
          <Pressable
            onPress={() => navigation.navigate("Home")}
            className="bg-[#37C8C3] p-2.5 rounded mt-[30px] active:bg-[rgba(55,200,195,0.75)]"
          >
            <Text className="text-white font-bold text-xl text-center">
              Login
            </Text>
          </Pressable>
          <Text className="mt-auto text-center">
            Don't have an account?{" "}
            <Link className="font-bold" to={{ screen: "Signup" }}>
              Register Now
            </Link>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Login
