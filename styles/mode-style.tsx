import { StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export const ModeStyles = StyleSheet.create({
  Blod:{
    fontFamily:"Poppins-Bold"
  },
  semiBlod: {
    fontFamily: "Poppins-SemiBold",
  },
  Regular: {
    fontFamily: "Poppins-Regular",
  },
  Medium:{
    fontFamily:"Poppins-Medium"
  },
  textMainLight:{
    color:Colors.light.text,
    fontSize:30,
    fontFamily: "Poppins-SemiBold",
  },
  textMainDark:{
    color:Colors.dark.text,
    fontSize:30,
    fontFamily: "Poppins-SemiBold",
  },
  textInputLight:{
    color:Colors.light.text,
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  textInputDark:{
    color:Colors.dark.text,
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },

  textLight:{
    color:Colors.light.text,
  },

  textDark:{
    color:Colors.dark.text,
  },

  backgroundLight:{
    backgroundColor:Colors.light.background
  },
  backgroundDark:{
    backgroundColor:Colors.dark.background
  },
  cardBackgroundLight:{
    backgroundColor:Colors.light.cardColor
  },
  cardBackgroundDark:{
    backgroundColor:Colors.dark.cardColor
  },
  postCardBackgroundDark:{
    backgroundColor:Colors.dark.postCardColor
  },
  borderLight:{
    borderColor:Colors.light.border
  },
  borderDark:{
    borderColor:Colors.dark.border
  },
  onlineBorder:{
    borderColor:Colors.secondary.green
  },
  offlineBorder:{
    borderColor:Colors.secondary.red
  },
  btnViewDark:{
    backgroundColor:Colors.dark.background
  },
  btnViewLight:{
    backgroundColor:Colors.light.border
  }
});
