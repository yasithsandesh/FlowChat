import { useState } from "react"
import Loading from "../../components/loading"
import { View } from "react-native"
import { router } from "expo-router"
import ProfileScreen from "../../screens/profileScreen"

export default function Profile(){
    const [loading,setLoading] = useState<boolean>(false)
    
    if(loading){
        return(
            <Loading/>
        )
    }else{
        return(
            <ProfileScreen isLogUser={true}/>
        )
    }
}