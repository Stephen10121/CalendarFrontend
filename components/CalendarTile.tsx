import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

export default function CalendarTile({ number, tiles }: { number?: number, tiles?: ("taken" | "available" | "partial")[] }) {
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
        },
        jobTiles: {
          marginTop: 15,
        },
        partial: {
          width: 10,
          height: 10,
          backgroundColor: "#f2e903"
        },
        taken: {
          width: 10,
          height: 10,
          backgroundColor: "#EE3F3F"
        },
        available: {
          width: 10,
          height: 10,
          backgroundColor: "#3A9FE9"
        }
    });
  return (
    <View style={styles.tile}>
      <Text style={styles.date}>{number ? number : "1"}</Text>
      <View style={styles.jobTiles}>
        {Array.isArray(tiles) ?
          <>
          {tiles.map((tile, index) => {
            return <View key={`jobTile${tile}${index}w${number}`} style={styles[tile]}></View>
          })}
          </>
        : null}
      </View>
    </View>
  )
}