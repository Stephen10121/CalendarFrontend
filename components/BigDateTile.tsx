import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function BigDateTile({ jobTitle, client, time, click, type }: { jobTitle: string, client: string, time: string, click: () => any, type: "taken" | "available" | "almostTaken" }) {
  return (
    <TouchableOpacity onPress={click} style={{...styles.tile, borderColor: type==="taken"?"#EE3F3F":type==="available"?"#3A9FE9":"#f2e903"}}>
		<Text style={styles.jobTitle}>{jobTitle}</Text>
		<Text style={styles.client}>{client}</Text>
		<Text style={styles.time}>{time}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    tile: {
		width: "100%",
		height: 60,
		borderWidth: 3,
		borderRadius: 10,
		paddingHorizontal: 5,
		justifyContent: "center",
		marginBottom: 10,
		position:"relative"
    },
    jobTitle: {
		fontSize: 16 ,
		fontWeight: "900",
		color: "#000000",
		fontFamily: "Poppins-SemiBold",
    },
    client: {
		fontSize: 12,
		fontWeight: "normal",
		color: "#716B6B",
		fontFamily: "Poppins-SemiBold",
    },
    time: {
		position: "absolute",
		top: 3,
		right: 5,
		fontSize: 10 ,
		fontWeight: "900",
		color: "#000000",
		fontFamily: "Poppins-SemiBold",
    }
});