import { useEffect, useState } from "react";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { JobType } from "../functions/jobFetch";
import Counter from "./Counter";
import SliderToggle from "./SliderToggle";
import { dayToLetter, monthToLetter } from "../functions/dateConversion";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { POST_SERVER } from "../functions/variables";
import { Store } from "../redux/types";

export interface VolunteerType {
    positions: number;
    fullName: number;
    userId: number;
}

export default function JobInfo({ info, close, myJob }: { info: JobType, close: () => any, myJob?: boolean }) {
    const token = useSelector((state: Store) => state.token);
    const { status, error, data } = useQuery<any, Error>(["jobInfo"], async () => {
        const groups = await fetch(`${POST_SERVER}/jobInfo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "omit",
            body: JSON.stringify({
                "jobId": info.ID,
            })
          })
          return await groups.json();
    }, {
        staleTime: 30000,
        refetchInterval: 30000,
        cacheTime: 0
      });
    const [positions, setPositions] = useState(1);
    const [comments, setComments] = useState(false);
    const date = new Date(info.year, info.month-1, info.day);
    let dateString = `${dayToLetter[date.getDay()]}, ${monthToLetter[date.getMonth()]} ${info.day}, ${info.year}`;
    let volunteerPositions: VolunteerType[] = [];
    let positionsTaken = 0;
    try {
        const volunteers: VolunteerType[] = JSON.parse(info.volunteer);
        if (Array.isArray(volunteers)) {
            volunteerPositions = volunteers;
            for (let i=0;i<volunteers.length;i++) {
                positionsTaken+=volunteers[i].positions;
            }
        }
    } catch (err) {
        volunteerPositions = [];
    }

    async function takeJob() {
        try {
            const groups = await fetch(`${POST_SERVER}/acceptJob`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: "omit",
                body: JSON.stringify({
                    "jobId": info.ID,
                    "positions": positions
                })
              })
              console.log(await groups.json());
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        console.log({status, error, data});
    }, [status]);

    return(
        <ScrollView style={styles.groupInfo}>
            <View style={styles.toggleSection}>
                <SliderToggle width={150} height={35} selected={(a) => setComments(a===1)}/>
            </View>
            {comments ? null :
                <View>
                    <View style={styles.infoList}>
                        <Text style={styles.li}>• Group: <Text style={styles.span}>{info.groupName}</Text></Text>
                        <Text style={styles.li}>• Issued By: <Text style={styles.span}>{info.issuerName}</Text></Text>
                        <Text style={styles.li}>• Client: <Text style={styles.span}>{info.client.length > 0 ? info.client : "Client not given."}</Text></Text>
                        <Text style={styles.li}>• Address: <Text style={styles.span}>{info.address.length > 0 ? info.address : "Address not given."}</Text></Text>
                        <Text style={styles.li}>• Volunteer/s: {volunteerPositions.length!==0 ? volunteerPositions.map((volunteer2) => <Text key={`volunteerlist${volunteer2.userId}`} style={styles.span}>{volunteer2.fullName} {volunteer2.positions}</Text>): <Text style={styles.span}>No Volunteers</Text>}</Text>
                        <Text style={styles.li}>• Time: <Text style={styles.span}>{info.hour}:{info.minute}{info.pm ? "PM":"AM"}</Text></Text>
                        <Text style={styles.li}>• Date: <Text style={styles.span}>{dateString}</Text></Text>
                        <Text style={styles.li}>• Job: <Text style={styles.span}>{info.jobTitle}</Text></Text>
                    </View>
                    <Text style={[styles.info, {marginTop: 30}]}>Instructions</Text>
                    <View style={styles.infoList}>
                        <Text style={styles.li}>{info.instructions}</Text>
                    </View>
                    {!info.taken ?
                    <View style={styles.getJob}>
                        <Counter value={positions} title="Positions" change={setPositions} minLimit={1} maxLimit={info.positions-positionsTaken}/>
                        <TouchableOpacity style={styles.getJobButton} onPress={takeJob}>
                            <Text style={styles.getJobButtonText}>{myJob ? "Add Position" : "Take Job"}</Text>
                        </TouchableOpacity>
                    </View> : null }
                </View>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    error: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    groupInfo: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        overflow: "scroll",
        width: "100%",
        height: "100%",
        position: "relative"
    },
    info: {
        fontSize: 20,
        fontWeight: "600",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    infoList: {
        paddingHorizontal: 10,
        marginTop: 11
    },
    li: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: "700",
        color: "#646464",
        fontFamily: "Poppins-SemiBold"
    },
    span: {
        color: "#000000",
        marginTop: 5,
        fontSize: 15,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold"
    },
    getJob: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    getJobButton: {
        borderRadius: 2,
        backgroundColor: "#3A9FE9",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        width: "100%"
    },
    getJobButtonText: {
        fontSize: 16,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
        color: "#ffffff",
        letterSpacing: 1,
    },
    toggleSection: {
        width: "100%",
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0
    },
});