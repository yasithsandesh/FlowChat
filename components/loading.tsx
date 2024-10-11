import { ActivityIndicator, StyleSheet, useColorScheme, View } from "react-native";
import { ModeStyles } from "../styles/mode-style";
import { Colors } from "../constants/colors";

export default function Loading(){

    const colorScheme = useColorScheme();

    const bgColor = colorScheme ==="light"?ModeStyles.backgroundLight:ModeStyles.backgroundDark

    return(
        <View style={[styles.mainView,bgColor]}>
            <ActivityIndicator  size="large" color={Colors.secondary.green}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})