import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Animated, Easing, Platform } from "react-native";

export type Border = "black" | "red" | "blue" | "yellow";

export interface SlideUpData {
  show: boolean;
  header: string;
  children: any;
}

export default function SlideUp({ header, children, close, border, closeInternal, fullHeight }: { header: string, children: any, close: () => void, border: Border, closeInternal: boolean, fullHeight?: boolean}) {
    const win = Dimensions.get('window');
    const fadeAnim = useRef(new Animated.Value(70)).current;


    function changeTiming(toValue: number) {
        Animated.timing(fadeAnim, {
            toValue,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: Platform.OS==="web" ? false : true
        }).start();
    }

    useEffect(() => {
        changeTiming(-win.height+90);
    }, []);

    useEffect(() => {
        if (closeInternal) {
            closeIt();
        }
    }, [closeInternal]);

    function closeIt() {
        changeTiming(70);
        setTimeout(close, 300);
    }
  return (
    <Animated.View style={[styles.main, {
        borderColor: border === "red" ? "#EE3F3f" : border === "blue" ? "#3A9FE9" : border === "yellow" ? "#ffbc00" : "#000000",
        height: win.height - (fullHeight ? 20 : 90),
        top: win.height-70,
        transform: [{translateY: fadeAnim}]
      }]}>
        <View style={styles.header}>
            <Text style={styles.headerTitle} numberOfLines={1}>{header}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeIt}>
              <Image style={styles.image} source={require('../assets/closecircle.png')} />
            </TouchableOpacity>
        </View>
        <View style={[styles.main2, {height: win.height - (fullHeight ? 70 : 140)}]}>
            {children}
        </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        backgroundColor: "#f3f3f3",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        borderWidth: 2,
        borderStyle: "solid",
        borderBottomWidth: 0,
        position: "absolute",
        left: 0,
        zIndex: 105
    },
    header: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 20
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#000000",
        fontFamily: "Poppins-SemiBold",
    },
    closeButton: {
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center"
    },
    main2: {
        width: "100%"
    },
    image: {
        width: 20,
        height: 20
    }
});