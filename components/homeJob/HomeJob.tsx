import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function HomeJob({ name, client, time, id, click }: { name: string, client: string, time: string, id: number, click: (arg0?: boolean) => any }) {
  return (
    <TouchableOpacity style={styles.box} onPress={() => click()}>
        <View style={styles.view2}>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <Text style={styles.client}>{client}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    box: {
        marginTop: 10,
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#000000",
        borderStyle: "solid",
        borderRadius: 10,
        position: 'relative',
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
        paddingHorizontal: 5
    },
    view2: {
        width: "100%"
    },
    name: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "900",
        fontFamily: "Poppins-SemiBold",
        width: "50%"
    },
    client: {
        color: "#716B6B",
        fontSize: 13,
        fontWeight: "500",
        fontFamily: "Poppins-SemiBold"
    },
    time: {
        color: "#000000",
        fontSize: 10,
        fontWeight: "900",
        fontFamily: "Poppins-SemiBold",
        position: "absolute",
        top: 5,
        right: 5
    }
});