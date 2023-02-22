import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import SliderToggle from './SliderToggle';
import BigDateTile from './BigDateTile';
import { dayToLetterFull, monthToLetterFull } from '../functions/dateConversion';
import { JobType } from '../functions/jobFetch';
import { useSelector } from 'react-redux';
import { Store } from '../redux/types';

export default function BigDate({ myJobShow, myJobToggle, clicked, close, month, day, year, left, right, jobs }: { myJobShow: boolean, myJobToggle: (arg0: boolean) => any, clicked: (job: JobType) => any, close: () => any, month: number, day: number, year: number, left: () => any, right: () => any, jobs: JobType[] }) {
    const userData = useSelector((state: Store) => state.userData);
    const [dayWord, setDayWord] = useState(null);
    const [myDates, setMyDates] = useState(false);
    const [newJobs, setNewJobs] = useState<JSX.Element[]>([]);
    useEffect(() => {
        const date = new Date(year, month-1, day);
        setDayWord(dayToLetterFull[date.getDay()]);
    });

    useEffect(() => {
        setNewJobs(jobs.filter(myDateFilter).map((job) => <BigDateTile volunteersNeeded={job.positions} key={`bigDateJob${job.month}${job.day}${job.ID}`} client={job.client.length > 0 ? job.client : "No Client Specified"} jobTitle={job.jobTitle} time={`${job.hour}:${job.minute.toString().length===1?"0":""}${job.minute} ${job.pm ? "PM" : "AM"}`} click={() => clicked(job)} type={job.volunteer} />));
    }, [jobs, myDates]);

    function myDateFilter(job: JobType) {
        if (!myDates) return true;
        const volunteers = JSON.parse(job.volunteer);
        if (!Array.isArray(volunteers)) return false;
        let iminit = false;
        for (let i=0;i<volunteers.length;i++) {
            if (volunteers[i].userId === userData.ID) {
                iminit=true;
            }
        }
        return iminit
    }
    return (
        <View style={styles.bigDate}>
            <SliderToggle option2Selected={myJobShow} width={150} height={35} selected={(data) => {myJobToggle(data===1);setMyDates(data===1)}} option1="All dates" option2='My dates'/>
            <TouchableOpacity onPress={close} style={styles.goBack}><Text style={styles.goBackText}>Go Back</Text></TouchableOpacity>
            <View style={styles.theRest}>
                <View style={styles.theRestCover}>
                    <Text style={styles.monthText}>{monthToLetterFull[month]}</Text>
                    <View style={styles.calendarTile}>
                        <View style={{...styles.leftClickButtonView,...styles.buttonView}}>
                            <TouchableOpacity style={styles.clickButton} onPress={left}>
                                <Image style={styles.rightClick}
                                    source={require('../assets/rightarrow.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{...styles.rightClickButtonView,...styles.buttonView}}>
                            <TouchableOpacity style={{...styles.clickButton, ...styles.rightClickButton}} onPress={right}>
                                <Image style={styles.rightClick}
                                    source={require('../assets/rightarrow.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dayView}>
                            <Text style={styles.dayText}>{dayWord}</Text>
                            <Text style={styles.numText}>{day}</Text>
                        </View>
                        <View style={styles.tileList}>
                            <ScrollView style={styles.tileListInner}>
                                {newJobs}
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
        backgroundColor: "#ffbc00"
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