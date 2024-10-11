import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/colors";
import { OtherUser } from "../model/responseDTO";
import { Image } from "expo-image";
import { domain } from "../constants/api";
import { useEffect, useState } from "react";
import { GetGitHubProfileData } from "../api/getGitHubProfileData";

interface Props {
  cardBackGround: object;
  friend: OtherUser;
}

export default function UserProfile(props: Props) {
  const [getfirend, setFriend] = useState<OtherUser>();

  useEffect(() => {
    GetGitHubProfileData(props.friend.user.githubUsername).then(
      (gitProfile) => {
        setFriend({ ...props.friend, gitProfile: gitProfile });
        console.log(getfirend);
      }
    );
  }, []);

  return (
    <View style={[props.cardBackGround, styles.viewMain]}>
      {getfirend?.avatarImageFound ? (
        getfirend?.user?.gitAvatar ? (
          <Image
            style={styles.avatar}
            source={{ uri: getfirend.gitProfile.avatar_url }}
          />
        ) : (
          <Image
            style={styles.avatar}
            source={{
              uri: `${domain}/flow-chat-api/profile-images/${getfirend.user.mobile}/avatar.jpeg`,
            }}
          />
        )
      ) : getfirend?.user?.gitAvatar ? (
        <Image
          style={styles.avatar}
          source={{ uri: getfirend.gitProfile.avatar_url }}
        />
      ) : (
        <Image
          style={styles.avatar}
          source={{
            uri: `${domain}/flow-chat-api/profile-images/${getfirend?.user.mobile}/avatar.jpeg`,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewMain: {
    width: 84,
    height: 84,
    borderRadius: 50,
    borderWidth: 4,
    borderStyle: "dotted",
    borderColor: Colors.secondary.green,
    marginRight: 20,
    justifyContent:"center",
    alignItems:"center"
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});
