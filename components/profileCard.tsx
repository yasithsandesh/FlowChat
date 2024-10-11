import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors } from "../constants/colors";
import { ModeStyles } from "../styles/mode-style";
import React from "react";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { OtherUser } from "../model/responseDTO";
import { Image } from "expo-image";

interface Props {
  userData:OtherUser
  name: string;
}

export default function ProfileCard(props: Props) {
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme == "light" ? ModeStyles.textLight : ModeStyles.textDark;
  const borderCoolor =
    colorScheme === "light" ? ModeStyles.borderLight : ModeStyles.borderDark;
    const cardBackground =
    colorScheme == "light"
      ? ModeStyles.cardBackgroundLight
      : ModeStyles.cardBackgroundDark;
  return (
    <View style={[borderCoolor, styles.mainView]}>
      <View style={styles.secondView}>
        <View style={styles.view3}>
          <Ionicons name="git-merge" size={24} color="#CE82FF" />
          <Text style={[ModeStyles.Medium, textColor, styles.view3text]}>
            {props.userData.gitProfile==undefined?0:props.userData.gitProfile.public_repos}
          </Text>
        </View>
        <View style={styles.view4}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#89E219" />
        </View>
      </View>
      <View style={[styles.thridView,cardBackground,{justifyContent:"center",alignItems:"center"}]}>
        {props.userData.gitProfile==undefined?(<Text style={styles.profileText}>{props.userData.avatarLetters}</Text>):(<Image source={props.userData.gitProfile.avatar_url} style={{width:120,height:120,borderRadius:100}}/>)}
      </View>
      <Text style={[textColor,ModeStyles.semiBlod,{fontSize:16}]}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: 180,
    height: 228,
    borderWidth: 2,
    borderRadius: 24,
    padding: 16,
    rowGap:8,
    alignItems:"center",
    marginRight:20
  },
  secondView: {
    width: "100%",
    flexDirection: "row",
  },
  view3: {
    flex: 1,
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
  view3text: {
    fontSize: 12,
  },
  view4: {
    flex: 1,
    alignItems: "flex-end",
  },
  thridView:{
    width:120,
    height:120,
    borderRadius:100
  },
  profileText: {
    fontFamily: "Poppins-Bold",
    color: Colors.secondary.purple,
    fontSize: 20,
  },
});
