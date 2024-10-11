import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { ModeStyles } from "../styles/mode-style";
import { Colors } from "../constants/colors";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { Message } from "../model/message.dto";
import { FlashList } from "@shopify/flash-list";
import MessageCard from "../components/messageCard";
import { useLocalSearchParams } from "expo-router";
import { ChatData } from "../model/responseDTO";
import { User } from "../model/user.dto";
import { useLoguser } from "../hooks/useLoguser";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { SendChat } from "../model/sentChatData";
import { Image } from "expo-image";
import { GetGitHubProfileData } from "../api/getGitHubProfileData";
import { domain } from "../constants/api";
import { SocketContext, SocketContextType } from "../providers/SocketContext";

// const SOCKET_SERVER_URL = 'ws://localhost:3000';

export default function SingleChatScreen() {
  const socketRef = useRef<Socket | null>(null);

  const flashListRef = useRef<FlashList<Message>>(null);

  const [inputViewHeight, setInputViewHeight] = useState(0);

  const sentInputRef = useRef<TextInput>(null);

  const [getLogUser, setLogUser] = useState<User | null>(null);

  const [statusIcon, setStatusIcon] = useState<boolean>();

  const [hideDown,setHideDown] = useState(true);

  const [MessageCardHight, setMessageCardHight] = useState(0);

  const params = useLocalSearchParams<{ chatData: string }>();
  let chatData: ChatData = {
    otherUserId: 0,
    otherUserMobile: "",
    otherUserName: "",
    otherUserStatus: 0,
    avatarImageFound: false,
    avatarLetters: "",
    message: "",
    chatStatus: 0,
    unseenCount: 0,
    user: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      about: "",
      registeredDate: "",
      githubUsername: "",
      userStatus: {
        id: 0,
        status: "",
      },
      type: {
        id: 0,
        name: "",
      },
      gitProfile: {
        login: "",
        id: 0,
        node_id: "",
        avatar_url: "",
        gravatar_id: "",
        url: "",
        html_url: "",
        followers_url: "",
        following_url: "",
        gists_url: "",
        starred_url: "",
        subscriptions_url: "",
        organizations_url: "",
        repos_url: "",
        events_url: "",
        received_events_url: "",
        type: "",
        site_admin: false,
        name: "",
        company: "",
        blog: "",
        location: "",
        email: "",
        hireable: null,
        bio: "",
        twitter_username: "",
        public_repos: 0,
        public_gists: 0,
        followers: 0,
        following: 0,
        created_at: "",
        updated_at: "",
      },
      gitAvatar: false,
    },
  };
  if (params.chatData) {
    try {
      chatData = JSON.parse(params.chatData);
    } catch (error) {}
  }

  const [getChatHistory, setChatHistory] = useState<Message[]>([]);
  const [getNewMessage, setNewMessage] = useState<Message>();
  const [getSentText, setSentText] = useState("");

  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "light"
      ? ModeStyles.backgroundLight
      : ModeStyles.backgroundDark;

  const textColor =
    colorScheme === "light" ? ModeStyles.textLight : ModeStyles.textDark;
  const cardColor =
    colorScheme === "light"
      ? ModeStyles.cardBackgroundLight
      : ModeStyles.cardBackgroundDark;

  useEffect(() => {
    useLoguser("user").then((user) => {
      setLogUser(user);
      socketRef.current = io("ws://192.168.1.3:3000", {
        query: { userId: user.id },
      });
      socketRef.current.on("open", (message) => {
        const data = {
          logUserId: user.id,
          otherUserId: chatData.otherUserId,
        };

        (socketRef.current as Socket).emit("getAllChats", data);

        socketRef.current?.on("chatStatus", (status: number) => {
          console.log(status);
          setChatHistory((prevChatHistory) => {
            const updatedChatHistory = prevChatHistory.map((chat) => ({
              ...chat,
              status: status,
            }));
  
            return updatedChatHistory;
          });
        });
      });

      socketRef.current?.on("chatHistory", (chatHistory: Message[]) => {
        if (chatHistory.length > 0) {
          setChatHistory(chatHistory as Message[]);
        } else {
        }
      });

      socketRef.current?.on("receiveMessage", (receiveMessage: Message) => {
        setChatHistory((prevChatHistory) => {
          const updatedChatHistory = [...prevChatHistory, receiveMessage];
          updatedChatHistory.map((chat) => (chat.side==="right"?{
            ...chat,
            status: receiveMessage.status
          }:chat));

          return updatedChatHistory;
        });
        flashListRef.current?.scrollToEnd();
      });

    
    });

    // Cleanup on component unmount
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={[styles.mainView, backgroundColor]}>
       {getChatHistory.length>8 && hideDown?( <Pressable
       onPress={()=>{
        flashListRef.current?.scrollToEnd({animated:true})
        setHideDown(false)
       }}
          style={{
            position: "absolute",
            width: 40,
            height: 40,
            backgroundColor: Colors.secondary.purple,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            right: 16,
            bottom: 110,
            zIndex: 1,
            opacity: 90,
          }}
        >
          <AntDesign name="down" size={24} color="black" />
        </Pressable>):null}
        {/* header profile view */}
        <View
          style={[
            { backgroundColor: Colors.secondary.purple },
            styles.logUserProfileView,
          ]}
        >
          {chatData.user?.gitAvatar ? (
            <Image
              source={{ uri: chatData.user.gitProfile?.avatar_url as string }}
              style={{ height: 84, width: 84, borderRadius: 100 }}
            />
          ) : (
            <Image
              source={{
                uri: `${domain}/flow-chat-api/profile-images/${chatData.user.mobile}/avatar.jpeg`,
              }}
              style={{ height: 84, width: 84, borderRadius: 100 }}
            />
          )}
        </View>
        <View style={[cardColor, styles.headerView]}>
          <Text style={[textColor, ModeStyles.semiBlod, styles.profileText]}>
            {chatData.otherUserName}
          </Text>
          <Text
            style={[
              textColor,
              ModeStyles.semiBlod,
              styles.profileStatus,
              {
                color:
                  chatData.otherUserStatus == 1
                    ? Colors.secondary.green
                    : Colors.secondary.red,
              },
            ]}
          >
            {chatData.otherUserStatus == 1 ? "Online" : "Offline"}
          </Text>
        </View>
        {/* header profile view */}

        {/* chat hsitory view */}
        <View style={styles.chatHistoryView}>
          {/* chatHistory list flashList */}
          {getChatHistory.length > 0 ? (
            <FlashList
              ref={flashListRef}
              renderItem={({ item }) => {
                return (
                  <MessageCard
                    message={item as Message}
                    setMessageCardHight={setMessageCardHight}
                  />
                );
              }}
              data={getChatHistory}
              estimatedItemSize={100}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: MessageCardHight }}
            />
          ) : null}
        </View>
        {/* chat hsitory view */}

        {/* send input view */}
        <View
          style={[styles.inputView]}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setInputViewHeight(height);
          }}
        >
          <TextInput
            ref={sentInputRef}
            style={[styles.input, cardColor, textColor]}
            onChangeText={(text) => {
              setSentText(text);
            }}
          />
          <View style={styles.sendBtnView}>
            <Pressable
              style={styles.sendBtn}
              onPress={() => {
                if (!getLogUser?.id) {
                  console.error("Log user is not defined!");
                  return;
                }
                const newMessage: Message = {
                  chatId: 10,
                  message: getSentText,
                  status: 2,
                  side: "right",
                  date: new Date(),
                };

                setChatHistory([...getChatHistory, newMessage]);
                flashListRef.current?.scrollToEnd();
                const sentChat = new SendChat();
                sentChat.logUserId = getLogUser?.id as number;
                sentChat.otherUserId = chatData?.otherUserId as number;
                sentChat.message = getSentText;

                sentInputRef.current?.clear();

                socketRef.current?.emit("sendChat", sentChat);
              }}
            >
              <FontAwesome name="send" size={24} color="black" />
            </Pressable>
          </View>
        </View>
        {/* send input view */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flex: 1,
    rowGap: 10,
  },
  headerView: {
    width: "100%",
    height: 85,
    borderRadius: 64,
    zIndex: 1,
    marginTop: 70,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
  },
  logUserProfileView: {
    height: 84,
    width: 84,
    borderRadius: 100,
    position: "absolute",
    zIndex: 2,
    top: 60,
    alignSelf: "center",
  },
  profileText: {
    fontSize: 16,
  },
  profileStatus: {
    fontSize: 12,
  },
  inputView: {
    flexDirection: "row",
    width: "100%",

    paddingBottom: 16,
    height: "auto",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  input: {
    width: "80%",
    height: 50,
    borderRadius: 28,
    paddingLeft: 20,
    paddingRight: 20,
  },
  sendBtnView: {
    flex: 1,
    alignItems: "flex-end",
  },
  sendBtn: {
    width: 56,
    height: 56,
    backgroundColor: Colors.secondary.purple,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  ////////////
  chatHistoryView: {
    flex: 1,
    width: "100%",
  },

  rightMessageView: {
    alignSelf: "flex-end",
    maxWidth: "70%",
    height: "auto",
    padding: 10,
    backgroundColor: Colors.secondary.myMessage,
    borderBottomLeftRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginBottom: 10,
    rowGap: 8,
  },
  leftMessageView: {
    alignSelf: "flex-start",
    maxWidth: "70%",
    height: "auto",
    padding: 10,
    backgroundColor: Colors.secondary.otherMessage,
    borderBottomRightRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginBottom: 10,
  },
});
