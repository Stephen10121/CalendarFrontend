import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import getJobState from '../functions/getJobState';

export default function BigDateTile({ jobTitle, client, time, click, type, volunteersNeeded }: { jobTitle: string, client: string, time: string, click: () => any, type: string, volunteersNeeded: number }) {
	const [taken, setTaken] = useState<"taken"|"available"|"almost">("almost");
	useEffect(() => {
		if (!type) return
		setTaken(getJobState(type, volunteersNeeded));
	}, [type]);
  return (
    <TouchableOpacity onPress={click} style={{...styles.tile, borderColor: taken==="taken"?"#EE3F3F":taken==="available"?"#3A9FE9":"#ffbc00"}}>
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