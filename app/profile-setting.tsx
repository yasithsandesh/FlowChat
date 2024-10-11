import { useCallback, useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import Loading from "../components/loading";
import { ModeStyles } from "../styles/mode-style";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import HeaderBar from "../components/headerBar";
import { useLoguser } from "../hooks/useLoguser";
import SmallLoading from "../components/smallLoading";
import { onUpdateAvatar, onUpdateProfile } from "../api/settings";
import { UserUpdateRequestDTO } from "../model/requestDTOS";
import { UpdateResponseDTO } from "../model/responseDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { GetGitHubProfileData } from "../api/getGitHubProfileData";

export default function ProfileSetting() {
  const lottieViewAnimationRef = useRef<LottieView>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputloading, setInputLoading] = useState<boolean>(true);

  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLatName] = useState("");
  const [getGitHubUserName, setGitHubUsername] = useState("");
  const [getAbout, setAbout] = useState("");
  const [getUserId, setUserId] = useState("");
  const [isgitAvatar, setgitAvara] = useState<boolean>();

  const [getAvatarImage, setAvatarImage] = useState<any>();
  const [image, setImage] = useState<any>();

  const colorScheme = useColorScheme();

  const bgColor =
    colorScheme === "light"
      ? ModeStyles.backgroundLight
      : ModeStyles.backgroundDark;
  const cardBackground =
    colorScheme == "light"
      ? ModeStyles.cardBackgroundLight
      : ModeStyles.cardBackgroundDark;
  const textColor =
    colorScheme == "light" ? ModeStyles.textLight : ModeStyles.textDark;

  const borderColor =
    colorScheme === "light" ? ModeStyles.borderLight : ModeStyles.borderDark;

  const textInput =
    colorScheme === "light"
      ? ModeStyles.textInputLight
      : ModeStyles.textInputDark;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync();

    setImage(result.assets?.[0]);

    if (!result.canceled) {
      setAvatarImage(result.assets[0].uri);
    }
  };

  const onUpdate = useCallback(async (data: UserUpdateRequestDTO) => {
    console.log(data);
    onUpdateProfile(data)
      .then((response: UpdateResponseDTO) => {
        if (response.status) {
          try {
            GetGitHubProfileData(response.data.githubUsername).then((gitHubPro)=>{
              const user = {...response.data,gitProfile:gitHubPro}
              AsyncStorage.setItem("user", JSON.stringify(user));
              getLogUser();
              setInputLoading(false);
            })
           
          } catch (error) {}
        } else {
        }
      })
      .catch();
  }, []);

  const getLogUser = useCallback(() => {
    useLoguser("user")
      .then((user) => {
        setFirstName(user.firstName);
        setLatName(user.lastName);
        setGitHubUsername(user.githubUsername);
        setAbout(user.about);
        setUserId(user.id.toString());
        setgitAvara(user.gitAvatar);
        setLoading(false);
        setInputLoading(false);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getLogUser();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View style={[styles.mainView, bgColor]}>
        <HeaderBar name={"Settings"} />
        <ScrollView>
          <View style={styles.avatarMainView}>
            <Pressable
              style={[styles.avatarView, borderColor]}
              onPress={pickImage}
            >
              <LottieView
                ref={lottieViewAnimationRef}
                loop
                autoPlay
                style={{ height: 100, width: 100, borderRadius: 40 }}
                source={require("../assets/eyeanimation.json")}
              />
              {/* <Image
                source={getAvatarImage}
                style={{ height: 80, width: 80, borderRadius: 100 }}
              /> */}
            </Pressable>
            <Text
              style={[styles.changeAvatarText, ModeStyles.Blod]}
              onPress={() => {
                useLoguser("user").then(async (user) => {
                  const response = await onUpdateAvatar(user.mobile, {
                    name: "avatar",
                    type: "image/jpeg",
                    uri: getAvatarImage,
                  });
                });
              }}
            >
              SAVE AVATAR
            </Text>

            {isgitAvatar ? (
              <Text
                style={[styles.changeAvatar, ModeStyles.Blod]}
                onPress={() => {
                  setLoading(true);
                  const data: UserUpdateRequestDTO = {
                    userId: getUserId,
                    firstName: getFirstName,
                    lastName: getLastName,
                    githubUsername: getGitHubUserName,
                    about: getAbout,
                    gitAvatar: false,
                  };
                  onUpdate(data);
                }}
              >
                SET FLOWCHAT AVATAR
              </Text>
            ) : (
              <Text
                style={[styles.changeAvatar, ModeStyles.Blod]}
                onPress={() => {
                  setLoading(true);
                  const data: UserUpdateRequestDTO = {
                    userId: getUserId,
                    firstName: getFirstName,
                    lastName: getLastName,
                    githubUsername: getGitHubUserName,
                    about: getAbout,
                    gitAvatar: true,
                  };
                  onUpdate(data);
                }}
              >
                SET GITHUB AVATAR
              </Text>
            )}
          </View>

          <View style={styles.mainInputViews}>
            <View style={styles.inputView}>
              <Text style={textInput}>First Name</Text>
              {inputloading ? (
                <SmallLoading />
              ) : (
                <TextInput
                  style={[styles.input, textColor, borderColor]}
                  placeholder={getFirstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                  }}
                  onEndEditing={() => {
                    setInputLoading(true);
                    const data: UserUpdateRequestDTO = {
                      userId: getUserId,
                      firstName: getFirstName,
                      lastName: getLastName,
                      githubUsername: getGitHubUserName,
                      about: getAbout,
                      gitAvatar: isgitAvatar as boolean,
                    };
                    onUpdate(data);
                  }}
                />
              )}
            </View>

            <View style={styles.inputView}>
              <Text style={textInput}>Last Name</Text>
              {inputloading ? (
                <SmallLoading />
              ) : (
                <TextInput
                  style={[styles.input, textColor, borderColor]}
                  placeholder={getLastName}
                  onChangeText={(text) => {
                    setLatName(text);
                  }}
                  onEndEditing={() => {
                    setInputLoading(true);
                    const data: UserUpdateRequestDTO = {
                      userId: getUserId,
                      firstName: getFirstName,
                      lastName: getLastName,
                      githubUsername: getGitHubUserName,
                      about: getAbout,
                      gitAvatar: isgitAvatar as boolean,
                    };
                    onUpdate(data);
                  }}
                />
              )}
            </View>

            <View style={styles.inputView}>
              <Text style={textInput}>Github Username</Text>
              {inputloading ? (
                <SmallLoading />
              ) : (
                <TextInput
                  style={[styles.input, textColor, borderColor]}
                  placeholder={getGitHubUserName}
                  onChangeText={(text) => {
                    setGitHubUsername(text);
                  }}
                  onEndEditing={() => {
                    setInputLoading(true);
                    const data: UserUpdateRequestDTO = {
                      userId: getUserId,
                      firstName: getFirstName,
                      lastName: getLastName,
                      githubUsername: getGitHubUserName,
                      about: getAbout,
                      gitAvatar: isgitAvatar as boolean,
                    };
                    onUpdate(data);
                  }}
                />
              )}
            </View>

            <View style={styles.inputView}>
              <Text style={textInput}>About</Text>
              {inputloading ? (
                <SmallLoading />
              ) : (
                <TextInput
                  style={[styles.input, textColor, borderColor]}
                  placeholder={getAbout == undefined ? "🏆" : getAbout}
                  onChangeText={(text) => {
                    setAbout(text);
                  }}
                  onEndEditing={() => {
                    setInputLoading(true);
                    const data: UserUpdateRequestDTO = {
                      userId: getUserId,
                      firstName: getFirstName,
                      lastName: getLastName,
                      githubUsername: getGitHubUserName,
                      about: getAbout == undefined ? "" : getAbout,
                      gitAvatar: isgitAvatar as boolean,
                    };
                    onUpdate(data);
                  }}
                />
              )}
            </View>
          </View>

          <View style={styles.btnSectionView}>
            <Pressable
              style={[borderColor, styles.logOutBtn]}
              onPress={() => {
                AsyncStorage.removeItem("user");
                router.push("/sign-in");
              }}
            >
              <Text style={[styles.logOutText, ModeStyles.Blod]}>Log Out</Text>
            </Pressable>
            <Text style={[styles.date, ModeStyles.semiBlod]}>
              Joined 2024-10-07
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  avatarMainView: {
    width: "100%",
    rowGap: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 40,
  },
  avatarView: {
    borderWidth: 3,
    borderRadius: 100,
    height: 100,
    width: 100,
    borderStyle: "dotted",
    justifyContent:"center",
    alignItems:"center"
  },
  changeAvatarText: {
    color: Colors.secondary.avatar,
    fontSize: 16,
  },

  changeAvatar: {
    color: Colors.secondary.green,
    fontSize: 12,
  },

  mainInputViews: {
    rowGap: 16,
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
    borderRadius: 10,
    padding: 8,
  },

  btnSectionView: {
    width: "100%",
    rowGap: 16,
    marginTop: 27,
  },

  logOutBtn: {
    width: "100%",
    height: 55,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 5,
    borderTopWidth: 2,
    borderStyle: "solid",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  logOutText: {
    fontSize: 16,
    color: Colors.secondary.red,
  },
  date: {
    color: Colors.light.border,
    fontSize: 16,
  },
});
