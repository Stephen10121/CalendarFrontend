import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function EditPosition({close}: {close: () => any}) {
  return (
        <View style={styles.main}>
            <TouchableOpacity style={[styles.main2, styles.mainBlue]} onPress={close}><Text style={styles.mainText2}>Add</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.main2, styles.mainRed]} onPress={close}><Text style={styles.mainText}>Remove</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.main2, styles.mainDef]} onPress={close}><Text style={styles.mainText}>Cancel</Text></TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    main: {
        flexDirection: "row"
    },
    main2: {
        marginTop: 5,
        borderRadius: 5,
        marginLeft: 5,
        padding: 5,
    },
    mainRed: {
        backgroundColor: "#EE3F3F"
    },
    mainBlue: {
        backgroundColor: "#3A9FE9"
    },
    mainDef: {
        backgroundColor: "#d3d3d3"
    },
    mainText: {
        color: "#f3f3f3",
        fontSize: 15,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
    },
    mainText2: {
        color: "#f3f3f3",
        fontSize: 15,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
    }
});