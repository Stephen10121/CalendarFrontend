import { View, StyleSheet, ScrollView, Text } from 'react-native'
import React from 'react'
import HomeJob from '../homeJob/HomeJob';

export default function HomeSection({ name }: {name: string}) {
  return (
    <ScrollView style={styles.home}>
        <View style={styles.greeting}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.comingUp}>
            <Text style={styles.title}>Coming up</Text>
            <View style={styles.comingUpList}>
                <HomeJob name="Babysitting" client="Galina Shapoval" time="Tomorrow 10:30 PM"/>
                <HomeJob name="Food Delivery" client="Tanya Gruzin" time="Friday 18th 10:30 PM"/>
            </View>
        </View>
        <View style={styles.available}>
            <Text style={styles.title}>Available</Text>
            <View style={styles.comingUpList}>
                <HomeJob name="Babysitting" client="Galina Shapoval" time="Tomorrow 10:30 PM"/>
                <HomeJob name="Food Delivery" client="Tanya Gruzin" time="Friday 18th 10:30 PM"/>
            </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    home: {
        width: "100%",
        height: "100%",
        backgroundColor: "#DFDFDF",
        paddingBottom: 10
    },
    greeting: {
        width: "100%",
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    welcome: {
        fontSize: 40,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    name: {
        fontSize: 30,
        fontWeight: "900",
        color: "#3A9FE9",
        fontFamily: "Poppins-SemiBold"
    },
    comingUp: {
        width: "100%",
        paddingHorizontal: 23
    },
    title: {
        fontSize: 23,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    comingUpList: {
        paddingTop: 10,
        flexDirection: "column",
    },
    available: {
        width: "100%",
        paddingHorizontal: 23,
        marginTop: 20,
        marginBottom: 10
    }
});