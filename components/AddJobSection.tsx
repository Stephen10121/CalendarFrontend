import { View, StyleSheet, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Checkbox from "expo-checkbox";
import DropDown from "./DropDown";
import Counter from "./Counter";

export default function AddJobSection() {
    const [group, setGroup] = useState("");
    const [client, setClient] = useState("");
    const [job, setJob] = useState("");
    const [instructions, setInstructions] = useState("");
    const [address, setAddress] = useState("");
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    const [year, setYear] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [PM, setPM] = useState(false);
    const [positions, setPositions] = useState(1);
    const [notification, setNotification] = useState(true);

    const win = Dimensions.get('window');
    const width = (win.width - (16 + 16 + 23 + 23)) / 3;

    function sendJob() {
        console.log({group, client, job, instructions, address, date: {month, day, year}, time: {hour, minute, PM}, positions, notification})
    }

    return (
            <KeyboardAvoidingView behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView style={styles.home}>
                    <View style={styles.greeting}>
                        <Text style={styles.welcome}>Add Job</Text>
                    </View>
                    <View style={styles.form}>
                        <DropDown change={setGroup} placeHolder=" Group"/>
                        <Input change={setClient} placeHolder=" Client (leave empty if no client)" marginTop={20}/>
                        <Input change={setJob} placeHolder=" Job" marginTop={20}/>
                        <Input change={setAddress} placeHolder=" Address (leave empty if no address)" marginTop={20}/>
                        <View style={styles.dateSection}>
                            <DropDown change={setMonth} placeHolder=" Month" width={width}/>
                            <DropDown change={setDay} placeHolder=" Day" marginLeft={16} width={width}/>
                            <DropDown change={setYear} placeHolder=" Year" marginLeft={16} width={width}/>
                        </View>
                        <View style={styles.dateSection}>
                            <DropDown change={setHour} placeHolder=" Hour" width={width}/>
                            <DropDown change={setMinute} placeHolder=" Minute" marginLeft={16} width={width}/>
                            <DropDown change={setPM} placeHolder=" AM/PM" marginLeft={16} width={width}/>
                        </View>
                        <Input change={setInstructions} placeHolder="Instructions" marginTop={20} multiLine={true}/>
                        <View>
                            <Counter value={positions} minLimit={1} change={setPositions} title="Positions"/>
                        </View>
                        <View style={styles.checkboxPart}>
                            <Text style={styles.checkboxText}>Send a notification</Text>
                            <Checkbox style={styles.checkbox} value={notification} onValueChange={setNotification} />
                        </View>
                        <TouchableOpacity style={styles.send} onPress={sendJob}>
                            <Text style={styles.sendText}>Create Job</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
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
    form: {
        width: "100%",
        paddingHorizontal: 23
    },
    dateSection: {
        marginTop: 20,
        width: "100%",
        flexDirection: "row"
    },
    checkboxPart: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 25,
        width: "100%"
    },
    checkboxText: {
        fontSize: 13,
        fontWeight: "500",
        fontFamily: "Poppins-SemiBold",
        color: "#000000",
    },
    checkbox: {
        margin: 8,
    },
    send: {
        width: "100%",
        height: 50,
        backgroundColor: "#3A9FE9",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 20
    },
    sendText: {
        fontSize: 16,
        fontWeight: "900",
        color: "#FFFFFF",
        fontFamily: "Poppins-SemiBold"
    },
});