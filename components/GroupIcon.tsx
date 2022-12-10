import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

export default function GroupIcon({ name, owner, id, click, othersCanAdd, notification }: { name: string, owner: string, id: string, click: (id: string, name: string, othersCanAdd: boolean) => void, othersCanAdd: boolean, notification?: boolean }) {
  return (
    <TouchableOpacity style={styles.main} onPress={() => click(id, name, othersCanAdd)}>
        {notification ? <View style={styles.notification}></View> : null}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.owner}>{owner}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    main: {
        borderColor: "#000000",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10,
        width: "100%",
        height: 50,
        marginTop: 5,
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection:"column",
        paddingHorizontal: 5,
        position: "relative"
    },
    name: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    owner: {
        fontSize: 12,
        fontWeight: "500",
        color: "#716B6B",
        fontFamily: "Poppins-SemiBold"
    },
    notification: {
        width: 15,
        height: 15,
        borderRadius: 100,
        backgroundColor: "#EE3F3f",
        position: "absolute",
        top: -6,
        right: -6
    }
});