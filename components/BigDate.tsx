import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import SliderToggle from './SliderToggle';
import BigDateTile from './BigDateTile';

export default function BigDate() {
    return (
        <View style={styles.bigDate}>
            <SliderToggle width={150} height={35} selected={console.log} option1="All dates" option2='My dates'/>
            <TouchableOpacity style={styles.goBack}><Text style={styles.goBackText}>Go Back</Text></TouchableOpacity>
            <View style={styles.theRest}>
                <View style={styles.theRestCover}>
                    <Text style={styles.monthText}>November</Text>
                    <View style={styles.calendarTile}>
                        <View style={styles.dayView}>
                            <Text style={styles.dayText}>Friday</Text>
                            <Text style={styles.numText}>18</Text>
                        </View>
                        <ScrollView style={styles.tileList}>
                            <BigDateTile />
                        </ScrollView>
                        <View style={styles.keyTiles}>
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
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bigDate: {
        width: "100%",
        height: "100%",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative"
    },
    goBack: {
        position: "absolute",
        top: 5,
        left: 5,
    },
    goBackText: {
        fontSize: 15 ,
        fontWeight: "900",
        color: "#3A9FE9",
        fontFamily: "Poppins-SemiBold",
        textDecorationLine: "underline",
        textDecorationColor: "#3A9FE9"
    },
    theRest: {
        paddingTop: 24,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    theRestCover: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 23,
        paddingBottom: 60
    },
    monthText: {
        fontSize: 23,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold",
        marginLeft: 2
    },
    calendarTile: {
        width: "100%",
        height: "100%",
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 10,
        position: "relative"
    },
    dayView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 25
    },
    dayText: {
        fontSize: 20,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold",
        marginLeft: 2
    },
    numText: {
        fontSize: 48,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold",
        marginLeft: 2
    },
    tileList: {
        width: "100%",
        height: 200,
        backgroundColor: "red"
    },
    keyTiles: {
        position: "absolute",
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
        backgroundColor: "#f2e903"
    },
});