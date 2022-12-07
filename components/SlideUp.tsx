import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from "react-native";

type Border = "black" | "red" | "blue";

export interface SlideUpData {
  show: boolean;
  header: string;
  children: any;
  border: Border;
}

export default function SlideUp({ header, children, close, border }: { header: string, children: any, close: () => void, border: Border}) {
    const win = Dimensions.get('window');
    const [open, setOpen] = useState(true);

    const openAnimation = {
      '0%': { top: win.height },
      '100%': { top: 20 },
    }

    const closeAnimation = {
      '0%': { top: 20 },
      '100%': { top: win.height },
    }
    // style={{ top, border: `2px solid ${borderColor}` }}
const styles = StyleSheet.create({
    cover: {
        width: win.width,
        height: win.height - 70,
        position: 'relative',
        zIndex: 100
    },
    main: {
        width: "100%",
        height: win.height - 90,
        backgroundColor: "#f3f3f3",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        position: "absolute",
        left: 0,
        top: 20,
        animationKeyframes: open ? openAnimation : closeAnimation,
        animationDuration: "0.25s",
        animationFillMode: "forwards",
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
        fontFamily: "Poppins-SemiBold"
    },
    closeButton: {
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
    <View style={styles.cover}>
    <View style={styles.main}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{header}</Text>
            <TouchableOpacity onPress={() => {
              setOpen(false);
              setTimeout(close, 250);
            }} style={styles.closeButton}>
              <Image style={styles.image} source={require('../assets/closecircle.png')} />
            </TouchableOpacity>
        </View>
        <View style={styles.main2}>
            {children}
        </View>
    </View>
    </View>
  )
}