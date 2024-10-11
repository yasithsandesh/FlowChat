import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { ModeStyles } from "../styles/mode-style";
import { useState } from "react";
import { OnCreateAccount } from "../api/authApi";
import { UserRequest } from "../model/requestDTOS";
import { ResponseDTO } from "../model/responseDTO";
import { router } from "expo-router";

export default function CreateAccountScreen() {
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getMobile, setMobile] = useState("");
  const [getGithubUsername,setGithubusername] = useState("")

  let colorScheme = useColorScheme();

  const backgroundColor =
    colorScheme === "light"
      ? ModeStyles.backgroundLight
      : ModeStyles.backgroundDark;
  const textMain =
    colorScheme === "light"
      ? ModeStyles.textMainLight
      : ModeStyles.textMainDark;
  const textInput =
    colorScheme === "light"
      ? ModeStyles.textInputLight
      : ModeStyles.textInputDark;
  const textColor =
    colorScheme === "light" ? ModeStyles.textLight : ModeStyles.textDark;

  return (
    <View style={[styles.container, backgroundColor]}>
      <Text style={[textMain]}>Create Account</Text>
      <ScrollView>
        <View style={styles.viewMain}>
          <View style={styles.inputView}>
            <Text style={textInput}>First Name</Text>
            <TextInput
              style={[styles.input, textColor]}
              onChangeText={(text) => {
                setFirstName(text);
              }}
            />
          </View>

          <View style={styles.inputView}>
            <Text style={textInput}>Last Name</Text>
            <TextInput
              style={[styles.input, textColor]}
              onChangeText={(text) => {
                setLastName(text);
              }}
            />
          </View>

          <View style={styles.inputView}>
            <Text style={textInput}>Email</Text>
            <TextInput
              style={[styles.input, textColor]}
              inputMode="email"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>

          <View style={styles.inputView}>
            <Text style={textInput}>Password</Text>
            <TextInput
              style={[styles.input, textColor]}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>

          <View style={styles.inputView}>
            <Text style={textInput}>Mobile</Text>
            <TextInput
              style={[styles.input, textColor]}
              inputMode="tel"
              onChangeText={(text) => {
                setMobile(text);
              }}
            />
          </View>

          <View style={styles.inputView}>
            <Text style={textInput}>Github Username</Text>
            <TextInput
              style={[styles.input, textColor]}
              onChangeText={(text) => {
                setGithubusername(text);
              }}
            />
          </View>

          <Pressable
            style={styles.primaryBtn}
            onPress={async () => {
              const data: UserRequest = {
                firstName: getFirstName,
                lastName: getLastName,
                email: getEmail,
                password: getPassword,
                mobile: getMobile,
                typeId: "3",
                githubUsername: getGithubUsername
              };
              const res: ResponseDTO = await OnCreateAccount(data);
              if (res.status) {
                Alert.alert("Message", res.message);
              } else {
                Alert.alert("Error", res.message);
              }
            }}
          >
            <Text style={[styles.semiBlod]}>Submit</Text>
          </Pressable>
          <Text style={[styles.alreadyText, styles.semiBlod, textColor]} onPress={()=>{router.push("/sign-in")}}>
            Already a Member ?
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewMain: {
    flex: 1,
    paddingTop: 10,
    rowGap: 10,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  textMain: {
    fontSize: 30,
  },
  semiBlod: {
    fontFamily: "Poppins-SemiBold",
  },
  Regular: {
    fontFamily: "Poppins-Regular",
  },
  inputView: {
    rowGap: 8,
  },
  inputText: {
    fontSize: 12,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#e6e6e6",
    borderRadius: 9,
    padding: 8,
    borderEndWidth: 4,
  },
  primaryBtn: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#22FBD7",
    borderRadius: 9,
    borderEndWidth: 3,
  },
  alreadyText: {
    marginTop: 5,
    alignSelf: "center",
  },
});
