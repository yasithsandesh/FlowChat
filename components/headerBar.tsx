import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Loading from "../components/loading";
import { ModeStyles } from "../styles/mode-style";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { router } from "expo-router";

interface Props {
  name: string;
}

export default function HeaderBar(prop: Props) {
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
  return (
    <View style={[styles.headerBarView, borderColor]}>
      <Pressable onPress={()=>{
        router.back()
      }} style={[{width:30,height:50,justifyContent:"center",position:"absolute"}]}>
        <Octicons
          name="arrow-left"
          size={24}
          color={colorScheme === "light" ? Colors.light.text : Colors.dark.text}
        />
      </Pressable>
      <View style={styles.settingsTextView}>
        <Text style={[textColor, ModeStyles.Blod, styles.settingText]}>
          {prop.name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBarView: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderBottomWidth: 2,
    alignItems: "center",
  },
  settingsTextView: {
    flex: 1,
    alignItems: "center",
  },
  settingText: {
    fontSize: 16,
  },
});
