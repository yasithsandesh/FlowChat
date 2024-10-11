import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { ModeStyles } from "../styles/mode-style";
import { LinearGradient } from "expo-linear-gradient";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Image } from "expo-image";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import * as Contacts from "expo-contacts";
import { router, useLocalSearchParams } from "expo-router";
import PostCard from "../components/postCard";
import { useLoguser } from "../hooks/useLoguser";
import { User } from "../model/user.dto";
import { isLoading } from "expo-font";
import Loading from "../components/loading";
import { GetGitHubProfileData } from "../api/getGitHubProfileData";
import { ChatData, GitProfile, Repository } from "../model/responseDTO";
import axios from "axios";
import { FlashList } from "@shopify/flash-list";

interface Props {
  isLogUser: boolean;
}

export default function ProfileScreen({ isLogUser }: Props) {
  const [getRepoList, setRepoList] = useState<Repository[]>();

  const [getUser, setUser] = useState<User | null>();
  const [listloading, setlistLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const colorScheme = useColorScheme();

  const param = useLocalSearchParams<{ user: string }>();
  let user: User;
  if (param.user) {
    try {
      user = JSON.parse(param.user);
    } catch (error) {}
  }

  const windowHeight:number = Dimensions.get('window').height;

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

  const styleBtnBgColor =
    colorScheme === "light" ? ModeStyles.btnViewLight : ModeStyles.btnViewDark;

  const saveContact = useCallback(async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const contact: any = {
        [Contacts.Fields.FirstName]: "Yasith",
        [Contacts.Fields.LastName]: "My",
        [Contacts.Fields.PhoneNumbers]: [
          { number: "0769002276", label: "mobile" },
        ],
        [Contacts.Fields.ContactType]: Contacts.ContactTypes.Person,
      };

      try {
        const contactId = await Contacts.addContactAsync(contact);

        if (contactId) {
          Alert.alert("Message", "Contact saved successfully!");
        } else {
          Alert.alert("Message", "Failed to save contact.");
        }
      } catch (error) {}
    } else {
      Alert.alert("Message");
    }
  }, []);

  useMemo(() => {
    if (isLogUser) {
      useLoguser("user").then((user) => {
        setUser(user);
        axios.get(user.gitProfile.repos_url).then((respone) => {
          const repoList: Repository[] = respone.data;
          const sortList:Repository[] = repoList.sort((a,b)=>b.id - a.id);
          setRepoList(repoList);
        });
      });
      setLoading(false);
    } else {
      GetGitHubProfileData(user.githubUsername).then(
        (githubProfile: GitProfile) => {
          setUser({ ...user, gitProfile: githubProfile });
          axios.get(githubProfile.repos_url).then((respone) => {
            const repoList: Repository[] = respone.data;
            const sortList:Repository[] = repoList.sort((a,b)=>b.id - a.id);
            setRepoList(repoList);
          });
        }
      );

      setLoading(false);
    }
  }, []);

  useEffect(()=>{
    setTimeout(() => {
      setlistLoading(false)
    }, 1000);
  },[getRepoList])

  if (loading) {
    return <Loading />;
  } else {
    if (getUser == null) {
      return <Loading />;
    } else {
      return (
        <View style={[bgColor, styles.container]}>
          <ScrollView>
            <LinearGradient
              colors={["#3B82F6", "#9333EA"]}
              style={styles.headerViewGradint}
            >
              {isLogUser ? (
                <Ionicons
                  name="settings"
                  size={24}
                  color={Colors.dark.background}
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => {
                    router.push("/profile-setting");
                  }}
                />
              ) : null}
            </LinearGradient>

            <View style={styles.imageView}>
              <Image
                source={getUser.gitProfile?.avatar_url}
                style={{ height: 100, width: 100, borderRadius: 100 }}
              />
            </View>

            <View style={styles.mainView}>
              <View style={styles.profileDetalsView}>
                <Text style={[textColor, ModeStyles.Blod, styles.profileName]}>
                  {getUser?.firstName + " " + getUser?.lastName}
                </Text>
                <Text style={[styles.bioText, textColor, ModeStyles.Medium]}>
                  {getUser?.gitProfile?.bio == null
                    ? "🥇"
                    : getUser?.gitProfile?.bio}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 5,
                  }}
                >
                  <FontAwesome6
                    name="location-dot"
                    size={12}
                    color={
                      colorScheme === "light"
                        ? Colors.light.text
                        : Colors.dark.text
                    }
                  />
                  <Text style={[textColor, ModeStyles.Regular]}>
                    {getUser?.gitProfile?.location}
                  </Text>
                </View>

                <View style={styles.countManinView}>
                  <View style={styles.countView}>
                    <View
                      style={[
                        borderColor,
                        {
                          borderStyle: "solid",
                          borderStartWidth: 2,
                          flex: 1,
                          paddingHorizontal: 16,
                          paddingVertical: 6,
                        },
                      ]}
                    >
                      <Text
                        style={[textColor, ModeStyles.Blod, { fontSize: 14 }]}
                      >
                        {getUser?.gitProfile?.following}
                      </Text>
                      <Text
                        style={[textColor, ModeStyles.Medium, { fontSize: 14 }]}
                      >
                        Following
                      </Text>
                    </View>
                    <View
                      style={[
                        borderColor,
                        {
                          borderStyle: "solid",
                          borderStartWidth: 2,
                          flex: 1,
                          paddingHorizontal: 16,
                          paddingVertical: 6,
                        },
                      ]}
                    >
                      <Text
                        style={[textColor, ModeStyles.Blod, { fontSize: 14 }]}
                      >
                        {getUser?.gitProfile?.followers}
                      </Text>
                      <Text
                        style={[textColor, ModeStyles.Medium, { fontSize: 14 }]}
                      >
                        Followers
                      </Text>
                    </View>

                    <View
                      style={[
                        borderColor,
                        {
                          borderStyle: "solid",
                          borderStartWidth: 2,
                          borderEndWidth: 2,
                          flex: 1,
                          paddingHorizontal: 16,
                          paddingVertical: 6,
                        },
                      ]}
                    >
                      <Text
                        style={[textColor, ModeStyles.Blod, { fontSize: 14 }]}
                      >
                        120
                      </Text>
                      <Text
                        style={[textColor, ModeStyles.Medium, { fontSize: 14 }]}
                      >
                        Fire 🔥
                      </Text>
                    </View>
                  </View>
                </View>

                {!isLogUser ? (
                  <View style={styles.btnView}>
                    <Pressable
                      style={[cardBackground, styles.messageBtn]}
                      onPress={() => {
                        const chatData: ChatData = {
                          otherUserId: getUser.id,
                          otherUserMobile: getUser.mobile,
                          otherUserName:
                            getUser.firstName + " " + getUser.lastName,
                          otherUserStatus: getUser.userStatus.id,
                          avatarImageFound: false,
                          avatarLetters:
                            getUser.firstName.charAt(0) +
                            " " +
                            getUser.lastName.charAt(0),
                          message: "",
                          chatStatus: 0,
                          unseenCount: 0,
                          user: getUser,
                        };

                        router.push({
                          pathname: "/single-chat",
                          params: {
                            chatData: JSON.stringify(chatData),
                          },
                        });
                      }}
                    >
                      <Ionicons
                        name="chatbubble-ellipses"
                        size={24}
                        color="#89E219"
                      />
                      <Text
                        style={[
                          ModeStyles.Blod,
                          styles.btnText,
                          { color: Colors.secondary.green },
                        ]}
                      >
                        Message
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[styleBtnBgColor, styles.contactBtn, borderColor]}
                      onPress={() => {
                        saveContact();
                      }}
                    >
                      <Ionicons
                        name="call"
                        size={24}
                        color={Colors.secondary.avatar}
                      />
                      <Text
                        style={[
                          ModeStyles.Blod,
                          styles.btnText,
                          { color: Colors.secondary.avatar },
                        ]}
                      >
                        Save contact
                      </Text>
                    </Pressable>
                  </View>
                ) : null}

                <View style={{ width: "100%",height: windowHeight }}>
                  {/* FlashList section */}
                 {listloading?(<ActivityIndicator size={"small"} color={Colors.secondary.purple}/>):(
                   <FlashList
                   renderItem={({ item }) => {
                     return <PostCard  repo={item}/>;
                   }}
                   data={getRepoList}
                   estimatedItemSize={100}
                  
                 />
                 )}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 55,
    rowGap: 20,
  },
  headerViewGradint: {
    width: "100%",
    height: 150,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  imageView: {
    height: 100,
    width: 100,
    borderRadius: 100,
    position: "absolute",
    alignSelf: "center",
    top: 100,
  },
  profileDetalsView: {
    width: "100%",
    alignItems: "center",
    rowGap: 10,
  },
  profileName: {
    fontSize: 20,
  },
  bioText: {
    fontSize: 14,
    textAlign: "center",
  },

  locationText: {
    fontSize: 12,
  },
  btnView: {
    width: "100%",
    flexDirection: "row",
    columnGap: 16,
  },
  messageBtn: {
    flex: 3.8,
    height: 45,
    borderRadius: 12,
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  contactBtn: {
    flex: 3,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 2,
    borderBottomWidth: 5,
    borderStyle: "solid",
    borderRadius: 12,
    height: 45,
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 14,
  },

  countManinView: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
  },

  countView: {
    flex: 1,
    flexDirection: "row",
  },
});
