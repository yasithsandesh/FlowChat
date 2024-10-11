import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../model/user.dto";
import { TestContext } from "../providers/test";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [getUser,setUser] = useState<User|null>(null);
  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);



  useEffect(() => {
    const findUser = async () => {
      const user = await AsyncStorage.getItem("user");

      if (user != null) {
        setAuth(true);
        const logUser: User = JSON.parse(user);
        setUser(logUser as User)
      
      } else {
        setAuth(false);
      }
    };

    findUser();
  }, []);

  return (
    <TestContext.Provider value={{name:"Yaith"}}>
      <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
      <Stack.Screen  name="single-chat" options={{headerShown:false}} />
      <Stack.Screen  name="profile-setting" options={{title:"Settings",headerShown:false}} />
      <Stack.Screen  name="user-profile" options={{headerShown:false}} />
    </Stack>
    </TestContext.Provider>
  );
}
