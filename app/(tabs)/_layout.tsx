import { SplashScreen, Tabs, useLocalSearchParams } from "expo-router";
import { Text, useColorScheme, View } from "react-native";
import { Colors } from "../../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../model/user.dto";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { io, Socket } from "socket.io-client";
import { useLoguser } from "../../hooks/useLoguser";
import { SocketContext } from "../../providers/SocketContext";
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [getUser, setUser] = useState<User | null>(null);
  const colorScheme = useColorScheme();



  const backgroundColor =
    colorScheme === "light" ? Colors.light.background : Colors.dark.background;
  const borderColor =
    colorScheme == "light" ? Colors.light.border : Colors.dark.border;



  return (
  
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: backgroundColor,
            borderTopWidth: 2,
            borderTopColor: borderColor,
            height: 86,
            paddingTop: 20,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"home"} name={"Home"} color={color} focused={""} />
            ),
          }}
        />

        <Tabs.Screen
          name="allChats"
          options={{
            title: "AllChats",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"weixin"}
                name={"Chats"}
                color={color}
                focused={""}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"search"}
                name={"Search"}
                color={color}
                focused={""}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"grin-alt"}
                name={"Profile"}
                color={color}
                focused={""}
              />
            ),
          }}
        />
      </Tabs>
  
  );
}

interface Props {
  icon: string;
  name: string;
  color: string;
  focused: string;
}

const TabIcon = ({ icon, name, color, focused }: Props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <FontAwesome5 name={icon} size={25} color={color} />
      <Text
        style={[{ color: color, fontSize: 12, fontFamily: "Poppins-Medium" }]}
      >
        {name}
      </Text>
    </View>
  );
};
