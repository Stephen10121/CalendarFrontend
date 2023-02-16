import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

export default function LoadingIcon({ children }: { children?: string }) {
  return (
    <View style={styles.loadingBox}>
        <ActivityIndicator size="small" color="#000000" />
        <Text style={styles.updatingSectionText}>{children ? children : "Loading"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    loadingBox: {
        alignSelf: 'flex-start',
        height: 40,
        backgroundColor: "#3A9FE9",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingHorizontal: 10,
        position: "absolute",
        bottom: 80,
        right: 10
    },
    updatingSectionText: {
        fontSize: 10,
        fontWeight: "600",
        color: "#000000",
        fontFamily: "Poppins-SemiBold",
        marginLeft: 10
    },
});