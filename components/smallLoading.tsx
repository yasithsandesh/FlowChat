import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";

export default function SmallLoading() {
  const [getcurrentColor, setCurrentColor] = useState(Colors.secondary.purple);

  const colors = [Colors.secondary.purple, Colors.secondary.blue];
  let index = 0;
  useEffect(() => {
    setInterval(() => {
      if (index < 2) {
        setCurrentColor(colors[index]);
        index++;
      } else {
        index = 0;
      }
    }, 2000);
  }, []);

  return (
    <View style={styles.mainview}>
      <ActivityIndicator size={"small"} color={getcurrentColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
