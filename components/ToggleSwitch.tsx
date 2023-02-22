import { TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

export default function ToggleSwitch({ checked, onChange }: { checked: boolean, onChange: (arg0: boolean) => any }) {
    const fadeAnim = useRef(new Animated.Value(checked ? 33 : 2)).current;
    const [animation, _setAnimation] = useState(new Animated.Value(checked ? 0 : 1))
    const [on, setOn] = useState(checked);
    const boxInterpolation =  animation.interpolate({
        inputRange: [0, 1],
        outputRange:["#42FF00" , "#c2c2c2"]
      })

    function optionPressed() {
        if (on) {
            Animated.timing(fadeAnim, {
                toValue: 2,
                duration: 100,
                useNativeDriver: Platform.OS === "web" ? false : true
            }).start();
            Animated.timing(animation, {
                toValue: 1,
                duration: 100,
                useNativeDriver: Platform.OS === "web" ? false : true
            }).start()
            setOn(false);
            return
        }
        Animated.timing(fadeAnim, {
            toValue: 33,
            duration: 100,
            useNativeDriver: Platform.OS === "web" ? false : true
          }).start();
          Animated.timing(animation, {
            toValue: 0,
            duration: 100,
            useNativeDriver: Platform.OS === "web" ? false : true
        }).start()
          setOn(true);
    }

    useEffect(() => {
        onChange(on);
    }, [on]);

  return (
    <Animated.View style={{...styles.cover, backgroundColor: boxInterpolation}}>
        <Animated.View style={[
            styles.slider,
            {
                transform: [{translateX: fadeAnim}]
            }
        ]}></Animated.View>
        <TouchableOpacity style={styles.cover2} onPress={optionPressed}>
    </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
    cover: {
        width: 60,
        height: 29,
        backgroundColor: "#f4f4f4",
        borderRadius: 25
    },
    cover2: {
        width: "100%",
        height: "100%"
    },
    slider: {
        width: 25,
        height: 25,
        backgroundColor: "#ffffff",
        position: "absolute",
        left: 0,
        top: 2,
        borderRadius: 100,
    },
    button: {

    },

});