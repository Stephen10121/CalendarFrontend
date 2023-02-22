import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Key({ notAbsolute }: { notAbsolute?: boolean }) {
    return (
        <View style={{...styles.keyTiles, position: notAbsolute ? "relative": "absolute"}}>
            <View style={styles.keyTile}>
                <View style={{...styles.keyTileBox, ...styles.keyTileBoxNotBooked}} />
                <Text style={styles.keyTileText}>Available</Text>
            </View>
            <View style={styles.keyTile}>
                <View style={{...styles.keyTileBox, ...styles.keyTileBoxBooked}} />
                <Text style={styles.keyTileText}>Taken</Text>
            </View>
            <View style={styles.keyTile}>
                <View style={{...styles.keyTileBox, ...styles.keyTileBoxAlmostBooked}} />
                <Text style={styles.keyTileText}>Almost</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    keyTiles: {
        bottom: 2,
        left: 0,
        flexDirection: "row"
    },
    keyTile: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 5
    },
    keyTileText: {
        fontSize: 12,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold",
        marginLeft: 2
    },
    keyTileBox: {
        width: 20,
        height: 20,
        borderRadius: 6,
    },
    keyTileBoxBooked: {
        backgroundColor: "#EE3F3F"
    },
    keyTileBoxNotBooked: {
        backgroundColor: "#3A9FE9"
    },
    keyTileBoxAlmostBooked: {
        backgroundColor: "#ffbc00"
    }
});