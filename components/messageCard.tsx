import { StyleSheet, Text, View } from "react-native";
import { Message } from "../model/message.dto";
import { Colors } from "../constants/colors";
import { ModeStyles } from "../styles/mode-style";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";

interface props {
  message: Message;
  setMessageCardHight:Function
}

export default function MessageCard({ message,setMessageCardHight }: props) {
  if (message.side == "right") {
    return (
      <View style={styles.rightMessageView} onLayout={(e)=>{
       const {height} = e.nativeEvent.layout;
       setMessageCardHight(height)
      }}>
        <Text style={[{ fontSize: 14 }, ModeStyles.Regular]}>
         {message.message}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 5,
            alignSelf: "flex-end",
          }}
        >
          <FontAwesome5 name="check-double" size={9} color={message.status==1?Colors.secondary.avatar:Colors.dark.background} />
          <Text style={[{ fontSize: 10 }, ModeStyles.Medium]}>{"21:30"}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.leftMessageView} onLayout={(e)=>{
        const {height} = e.nativeEvent.layout;
        setMessageCardHight(height)
       }}>
        <Text
          style={[
            { color: Colors.dark.text, fontSize: 14 },
            ModeStyles.Regular,
          ]}
        >
         {message.message}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ////////////
  chatHistoryView: {
    flex: 1,
    width: "100%",
  },

  rightMessageView: {
    alignSelf: "flex-end",
    maxWidth: "70%",
    height: "auto",
    padding: 10,
    backgroundColor: Colors.secondary.myMessage,
    borderBottomLeftRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginBottom: 10,
    rowGap: 8,
  },
  leftMessageView: {
    alignSelf: "flex-start",
    maxWidth: "70%",
    height: "auto",
    padding: 10,
    backgroundColor: Colors.secondary.otherMessage,
    borderBottomRightRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginBottom: 10,
  },
});
