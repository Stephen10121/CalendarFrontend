import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import React, { useEffect, useRef } from 'react';

export default function SliderToggle({ width, height, selected, option1, option2, option2Selected }: { width: number, height: number, selected: (arg0: any) => any, option1?: string, option2?: string, option2Selected?: boolean }) {
    const singleWidth = (width - 4) / 2;
    const fadeAnim = useRef(new Animated.Value(option2Selected ? singleWidth+2 : 2)).current;

    const styles = StyleSheet.create({
        toggler: {
            width: width,
            height: height,
            backgroundColor: "#AAAAAA",
            borderRadius: 100,
            position: "relative",
            padding: 2,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
        },
        slider: {
            width: singleWidth,
            height: height - 4,
            backgroundColor: "#D4D4D4",
            position: "absolute",
            left: 0,
            top: 2,
            borderRadius: 100,
        },
        button: {
            width: singleWidth,
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
        },
        text1: {
            fontSize: 9,
            fontWeight: "700",
            fontFamily: "Poppins-SemiBold",
            color: "#000000",
            letterSpacing: 1,
            width: singleWidth,
            textAlign: "center"
        },
        text2: {
            fontSize: 9,
            fontWeight: "700",
            fontFamily: "Poppins-SemiBold",
            color: "#000000",
            letterSpacing: 1,
            width: singleWidth,
            textAlign: "center"
        }
    });

    function option1Pressed() {
        selected(0);
        Animated.timing(fadeAnim, {
            toValue: 2,
            duration: 100,
            useNativeDriver: Platform.OS === "web" ? false : true
        }).start();
    }

    function option2Pressed() {
        selected(1);
        Animated.timing(fadeAnim, {
            toValue: singleWidth+2,
            duration: 100,
            useNativeDriver: Platform.OS === "web" ? false : true
          }).start();
    }

    useEffect(() => {
        if (option2Selected) {
            option2Pressed();
            return
        }
        option1Pressed();
    }, [option2Selected]);
  return (
    <View style={styles.toggler}>
        <Animated.View style={[
            styles.slider,
            {
                transform: [{translateX: fadeAnim}]
            }
        ]}></Animated.View>
        <TouchableOpacity style={styles.button} onPress={option1Pressed}><Text style={styles.text1}>{option1 ? option1 : "Info"}</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={option2Pressed}><Text style={styles.text2}>{option2 ? option2 : "Chat"}</Text></TouchableOpacity>
    </View>
  );
}