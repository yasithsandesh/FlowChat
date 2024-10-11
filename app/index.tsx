import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import { User } from "../model/user.dto";

export default function Welcome() {
  const [isAuth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const findUser = async () => {
      const user = await AsyncStorage.getItem("user");

      if (user != null) {
        console.log("is auth");
        setAuth(true);
        const logUser: User = JSON.parse(user);
        router.push({pathname:"/home",params:{
            user:JSON.stringify(logUser)
        }});


      } else {
        setAuth(false);
        router.push("/create-account");
   
      }
    };

    findUser();
  }, []);
}
