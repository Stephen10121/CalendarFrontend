import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Animated, Easing, Platform } from "react-native";

type Border = "black" | "red" | "blue";

export interface SlideUpData {
  show: boolean;
  header: string;
  children: any;
  border: Border;
}

export default function SlideUp({ header, children, close, border, closeInternal }: { header: string, children: any, close: () => void, border: Border, closeInternal: boolean}) {
    const win = Dimensions.get('window');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: -win.height+90,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: Platform.OS==="web" ? false : true
          }).start();
    }, []);

    useEffect(() => {
        if (closeInternal) {
            closeIt();
        }
    }, [closeInternal]);

    function closeIt() {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: Platform.OS === "web" ? false : true
          }).start();
        setTimeout(close, 300);
    }

    // style={{ top, border: `2px solid ${borderColor}` }}
const styles = StyleSheet.create({
    cover: {
        width: win.width,
        height: win.height - 70,
        position: 'relative',
        zIndex: 100,
        top: 0,
        left: 0
    },
    main: {
        width: "100%",
        height: win.height - 90,
        backgroundColor: "#f3f3f3",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: border === "red" ? "#EE3F3f" : border === "blue" ? "#3A9FE9" : "#000000",
        borderBottomWidth: 0,
        position: "absolute",
        left: 0,
        top: win.height-70,
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
        width: "100%",
        height: win.height - 140,
        paddingBottom: 10
    },
    image: {
        width: 20,
        height: 20
    }
});
  return (
    <Animated.View style={[styles.main, {
        // Bind opacity to animated value
        transform: [{translateY: fadeAnim}]
      }]}>
        <View style={styles.header}>
            <Text style={styles.headerTitle} numberOfLines={1}>{header}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeIt}>
              <Image style={styles.image} source={require('../assets/closecircle.png')} />
            </TouchableOpacity>
        </View>
        <View style={styles.main2}>
            {children}
        </View>
    </Animated.View>
  )
}