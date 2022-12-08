import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from "react-native";

type Border = "black" | "red" | "blue";

export interface SlideUpData {
  show: boolean;
  header: string;
  children: any;
  border: Border;
}

export default function SlideUp({ header, children, close, border }: { header: string, children: any, close: () => void, border: Border}) {
    const win = Dimensions.get('window');

    // style={{ top, border: `2px solid ${borderColor}` }}
const styles = StyleSheet.create({
    cover: {
        width: win.width,
        height: win.height - 70,
        position: 'relative',
        zIndex: 100
    },
    main: {
        width: "100%",
        height: win.height - 90,
        backgroundColor: "#f3f3f3",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: border === "red" ? "#EE3F3f" : border === "blue" ? "#3A9FE9" : "#000000",
        borderBottomWidth: 0,
        position: "absolute",
        left: 0,
        top: 20,
        zIndex: 105
    },
    header: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 20
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    closeButton: {
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center"
    },
    main2: {
        width: "100%",
        height: win.height - 140,
        paddingBottom: 10
    },
    image: {
        width: 20,
        height: 20
    }
});
  return (
    <View style={styles.cover}>
    <View style={styles.main}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{header}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={close}>
              <Image style={styles.image} source={require('../assets/closecircle.png')} />
            </TouchableOpacity>
        </View>
        <View style={styles.main2}>
            {children}
        </View>
    </View>
    </View>
  )
}