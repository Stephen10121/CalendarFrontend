import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
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
                        <View style={{...styles.leftClickButtonView,...styles.buttonView}}>
                            <TouchableOpacity style={styles.clickButton}>
                                <Image style={styles.rightClick}
                                    source={require('../assets/rightarrow.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{...styles.rightClickButtonView,...styles.buttonView}}>
                            <TouchableOpacity style={{...styles.clickButton, ...styles.rightClickButton}}>
                                <Image style={styles.rightClick}
                                    source={require('../assets/rightarrow.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dayView}>
                            <Text style={styles.dayText}>Friday</Text>
                            <Text style={styles.numText}>18</Text>
                        </View>
                        <View style={styles.tileList}>
                            <ScrollView style={styles.tileListInner}>
                                <BigDateTile client='Jeff Jeffins' jobTitle='BabySitting' time='11:30 AM' click={console.log} type="taken" />
                                <BigDateTile client='Jeff Jeffins' jobTitle='Food Delivery' time='1:00 PM' click={console.log} type="available" />
                                <BigDateTile client='Jeff Jeffins' jobTitle='BabySitting' time='11:30 AM' click={console.log} type="almostTaken" />
                                <BigDateTile client='Jeff Jeffins' jobTitle='Food Delivery' time='1:00 PM' click={console.log} type="available" />
                                <BigDateTile client='Jeff Jeffins' jobTitle='BabySitting' time='11:30 AM' click={console.log} type="available" />
                                <BigDateTile client='Jeff Jeffins' jobTitle='Food Delivery' time='1:00 PM' click={console.log} type="taken" />
                            </ScrollView>
                        </View>
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
        height: "77%",
    },
    tileListInner: {
        paddingHorizontal: 25
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
    buttonView: {
        width: 50,
        zIndex: 20,
        height: 50,
        position: "absolute",
        backgroundColor: "#DFDFDF",
        top: "50%",
    },
    rightClickButtonView: {
        right: 0,
        transform: [{translateX: 25},{translateY: -25}]
    },
    leftClickButtonView: {
        left: 0,
        transform: [{translateX: -25},{translateY: -25}]
    },
    clickButton: {
        width: 50,
        height: 50,
        backgroundColor: "#D4D4D4",
        borderColor: "#DFDFDF",
        borderWidth: 5,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 3,
    },
    rightClickButton: {
        transform: [{rotate: "180deg"}]
    },
    rightClick: {
        width: 18,
        height: 18
    }
});