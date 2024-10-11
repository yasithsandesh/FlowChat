import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { ModeStyles } from "../../styles/mode-style";
import { ChatData, ChatDataResponse } from "../../model/responseDTO";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import UserChatCard from "../../components/userChatCard";
import { useLocalSearchParams } from "expo-router";
import { getAllChats } from "../../api/getAllChats";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../model/user.dto";
import { useLoguser } from "../../hooks/useLoguser";
import Loading from "../../components/loading";
import { io, Socket } from "socket.io-client";

export default function AllChats() {
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [getChatDataList, setChatDataList] = useState<ChatData[]>();


  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "light"
      ? ModeStyles.backgroundLight
      : ModeStyles.backgroundDark;

  const textColor =
    colorScheme === "light" ? ModeStyles.textLight : ModeStyles.textDark;

  const getAllChatsAction = useCallback(async (userId: string) => {
    const response: ChatDataResponse = await getAllChats(userId);
    if (response.status) {
      setChatDataList(response.chatDataList);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getAllChatsCall = async () => {
      //   const userStringObj = await AsyncStorage.getItem('user');
      //  const user:User =  JSON.parse(userStringObj as string);
      useLoguser("user").then(async (user) => {

        await getAllChatsAction(user.id.toString());

      });
    };

    getAllChatsCall();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View style={[styles.mainView, backgroundColor]}>
        <Text style={[styles.mainText, textColor, ModeStyles.semiBlod]}>
          All Chats
        </Text>
        <FlashList
          renderItem={({ item }) => {
            return <UserChatCard chatData={item} />;
          }}
          data={getChatDataList}
          estimatedItemSize={100}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    rowGap: 16,
  },
  mainText: {
    fontSize: 32,
  },
});
