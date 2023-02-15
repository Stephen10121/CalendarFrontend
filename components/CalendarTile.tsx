import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

export default function CalendarTile({ number }: { number?: number }) {
    const windowWidth = Dimensions.get('window').width;

    const styles = StyleSheet.create({
        tile: {
            width: windowWidth / 7,
            height: 65,
            borderWidth: 0,
            borderLeftWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#000000",
            position: "relative"
        },
        date: {
            position: "absolute",
            top: 0,
            right: 4,
            fontSize: 15 ,
            fontWeight: "900",
            color: "#000000",
            fontFamily: "Poppins-SemiBold"
        }
    });
  return (
    <View style={styles.tile}>
      <Text style={styles.date}>{number ? number : "1"}</Text>
    </View>
  )
}