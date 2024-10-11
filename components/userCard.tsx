import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { ModeStyles } from "../styles/mode-style";
import { OtherUser } from "../model/responseDTO";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface props {
  userData: OtherUser;
}

const UserCard = ({ userData }: props) => {
  const colorScheme = useColorScheme();

  const textColor =
    colorScheme == "light" ? ModeStyles.textLight : ModeStyles.textDark;

  const borderColor =
    colorScheme === "light" ? ModeStyles.borderLight : ModeStyles.borderDark;

  const cardColor =
    colorScheme === "light"
      ? ModeStyles.cardBackgroundLight
      : ModeStyles.cardBackgroundDark;

  return (
    <Pressable
      style={[borderColor, styles.mainView]}
      onPress={() => {
        router.push({
          pathname: "/user-profile",
          params: {
            user: JSON.stringify(userData.user),
          },
        });
      }}
    >
      <View
        style={[
          cardColor,
          styles.profileView,
          {
            borderColor:
              userData.user.userStatus.id == 1
                ? Colors.secondary.green
                : Colors.secondary.red,
          },
        ]}
      >
        {userData.avatarImageFound?(<Image/>):(
          <Text style={styles.profileText}>{userData.avatarLetters}</Text>
        )}

      </View>
      <View style={styles.view2}>
        <Text
          numberOfLines={1}
          style={[textColor, styles.textName, ModeStyles.semiBlod]}
        >
          {userData.user.firstName + " " + userData.user.lastName}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            ModeStyles.Medium,
            { fontSize: 12, color: Colors.secondary.avatar },
          ]}
        >
          Let's Start New Conversation
        </Text>
      </View>
      <View style={styles.view3}>
        <Ionicons name="git-merge" size={24} color="#CE82FF" />
        <Text style={[ModeStyles.Medium, textColor]}>{userData.gitProfile==undefined?"0":userData.gitProfile.public_repos}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    padding: 16,
    borderWidth: 2,
    height: 100,
    width: "100%",
    borderStyle: "solid",
    marginBottom: 10,
    borderRadius: 24,
    alignItems: "center",
    columnGap: 16,
  },
  view2: {
    rowGap: 8,
  },
  view3: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    rowGap: 8,
  },
  profileView: {
    borderWidth: 3,
    borderStyle: "dashed",
    height: 60,
    width: 60,
    borderRadius: 100,
    justifyContent:"center",
    alignItems:"center"
  },
  textName: {
    fontSize: 20,
  },

  profileText: {
    fontFamily: "Poppins-Bold",
    color: Colors.secondary.purple,
    fontSize: 12,
  },
});

export default UserCard;
