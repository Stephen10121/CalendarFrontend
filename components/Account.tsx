import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { storeData } from '../functions/localstorage';
import { useDispatch } from 'react-redux';
import { setLogout, setSelected } from '../redux/actions';

export default function Account() {
    const dispatch = useDispatch();
    return (
        <View style={styles.home}>
            <ScrollView style={styles.home2}>
                <View style={styles.greeting}>
                    <Text style={styles.welcome}>My Account</Text>
                </View>
                <View style={styles.everythingElse}>
                    <TouchableOpacity style={styles.goHomeButton} onPress={() => dispatch(setSelected("home"))}>
                        <Text style={styles.goHomeButtonText}>Go Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        storeData(null);
                        dispatch(setLogout());
                        console.log("Logged out.")
                    }} style={styles.logoutButton}>
                        <Image style={styles.imageGroup}
                            source={require('../assets/logout.png')}
                        />
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => dispatch(setSelected("home"))}>
                        <Text style={styles.goHomeButtonText}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    account: {
        width: "100%",
        height: "100%",
        backgroundColor: "#DFDFDF"
    },
    home: {
        width: "100%",
        height: "100%",
        backgroundColor: "#DFDFDF",
        position: "relative"
    },
    home2: {
        width: "100%",
        overflow: "scroll",
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
        fontSize: 35,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    everythingElse: {
        width: "100%",
        paddingHorizontal: 23
    },
    goHomeButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#3A9FE9",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    deleteButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#EE3F3F",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    goHomeButtonText: {
        fontSize: 16,
        fontWeight: "900",
        color: "#FFFFFF",
        fontFamily: "Poppins-SemiBold"
    },
    logoutButton: {
        marginTop: 10,
        width: "100%",
        height: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
        position: "relative"
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    imageGroup: {
        width: 30,
        height: 30,
        position: "absolute",
        top: 10,
        left: 10
    }
});