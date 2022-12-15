import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Counter({ value, title, change, minLimit, maxLimit }: { value: number, title: string, change: (arg0: number) => any, minLimit?: number, maxLimit?: number }) {
    const [val2, setVal2] = useState(value);
    const [minStop, setMinStop] = useState(false);
    const [maxStop, setMaxStop] = useState(false);
    const win = Dimensions.get('window');
    const width2 = (win.width - (23 + 23)) / 3;

    useEffect(() => {
        setMaxStop(val2 === maxLimit);
        setMinStop(val2 === minLimit);
        change(val2);
    }, [val2]);

    function increase() {
        if (maxLimit) {
            if (val2 < maxLimit) {
                setVal2(val2 + 1);
            }
            return
        }
        setVal2(val2 + 1);
    }

    function decrease() {
        if (minLimit) {
            if (val2 > minLimit) {
                setVal2(val2 - 1);
            }
            return
        } else {
            setVal2(val2 - 1);
        }
    }

    const styles = StyleSheet.create({
        main: {
            width: "100%",
            height: 65,
            marginTop: 5
        },
        title: {
            fontSize: 10,
            fontWeight: "500",
            fontFamily: "Poppins-SemiBold",
            color: "#000000",
        },
        rest: {
            width: "100%",
            height: 50,
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "#000000",
            borderRadius: 10,
            flexDirection: "row"
        },
        button: {
            width: width2,
            alignItems: "center",
            justifyContent: "center"
        },
        button2: {
            width: width2,
            alignItems: "center",
            justifyContent: "center"
        },
        mid: {
            width: width2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderStyle: "solid",
            borderColor: "#000000",
            alignItems: "center",
            justifyContent: "center"
        },
        text: {
            fontSize: 13,
            fontWeight: "500",
            fontFamily: "Poppins-SemiBold",
            color: "#000000",
        },
        text2: {
            fontSize: 16,
            fontWeight: "500",
            fontFamily: "Poppins-SemiBold",
            color: minStop ? "#a2a2a2" : "#000000"
        },
        text3: {
            fontSize: 16,
            fontWeight: "500",
            fontFamily: "Poppins-SemiBold",
            color: maxStop ? "#a2a2a2" : "#000000"
        }
    });

    return (
        <View style={styles.main}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.rest}>
                <TouchableOpacity style={styles.button} onPress={decrease}>
                    <Text style={styles.text2}>◀</Text>
                </TouchableOpacity>
                <View style={styles.mid}>
                    <Text style={styles.text}>{val2}</Text>
                </View>
                <TouchableOpacity style={styles.button2} onPress={increase}>
                    <Text style={styles.text3}>▶</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}