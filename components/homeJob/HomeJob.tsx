import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function HomeJob({ name, client, time }: { name: string, client: string, time: string }) {
  return (
    <View style={styles.box}>
        <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.client}>{client}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
    </View>
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
    name: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "900",
        fontFamily: "Poppins-SemiBold"
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