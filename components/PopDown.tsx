import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

export type MessageType = "alert" | "default" | "success";

export default function PopDown({ message, close, type }: { message: string, close: () => any, type?: MessageType }) {
  const styles = StyleSheet.create({
    cover: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center"
    },
    box: {
      height: 40,
      width: 200,
      backgroundColor: type === "alert" ? "#EE3F3F" : type === "success" ? "#1cfc03" : "#3A9FE9",
      borderRadius: 2,
      padding: 5,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row"
    },
    text: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "700",
      fontFamily: "Poppins-SemiBold",
      letterSpacing: 1,
      marginHorizontal: 10
  },
  closeButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
  },
  image: {
      width: 20,
      height: 20
  }
});

  return (
    <View style={styles.cover}>
      <View style={styles.box}>
        <Text style={styles.text}>{message}</Text>
        <TouchableOpacity onPress={close} style={styles.closeButton}>
          <Image style={styles.image} source={require('../assets/closecircle.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}