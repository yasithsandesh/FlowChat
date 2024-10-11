import { Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";
import { ModeStyles } from "../styles/mode-style";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import Octicons from "@expo/vector-icons/build/Octicons";
import { Colors } from "../constants/colors";

export default function GitHubSearchCard() {
  const [image, setImage] = useState(require("../assets/github-dark.png"));

  const colorScheme = useColorScheme();
  const textColor =
    colorScheme == "light" ? ModeStyles.textLight : ModeStyles.textDark;
  const borderCoolor =
    colorScheme === "dark" ? ModeStyles.borderLight : ModeStyles.borderDark;
  const cardBackground =
    colorScheme == "light"
      ? ModeStyles.cardBackgroundLight
      : ModeStyles.cardBackgroundDark;

      const inputText = colorScheme =="light"?ModeStyles.textInputLight:ModeStyles.textInputDark

  useEffect(() => {
    {
      colorScheme === "light"
        ? setImage(require("../assets/github-light.png"))
        : setImage(require("../assets/github-dark.png"));
    }
  }, [colorScheme]);

  return (
    <View style={[cardBackground, styles.mainView]}>
      <View style={styles.view2}>
        <Image source={image} style={styles.image} />
        <View>
          <Text style={[ModeStyles.semiBlod,styles.textMain,textColor]}>Search Developers</Text>
          <Text style={[ModeStyles.semiBlod,styles.textMain,textColor]}>and Build Together</Text>
        </View>
      </View>

      <View style={styles.view3}>
        <TextInput style={[styles.textInput,borderCoolor,inputText]} placeholder="Github username....."/>
        <Pressable style={styles.search}>
        <Octicons name="search" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    height: 182,
    borderRadius: 24,
    padding: 16,
    rowGap:16,
    marginBottom:16
  },
  view2: {
    width: "100%",
    flexDirection: "row",
    columnGap: 16,
    alignItems:"center"
  },
  view3: {
    width: "100%",
    flexDirection: "row",
    columnGap: 16,
    alignItems:"center",
    justifyContent:"center"
  },
  image: {
    height: 84,
    width: 84,
  },
  textMain:{
    fontSize:24
  },
  textInput:{
    height:50,
    width:210,
    borderWidth:1,
    borderRadius:10,
    padding:13
  },
  search:{
    width:50,
    height:50,
    backgroundColor:Colors.secondary.purple,
    borderRadius:50,
    justifyContent:"center",
    alignItems:"center",
    borderRightWidth:10
  }
});
