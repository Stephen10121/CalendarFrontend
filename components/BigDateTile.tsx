import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function BigDateTile() {
  return (
    <View style={styles.tile}>
      <Text>BigDateTile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    tile: {
        width: "100%",
        height: "100%",
        borderWidth: 2,
        borderColor: "#000000"
    }
});