import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function GroupIcon({ name, owner, id, click, othersCanAdd }: { name: string, owner: string, id: string, click: (id: string, name: string, othersCanAdd: boolean) => void, othersCanAdd: boolean }) {
  return (
    <TouchableOpacity style={styles.main} onPress={() => click(id, name, othersCanAdd)}>
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
        paddingHorizontal: 5
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
    }
});