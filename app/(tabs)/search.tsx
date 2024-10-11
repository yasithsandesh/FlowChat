import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import Loading from "../../components/loading";
import { useCallback, useEffect, useState } from "react";
import { ModeStyles } from "../../styles/mode-style";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { GitProfile, OtherUser } from "../../model/responseDTO";
import { FlashList } from "@shopify/flash-list";
import UserCard from "../../components/userCard";
import { useLoguser } from "../../hooks/useLoguser";
import { usersSearch } from "../../api/usersSearch";
import { GetGitHubProfileData } from "../../api/getGitHubProfileData";

export default function Search() {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSearch, setloadingSearch] = useState<boolean>(true);
  const [getUserList, setUserList] = useState<OtherUser[]>([]);
  const [getAllUserList, setAllUserList] = useState<OtherUser[]>([]);

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

  const textInput =
    colorScheme === "light"
      ? ModeStyles.textInputLight
      : ModeStyles.textInputDark;

  const gitHubDataSet = async (users: OtherUser[]) => {
    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        const response: GitProfile = await GetGitHubProfileData(
          user.user.githubUsername
        );
        return { ...user, gitProfile: response }; // Add gitProfile to user
      })
    );

    setAllUserList(updatedUsers);
  };

  useEffect(() => {
    useLoguser("user")
      .then(async (user) => {
        usersSearch(user.id.toString(), "empty").then(
          async (response: OtherUser[]) => {
            setUserList(response);
            gitHubDataSet(response).then((status) => {
              setloadingSearch(false);
              setLoading(false);
            });
          }
        );
      })
      .catch((err) => {});
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View style={[styles.mainView, bgColor]}>
        <View style={[styles.searchInputView, cardBackground]}>
          <TextInput
            style={[textColor, styles.searchInput]}
            placeholder="Search...."
            onChangeText={(text) => {
              setloadingSearch(true);

              useLoguser("user")
                .then(async (user) => {
                  const response: OtherUser[] = await usersSearch(
                    user.id.toString(),
                    text
                  );
                   gitHubDataSet(response).then(()=>{
                    setloadingSearch(false);
                    setLoading(false);
                   })
                
                })
                .catch((err) => {});
            }}
          />
          <View style={{ flex: 1, alignItems: "center" }}>
            <FontAwesome5
              name="search"
              size={24}
              color={
                colorScheme === "light" ? Colors.light.text : Colors.dark.text
              }
            />
          </View>
        </View>

        {loadingSearch ? (
          <ActivityIndicator size="large" color={Colors.secondary.blue} />
        ) : (
          <FlashList
            renderItem={({ item }) => {
              return <UserCard userData={item} key={item.user.id} />;
            }}
            data={getAllUserList}
            estimatedItemSize={200}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    rowGap: 25,
  },
  searchInputView: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    width: "85%",
    height: 50,
    paddingLeft: 16,
  },
});
