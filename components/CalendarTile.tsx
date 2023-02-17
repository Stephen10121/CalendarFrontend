import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CalendarTile({ number, tiles, clicked, gray }: { number: number, tiles?: ("taken" | "available" | "partial")[], clicked: () => any, gray?: boolean }) {
    const windowWidth = Dimensions.get('window').width;
    const styles = StyleSheet.create({
        tile: {
            width: windowWidth / 7,
            borderWidth: 0,
            borderLeftWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#000000",
        },
        clickableTile: {
          width: "100%",
          minHeight: 65,
          position: "relative"
        },
        date: {
            position: "absolute",
            top: 0,
            right: 4,
            fontSize: 15 ,
            fontWeight: "900",
            fontFamily: "Poppins-SemiBold"
        },
        jobTiles: {
          marginTop: 20,
          paddingHorizontal: 5
        },
        jobTile: {
          marginBottom: 5,
          width: "100%",
          height: 10,
          borderRadius: 5
        },
        partial: {
          backgroundColor: "#f2e903"
        },
        taken: {
          backgroundColor: "#EE3F3F"
        },
        available: {
          backgroundColor: "#3A9FE9"
        }
    });
  return (
    <View style={styles.tile}>
      <TouchableOpacity style={styles.clickableTile} onPress={clicked} disabled={gray}>
        <Text style={{...styles.date, color: gray ? "gray" : "#000000"}}>{number}</Text>
        <View style={styles.jobTiles}>
          {Array.isArray(tiles) ?
            <>
              {tiles.map((tile, index) => <View key={`jobTile${tile}${index}w${number}`} style={{...styles.jobTile, ...styles[tile]}}></View>)}
            </>
          : null}
        </View>
      </TouchableOpacity>
    </View>
  )
}