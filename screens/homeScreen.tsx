import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { ModeStyles } from "../styles/mode-style";
import UserProfile from "../components/userProfile";
import ProfileCard from "../components/profileCard";
import GitHubSearchCard from "../components/gitHubSearchCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useState } from "react";
import { User } from "../model/user.dto";
import { router, useLocalSearchParams } from "expo-router";
import { getAllUsers } from "../api/getAllUsers";
import { GitProfile, LoadUsersResponseDTO, OtherUser } from "../model/responseDTO";
import { FlashList } from "@shopify/flash-list";
import Loading from "../components/loading";
import { GetGitHubProfileData } from "../api/getGitHubProfileData";
import { Image } from "expo-image";
import { TestContext } from "../providers/test";

export default function HomeScreen() {
  const param = useLocalSearchParams<{ user: string }>();
  const logUser: User = JSON.parse(param.user);
  const [loading,setLoading] = useState<boolean>(true)
  const [getFriendList, setFriendList] = useState<OtherUser[]>();
  const [getUserList, setUserList] = useState<OtherUser[]>();
  const [getAllUserList,setAllUserList] = useState<OtherUser[]>([])
  const colorScheme = useColorScheme();

 const u = useContext(TestContext);

  function getGreeting(): string {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        return "Good Morning";
    } else if (currentHour < 18) {
        return "Good Afternoon";
    } else {
        return "Good Night";
    }
}

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
    const getAllUserCall = async () => {
      try {
        const response: LoadUsersResponseDTO = await getAllUsers(
          logUser.id.toString()
        );
        setUserList(response.allUsers)
        setFriendList(response.firends);
        gitHubDataSet(response.allUsers).then(()=>{
          setLoading(false)
        })
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };
    getAllUserCall();
    console.log(logUser.id);
  }, []);



  const backgroundColor =
    colorScheme === "light"
      ? ModeStyles.backgroundLight
      : ModeStyles.backgroundDark;
  const cardBackground =
    colorScheme == "light"
      ? ModeStyles.cardBackgroundLight
      : ModeStyles.cardBackgroundDark;
  const textColor =
    colorScheme == "light" ? ModeStyles.textLight : ModeStyles.textDark;

  if(loading){
    return(
      <Loading/>
    )
  }else{
    return (
      <View style={[styles.mainView, backgroundColor]}>
        {/* first */}
        <View style={styles.goodDayView}>
          <View style={styles.goodDayView1}>
            <Text style={[ModeStyles.Regular, styles.textGoodDayText, textColor]}>
              {getGreeting()}
            </Text>
            <Text style={[ModeStyles.Regular, styles.textGoodDayText, textColor]}>
              {logUser?.firstName} 🌞 
            </Text>
          </View>
          <View style={[styles.goodDayView2]}>
            <View style={[styles.profileView, cardBackground]}>
              <Image source={{uri:logUser.gitProfile?.avatar_url}} style={{height:84,width:84,borderRadius:100}}/>
            </View>
          </View>
        </View>
  
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.secondContaner}>
            {/* seccond */}
            <View style={styles.secondView}>
              <Text
                style={[styles.secondaryText, textColor, ModeStyles.semiBlod]}
              >
                Firends
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.userProfileView}
              >
                {getFriendList?.map((friend,index) => (
                  <UserProfile cardBackGround={cardBackground} friend={friend} key={friend.user.id}/>
                ))}
              </ScrollView>
            </View>
  
            {/* third */}
            <View style={styles.secondView}>
              <Text
                style={[styles.secondaryText, textColor, ModeStyles.semiBlod]}
              >
                Tranding 🔥
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.userProfileView}
              >
                {getAllUserList?.sort((a,b)=>b.gitProfile.public_repos-a.gitProfile.public_repos).map((userData) => (
                  <ProfileCard name={`${userData.user.firstName}`} key={userData.user.id} userData={userData} />
                ))}
              </ScrollView>
            </View>
  
            {/* forth */}
            <GitHubSearchCard />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    rowGap: 30,
  },
  secondContaner: {
    flex: 1,
    rowGap: 30,
  },

  goodDayView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  goodDayView1: {
    width: "80%",
  },

  goodDayView2: {
    flex: 1,
    alignItems: "flex-end",
  },

  profileView: {
    width: 84,
    height: 84,
    borderRadius: 50,
  },

  textGoodDayText: {
    fontSize: 32,
  },

  ///////

  secondView: {
    width: "100%",
    rowGap: 16,
  },

  secondaryText: {
    fontSize: 24,
  },

  userProfileView: {},
});
