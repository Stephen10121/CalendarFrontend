import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CalendarTile from './CalendarTile';
import { JobType } from '../functions/jobFetch';

export type DateArray = {day: number, month: number}[];

export default function Calendar({ month, year, dateArray, changeMonth, monthJobs }: { month: string, year: number, dateArray: DateArray, changeMonth: (direction: "left" | "right") => void, monthJobs: JobType[] }) {

    function clicked(month: number, day: number) {
        console.log(`tile ${month}${day} clicked`);
    }

    return (
    <View style={styles.calendar}>
        <View style={styles.calendarHeader}>
            <TouchableOpacity style={styles.clicker} onPress={()=>changeMonth("right")}>
                    <Image style={styles.leftClick}
                    source={require('../assets/left.png')}
                />
            </TouchableOpacity>
            <View style={styles.locationSection}>
                <Text style={styles.currentLocation}>{month}</Text>
                <Text style={styles.currentLocationBlue}>{year}</Text>
            </View>
            <TouchableOpacity style={styles.clicker} onPress={() => changeMonth("left")}>
                    <Image style={styles.rightClick}
                    source={require('../assets/left.png')}
                />
            </TouchableOpacity>
        </View>
        {dateArray.length===42 || dateArray.length===35 ? <>
            <View style={styles.calendarRow}>
                {dateArray.slice(0,7).map((val) => {
                    return <CalendarTile key={`calendartile${val.day}m${val.month}`} number={val.day} tiles={monthJobs.filter((job) => job.day === val.day && job.month === val.month).map((data) => data.taken ? "taken" : "available")} clicked={() => clicked(val.month, val.day)} />
                })}
            </View>
            <View style={styles.calendarRow}>
                {dateArray.slice(7,15).map((val) => {
                    return <CalendarTile key={`calendartile${val.day}m${val.month}`} number={val.day} tiles={monthJobs.filter((job) => job.day === val.day && job.month === val.month).map((data) => data.taken ? "taken" : "available")} clicked={() => clicked(val.month, val.day)} />
                })}
            </View>
            <View style={styles.calendarRow}>
                {dateArray.slice(14,22).map((val) => {
                    return <CalendarTile key={`calendartile${val.day}m${val.month}`} number={val.day} tiles={monthJobs.filter((job) => job.day === val.day && job.month === val.month).map((data) => data.taken ? "taken" : "available")} clicked={() => clicked(val.month, val.day)} />
                })}
            </View>
            <View style={styles.calendarRow}>
                {dateArray.slice(21,29).map((val) => {
                    return <CalendarTile key={`calendartile${val.day}m${val.month}`} number={val.day} tiles={monthJobs.filter((job) => job.day === val.day && job.month === val.month).map((data) => data.taken ? "taken" : "available")} clicked={() => clicked(val.month, val.day)} />
                })}
            </View>
            <View style={styles.calendarRow}>
                {dateArray.slice(28,35).map((val) => {
                    return <CalendarTile key={`calendartile${val.day}m${val.month}`} number={val.day} tiles={monthJobs.filter((job) => job.day === val.day && job.month === val.month).map((data) => data.taken ? "taken" : "available")} clicked={() => clicked(val.month, val.day)} />
                })}
            </View>
            {dateArray.length===42 ? 
                <View style={styles.calendarRow}>
                    {dateArray.slice(35,42).map((val) => {
                    return <CalendarTile key={`calendartile${val.day}m${val.month}`} number={val.day} tiles={monthJobs.filter((job) => job.day === val.day && job.month === val.month).map((data) => data.taken ? "taken" : "available")} clicked={() => clicked(val.month, val.day)} />
                })}
                </View>
            : null}
        </> : null}
      <Text>Calendar</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    calendar: {
        
    },
    calendarHeader: {
        width: "100%",
        height: 38,
        backgroundColor: "#000000",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    locationSection: {
        flexDirection: "row"
    },
    currentLocation: {
        fontSize: 15 ,
        fontWeight: "900",
        color: "#ffffff",
        fontFamily: "Poppins-SemiBold"
    },
    currentLocationBlue: {
        fontSize: 15 ,
        fontWeight: "900",
        color: "#3A9FE9",
        fontFamily: "Poppins-SemiBold",
        marginLeft: 10
    },
    clicker: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center"
    },
    leftClick: {
        height: 20,
        width: 20
    },
    rightClick: {
        height: 20,
        width: 20,
        transform: [{rotateY: '180deg'}]
    },
    calendarRow: {
        flexDirection: "row",
    }
});