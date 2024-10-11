import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { ModeStyles } from "../styles/mode-style";
import { ChatData, GitProfile } from "../model/responseDTO";
import { Colors } from "../constants/colors";
import { router, useRouter } from "expo-router";
import { useLoguser } from "../hooks/useLoguser";
import { useEffect, useState } from "react";
import { User } from "../model/user.dto";
import { Socket } from "socket.io-client";
import { Image } from "expo-image";
import { GetGitHubProfileData } from "../api/getGitHubProfileData";

interface props {
  chatData: ChatData;
}

export default function UserChatCard({ chatData }: props) {
  const colorScheme = useColorScheme();
  const borderColor =
    colorScheme === "light" ? ModeStyles.borderLight : ModeStyles.borderDark;
  const cardColor =
    colorScheme === "light"
      ? ModeStyles.cardBackgroundLight
      : ModeStyles.cardBackgroundDark;
  const textColor =
    colorScheme === "light" ? ModeStyles.textLight : ModeStyles.textDark;

  return (
    <Pressable
      style={[styles.mainView, borderColor]}
      onPress={() => {
        GetGitHubProfileData(chatData.user.githubUsername).then(
          (gitprofile) => {
       
            const updatedUser = { ...chatData.user, gitProfile: gitprofile };

            // Create the updated chat data object
            const updatedChatData: ChatData = {
              ...chatData,
              user: updatedUser,
            };

            // Navigate to the "/single-chat" screen with the updated chat data
            router.push({
              pathname: "/single-chat",
              params: {
                chatData: JSON.stringify(updatedChatData), 
              },
            });
          }
        );
      }}
    >
      <View
        style={[
          styles.profileView,
          cardColor,
          chatData.otherUserStatus == 1
            ? ModeStyles.onlineBorder
            : ModeStyles.offlineBorder,
        ]}
      >
        {chatData.avatarImageFound ? (
          <Image />
        ) : (
          <Text style={styles.profileText}>{chatData.avatarLetters}</Text>
        )}
      </View>
      <View style={[styles.nameTextView]}>
        <Text
          style={[ModeStyles.semiBlod, styles.nameText, textColor]}
          numberOfLines={1}
        >
          {chatData.otherUserName}
        </Text>
        <Text
          numberOfLines={1}
          style={[ModeStyles.Medium, styles.messageText, textColor]}
        >
          {chatData.message}
        </Text>
      </View>
      <View style={styles.timeCountView}>
        <Text
          style={[
            styles.messageText,
            ModeStyles.Medium,
            textColor,
            { marginBottom: 5 },
          ]}
        >
          {"21:39"}
        </Text>
        {chatData.unseenCount == 0 ? (
          ""
        ) : (
          <View style={styles.countView}>
            <Text style={[{ fontSize: 15 }, ModeStyles.semiBlod]}>
              {chatData.unseenCount == 0 ? "" : chatData.unseenCount}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    padding: 16,
    borderWidth: 2,
    height: 95,
    marginBottom: 10,
    borderRadius: 24,
    flexDirection: "row",
    columnGap: 16,
  },
  profileView: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  nameTextView: {
    width: "60%",
  },
  nameText: {
    fontSize: 20,
  },
  messageText: {
    fontSize: 15,
  },
  timeCountView: {
    flex: 1,
    alignItems: "flex-end",
  },
  countView: {
    width: 23,
    height: 23,
    borderRadius: 100,
    backgroundColor: Colors.secondary.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontFamily: "Poppins-Bold",
    color: Colors.secondary.purple,
    fontSize: 12,
  },
});
