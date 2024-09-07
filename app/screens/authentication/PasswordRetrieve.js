import { Text, View, TextInput, Pressable, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, KeyboardAvoidingView } from "react-native"
import { Link } from '@react-navigation/native';

function WelcomeText({children}) {
    return <Text style={{fontWeight: 'bold', fontSize: 30}}>{children}</Text>
}

const LabeledInput = ({ label, placeholder, isTextSecure = false }) => {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            secureTextEntry={isTextSecure}
            placeholder={placeholder}
            placeholderTextColor="#757575"
        />
      </View>
    );
  };

export default function PasswordRetrieve({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.welcome}>
            <WelcomeText>Forget Password</WelcomeText>
        </View>
        <Text style={styles.welcomeParagraph}>Always keep your account secure and don't forget to update it</Text>
        <View style={{alignSelf: 'flex-start'}}>
        <View style={styles.form}>
                <LabeledInput
                    label="Your Account Email"
                    placeholder="Enter your account email"
                />
        </View>
            <View style={styles.submitView}>
            <Pressable onPress={() => navigation.navigate('Home')}  style={({ pressed }) => [
                  styles.submitButton,
                  {
                    backgroundColor: pressed ? 'rgba(55, 200, 195, .75)' : '#37C8C3'
                  },
                ]}>
                <Text style={styles.submitButtonText}>
                    Submit
                </Text>
            </Pressable>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcome: {
    marginTop: 50
  },
  welcomeParagraph: {
    color: '#969696',
    fontSize: 13
  },
  form: {
    marginTop: 20,
    gap: 10
  },
  submitButton: {},
  accountParagraph: {},
  label: {
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C5C5C5',
    padding: 5,
    borderRadius: 3,
    width: 295,
    height: 46
  },
  passwordForgetButton: {
    textAlign: 'right',
    fontSize: 12,
    textDecorationLine: 'underline'
  },
  submitButton: {
    backgroundColor: '#37C8C3',
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  accountParagraph: {
    marginTop: 'auto',
    textAlign: 'center'
  },
  submitView: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 130,

  }
  
})

