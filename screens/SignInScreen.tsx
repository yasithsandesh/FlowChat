import { useState } from "react";
import { Colors } from "../constants/colors";
import { ModeStyles } from "../styles/mode-style";
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
import { LetterSearch, onSignIn } from "../api/authApi";
import { leterResponse } from "../model/responseDTO";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginResponse } from "../model/user.dto";
import RootLayout from "../app/_layout";
import { GetGitHubProfileData } from "../api/getGitHubProfileData";

export default function SignInScreen() {
  let colorScheme = useColorScheme();

  const [getPassword, setPassword] = useState("");
  const [getMobile, setMobile] = useState<string>("");
  const [getProfileText, setProfileText] = useState<string>("");

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

  const profileColor =
    colorScheme === "light"
      ? ModeStyles.cardBackgroundLight
      : ModeStyles.cardBackgroundDark;

  return (
    <View style={[styles.container, backgroundColor]}>
      <View style={styles.viewMain}>
        <Text style={[textMain]}>Login Account</Text>

        {getProfileText == "" ? null : (
          <View style={[styles.profileTextCricle, profileColor]}>
            <Text style={styles.profileText}>{getProfileText}</Text>
          </View>
        )}

        <View style={styles.inputView}>
          <Text style={textInput}>Mobile</Text>
          <TextInput
            style={[styles.input, textColor]}
            onChangeText={(text) => {
              setMobile(text);
            }}
            onEndEditing={async (text) => {
              if (getMobile.length == 10) {
                const res: leterResponse = await LetterSearch(getMobile);

                if (res.status) {
                  setProfileText(res.data);
                } else {
                  Alert.alert("Error", res.message);
                }
              }
            }}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={textInput}>Password</Text>
          <TextInput
            style={[styles.input, textColor]}
            secureTextEntry={true}
            onChangeText={(t) => {
              setPassword(t);
            }}
          />
        </View>

        <Pressable
          style={styles.primaryBtn}
          onPress={async () => {
            const res: LoginResponse = await onSignIn(getMobile, getPassword);
            if (res.status) {

              GetGitHubProfileData(res.data.githubUsername).then((gitProfile)=>{
                try {
                  AsyncStorage.setItem("user", JSON.stringify({...res.data,gitProfile:gitProfile}));
                  router.push('/home')
                } catch (error) {
                  Alert.alert("Login Error", error as string);
                }
              })

             
            } else {
              Alert.alert("Login Error", res.message);
            }
          }}
        >
          <Text style={[styles.semiBlod]}>Login</Text>
        </Pressable>
        <Text
          style={[styles.alreadyText, styles.semiBlod, textColor]}
          onPress={() => {
            router.push("/create-account");
          }}
        >
          Don't have an account?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewMain: {
    flex: 1,
    paddingTop: 10,
    rowGap: 10,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
    justifyContent: "center",
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
  profileTextCricle: {
    width: 80,
    height: 80,
    alignSelf: "center",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontFamily: "Poppins-Bold",
    color: Colors.secondary.purple,
    fontSize: 25,
  },
});
