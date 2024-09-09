import {
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from "react-native"
import { Link } from "@react-navigation/native"
import "../../../global.css"

const LabeledInput = ({ label, placeholder, isTextSecure = false }) => {
  return (
    <View className="mb-4">
      <Text className="text-base mb-1 font-bold">{label}</Text>
      <TextInput
        className="border-2 border-[#C5C5C5] p-3 rounded-md"
        secureTextEntry={isTextSecure}
        placeholder={placeholder}
        placeholderTextColor="#757575"
      />
    </View>
  )
}

function Login({ navigation }) {
  return (
    <View className="flex-1 bg-white px-5 pt-10">
      <ScrollView className="bg-white">
        <View className="mb-8">
          <Text className="font-bold text-2xl">Hey, there 👋</Text>
          <Text className="font-bold text-2xl ">Experience Hassle-Free Lending and</Text>
          <Text className="font-bold text-2xl ">Borrowing Today!</Text>
          <Text className="text-gray-500 text-sm mt-2">
            From here on out, you can now easily track your borrowers and lenders at any time.
          </Text>
        </View>

        <View className="mx-7">
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
          className="text-right text-sm font-medium text-black mb-4"
          to={{ screen: "ForgetPassword" }}
        >
          Forget password?
        </Link>

        <Pressable
          onPress={() => navigation.navigate("Home")}
          className="bg-[#37C8C3] p-3 rounded-md mb-4"
        >
          <Text className="text-white font-bold text-lg text-center">
            Login
          </Text>
        </Pressable>

        <Pressable className="border border-[#C5C5C5] rounded-md p-3 flex-row justify-center items-center mb-8">
          <Image 
            source={require('../../../assets/google-icon.webp')} 
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text className="text-black font-semibold">Continue with Google</Text>
        </Pressable>
      </ScrollView>

      <View className="mt-auto pb-5">
        <Text className="text-center">
          Don't have an account?{" "}
          <Link className="font-bold text-black" to={{ screen: "Signup" }}>
            Register Now
          </Link>
        </Text>
      </View>
    </View>
  )
}

export default Login