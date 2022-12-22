import { View, StyleSheet, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, Platform } from "react-native";
import React, { useState } from "react";
import { hours, minutes, months, days, years } from "../functions/dropdownInfo";
import Input from "./Input";
import Checkbox from "expo-checkbox";
import DropDown from "./DropDown";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../redux/reducers";
import { addJob } from "../functions/jobFetch";

export default function AddJobSection() {
    const groups = useSelector<ReduxState, ReduxState["groups"]>((state: ReduxState) => state.groups);
    const token = useSelector<ReduxState, ReduxState["token"]>((state: ReduxState) => state.token);
    const userAllJobs = useSelector<ReduxState, ReduxState["userAllJobs"]>((state: ReduxState) => state.userAllJobs);
    const userJobs = useSelector<ReduxState, ReduxState["userJobs"]>((state: ReduxState) => state.userJobs);
    const [group, setGroup] = useState("");
    let validGroups: {value: string, label: string}[] = [{value: "", label: " "}];
    for(let i=0;i<groups.length;i++) {
        if (groups[i].othersCanAdd || groups[i].youOwn) {
            validGroups.push({value: groups[i].groupId, label: groups[i].groupName});
        }
    }
    const [client, setClient] = useState("");
    const [job, setJob] = useState("");
    const [instructions, setInstructions] = useState("");
    const [address, setAddress] = useState("");
    const [month, setMonth] = useState<string>("0");
    const [day, setDay] = useState<string>("0");
    const [year, setYear] = useState<string>("0");
    const [hour, setHour] = useState<string>("0");
    const [minute, setMinute] = useState<string>("0");
    const [PM, setPM] = useState(false);
    const [positions, setPositions] = useState(1);
    const [notification, setNotification] = useState(true);
    const win = Dimensions.get('window');
    const width = (win.width - (16 + 16 + 23 + 23)) / 3;
    const dispatch = useDispatch();

    const view2 = <View style={styles.home}>
        <View style={styles.greeting}>
            <Text style={styles.welcome}>Add Job</Text>
        </View>
        <View style={styles.form}>
            <DropDown values={validGroups} change={setGroup} placeHolder=" Group"/>
            <Input height={50} change={setClient} placeHolder=" Client (leave empty if no client)" marginTop={20}/>
            <Input height={50} change={setJob} placeHolder=" Job" marginTop={20}/>
            <Input height={50} change={setAddress} placeHolder=" Address (leave empty if no address)" marginTop={20}/>
            <View style={styles.dateSection}>
                <DropDown values={months} change={setMonth} placeHolder=" Month" width={width}/>
                <DropDown values={days} change={setDay} placeHolder=" Day" marginLeft={16} width={width}/>
                <DropDown values={years} change={setYear} placeHolder=" Year" marginLeft={16} width={width}/>
            </View>
            <View style={styles.dateSection}>
                <DropDown values={hours} change={setHour} placeHolder=" Hour" width={width}/>
                <DropDown values={minutes} change={setMinute} placeHolder=" Minute" marginLeft={16} width={width}/>
                <DropDown values={[{value: false, label: "AM"},{value: true, label: "PM"}]} change={setPM} placeHolder=" AM/PM" marginLeft={16} width={width}/>
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
    </View>

    async function sendJob() {
        let convertData: { month: number; day: number; year: number; hour: number; minute: number; };
        try {
            convertData = {
                month: parseInt(month),
                day: parseInt(day),
                year: parseInt(year),
                hour: parseInt(hour),
                minute: parseInt(minute)
            };
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: { show: true, type: "alert", message: "Invalid Date or Time."} });
            return;
        }
        console.log({group, client, job, instructions, address, date: {month, day, year}, time: {hour, minute, PM}, positions, notification})
        const results = await addJob(token, {group, client, jobTitle: job, instructions, address, month: convertData.month, day: convertData.day, year: convertData.year, hour: convertData.hour, minute: convertData.minute, pm: PM, positions, notifications: notification});
        if (results.error) {
            dispatch({ type: "SET_ERROR", payload: { show: true, type: "alert", message: results.error} });
            return;
        }
        if (results.message) {
            dispatch({ type: "SET_ERROR", payload: { show: true, type: "success", message: results.message} });
        }
        if (results.return) {
            const job = results.return;
            const allJobs = userAllJobs;
            allJobs.push(job);
            const userJobs2 = [];
            for (let i=0;i<userJobs.length;i++) {
                if(userJobs[i].groupId === job.groupId) {
                    const newUserJobs = userJobs[i];
                    newUserJobs.jobs.push(job);
                    userJobs2.push(newUserJobs);
                } else {
                    userJobs2.push(userJobs[i]);
                }
            }
            dispatch({ type: "SET_USER_ALL_JOBS", payload: allJobs });
            dispatch({ type: "SET_USER_JOBS", payload: userJobs2 });
            console.log(job);
        }
    }

    if (Platform.OS === "web") {
        return (
            <ScrollView style={styles.webView}>
                {view2}
            </ScrollView>
        );
    }

    return (
            <KeyboardAvoidingView behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        {view2}
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    home: {
        width: "100%",
        backgroundColor: "#DFDFDF"
    },
    webView: {
        width: "100%",
        height: "100%"
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