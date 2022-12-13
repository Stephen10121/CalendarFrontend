import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";

export type MessageType = "alert" | "default" | "success";

export default function PopDown({ message, type }: { message: string, type?: MessageType }) {
  const dispatch = useDispatch();
  const styles = StyleSheet.create({
    cover: {
      position: "relative"
    },
    box: {
      width: "100%",
      padding: 5,
      position: "absolute",
      flex: 1,
      top: 20,
      zIndex: 500,
      left: 0
    },
    innerBox: {
      width: "100%",
      backgroundColor: type === "alert" ? "#EE3F3F" : type === "success" ? "#1cfc03" : "#3A9FE9",
      borderRadius: 2,
      padding: 5,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row"
    },
    text: {
      color: "#000000",
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
        <View style={styles.innerBox}>
          <Text style={styles.text}>{message}</Text>
          <TouchableOpacity onPress={() => {
            dispatch({ type: "SET_ERROR", payload: {message: "N/A", type: "default", show: false} });
          }} style={styles.closeButton}>
            <Image style={styles.image} source={require('../assets/closecircle.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}