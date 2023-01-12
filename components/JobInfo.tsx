import { useEffect, useState } from "react";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { JobType } from "../functions/jobFetch";
import Counter from "./Counter";
import SliderToggle from "./SliderToggle";
import { dayToLetter, monthToLetter } from "../functions/dateConversion";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { POST_SERVER } from "../functions/variables";
import { Store } from "../redux/types";

export interface VolunteerType {
    positions: number;
    fullName: number;
    userId: number;
}

export default function JobInfo({ baseInfo, close, myJob }: { baseInfo: JobType, close: () => any, myJob?: boolean }) {
    const token = useSelector((state: Store) => state.token);
    const queryClient = useQueryClient()
    const [info, setInfo] = useState(baseInfo);
    const [dateString, setDateString] = useState("N/A");
    const [volunteerPositions, setVolunteerPositions] = useState<VolunteerType[]>([]);
    const [positionsTaken, setPositionsTaken] = useState(0);
    const { status, data, refetch } = useQuery<JobType, Error>(["jobInfo"], async () => {
        const groups = await fetch(`${POST_SERVER}/jobInfo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "omit",
            body: JSON.stringify({
                "jobId": baseInfo.ID,
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

    useEffect(() => {
        if (!info) {
            return
        }
        const date = new Date(info.year, info.month-1, info.day);
        setDateString(`${dayToLetter[date.getDay()]}, ${monthToLetter[date.getMonth()]} ${info.day}, ${info.year}`);
        let volunteerPositions2: VolunteerType[] = [];
        let positionsTaken2 = 0;
        try {
            const volunteers: VolunteerType[] = JSON.parse(info.volunteer);
            if (Array.isArray(volunteers)) {
                volunteerPositions2 = volunteers;
                for (let i=0;i<volunteers.length;i++) {
                    positionsTaken2+=volunteers[i].positions;
                }
            }
            setVolunteerPositions(volunteerPositions2);
            setPositionsTaken(positionsTaken2);
        } catch (err) {
            setVolunteerPositions([]);
        }
    }, [info]);

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
              refetch();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (status === "success") {
            setInfo(data);
        }
    }, [status, data]);

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
                        <Text style={styles.li}>• Volunteer{volunteerPositions.length > 1 ? "s" : null}: {volunteerPositions.length!==0 ? null: <Text style={styles.span}>No Volunteers</Text>}</Text>
                        {volunteerPositions.length!==0 ? <View style={styles.volunteerList}>
                            {volunteerPositions.map((volunteer2) => <View style={styles.volunteerListItem} key={`volunteerlist${volunteer2.userId}`}>
                            <Text style={styles.span}>{volunteer2.fullName}</Text>
                            <Text style={styles.positionsBox}>{volunteer2.positions} Positions</Text></View>)}
                        </View>: null}
                        <Text style={styles.li}>• Time: <Text style={styles.span}>{info.hour}:{info.minute}{info.pm ? "PM":"AM"}</Text></Text>
                        <Text style={styles.li}>• Date: <Text style={styles.span}>{dateString}</Text></Text>
                        <Text style={styles.li}>• Job: <Text style={styles.span}>{info.jobTitle}</Text></Text>
                        <Text style={styles.li}>• Positions: <Text style={styles.span}>{info.positions}</Text></Text>
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
    volunteerList: {
        width: "100%",
    },
    volunteerListItem: {
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        flexDirection: "row"
    },
    positionsBox: {
        color: "#646464",
        marginTop: 5,
        fontSize: 15,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
        backgroundColor: "#dfdfdf",
        padding: 5,
        borderRadius: 5
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