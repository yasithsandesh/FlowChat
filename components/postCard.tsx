import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { ModeStyles } from "../styles/mode-style";
import { Colors } from "../constants/colors";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Repository } from "../model/responseDTO";

interface Props{
  repo:Repository
}

export default function PostCard({repo}:Props) {
  const colorScheme = useColorScheme();

  const [getSacal,setSacal] = useState(45);

  const cardBackground =
    colorScheme == "light"
      ? ModeStyles.cardBackgroundLight
      : ModeStyles.postCardBackgroundDark;
  const textColor =
    colorScheme == "light" ? ModeStyles.textLight : ModeStyles.textDark;

  const borderColor =
    colorScheme === "light" ? ModeStyles.borderLight : ModeStyles.borderDark;

  const textInput =
    colorScheme === "light"
      ? ModeStyles.textInputLight
      : ModeStyles.textInputDark;
  return (
    <View style={[cardBackground, styles.mainView]}>
      <Pressable style={[borderColor, styles.linkView]} onPress={()=>{
         Linking.canOpenURL(repo.html_url)
         .then((supported) => {
           if (supported) {
             Linking.openURL(repo.html_url);
           } else {
             console.log("Don't know how to open URI");
           }
         })
         .catch((err) => console.error('An error occurred', err));
      }}>
        <View style={styles.profileView}>
          <Image
            source={repo.owner.avatar_url}
            style={{ height: 40, width: 40, borderRadius: 100 }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={[textColor, ModeStyles.Medium]}>
            {repo.name}
          </Text>
        </View>
      </Pressable>
      <Pressable style={styles.fireView}>
        <View style={styles.langugeView}>
          <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: Colors.secondary.orange,
              borderRadius: 100,
            }}
          >

         

          </View>
          <View style={{ flexDirection: "row", columnGap: 3 }}>
            <Text style={[textColor, ModeStyles.Blod, { fontSize: 13 }]}>
              {repo.language}
            </Text>
            <Text style={[textColor, ModeStyles.Medium, { fontSize: 13 }]}>
              80%
            </Text>
          </View>
        </View>

        <View style={styles.fireBtnView}>
          <LinearGradient
            colors={["#3B82F6", "#9333EA"]}
            style={{
              height: 45,
              width: 45,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[textColor, ModeStyles.Medium, { fontSize: 15 }]} >
              🔥
            </Text>
          </LinearGradient>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    borderStyle: "solid",
    borderColor: Colors.secondary.blue,
    borderBottomWidth: 5,
    marginBottom:20
  },
  linkView: {
    width: "100%",
    padding: 16,
    height: 72,
    borderStyle: "solid",
    borderBottomWidth: 4,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  fireView: {
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  profileView: {
    height: 40,
    width: 40,
  },

  langugeView: {
    flex: 1,
    flexDirection: "row",
    columnGap: 16,
    alignItems: "center",
  },
  fireBtnView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
