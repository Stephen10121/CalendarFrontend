import { StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';

export default function Loader() {
  const degree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.timing(degree, {
      toValue: 100,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    })).start();
  }, []);

  const styles = StyleSheet.create({
    animation: {
      clipPath:3,
        width: 38,
        height: 38,
        borderRadius: 100,
        borderWidth: 10,
        borderStyle: "solid",
        borderColor: "#EE3F3F",
        borderLeftColor: "#3A9FE9",
        transform: [{rotate: degree.interpolate({
          inputRange: [0, 100],
          outputRange: ['0deg', '360deg'],
        }) as any as string}],
      },
});

  return (
    <Animated.View style={styles.animation}>
    </Animated.View>
  )
}

// .cloader {
//     width: 100vw;
//     height: 100vh;
//     background-color: #dfdfdf;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }

// .loader {
//     width: 48px;
//     height: 48px;
//     border-radius: 50%;
//     position: relative;
//     animation: rotate 1s linear infinite
// }


// .loader::before , .loader::after {
//     content: "";
//     box-sizing: border-box;
//     position: absolute;
//     inset: 0px;
//     border-radius: 50%;
//     border: 5px solid #EE3F3F;
//     animation: prixClipFix 5s linear infinite ;
// }

// .loader::after {
//     border-color: #3A9FE9;
//     animation: prixClipFix 5s linear infinite , rotate 0.5s linear infinite reverse;
//     inset: 6px;
// }

// @keyframes rotate {
//     0%   {transform: rotate(0deg)}
//     100%   {transform: rotate(360deg)}
// }

// @keyframes prixClipFix {
//     0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
//     25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
//     50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
//     75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
//     100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
// }