import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react"
import { User } from "../model/user.dto";

export const useLoguser =async (name: string):Promise<User> => {

    const getData = async () => {
        const userStringObj = await AsyncStorage.getItem(name);
        const user: User = JSON.parse(userStringObj as string);
        return user
    }
    return  getData();
}