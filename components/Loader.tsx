import { View, StyleSheet } from 'react-native';
import React from 'react';
const LottieView = require("lottie-react-native")

export default function Loader() {
  return (
    <View>
      <LottieView
        source={require("../assets/loading.json")}
        style={styles.animation}
        autoPlay
      />
    </View>
  )
}

const styles = StyleSheet.create({
    animation: {
        width: 100,
        height: 100,
      },
});

// .cloader {
//     width: 100vw;
//     height: 100vh;
//     background-color: #dfdfdf;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }

// .preloader {
//     width: 100%;
//     height: 100%;
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
// .loader2 {
//     width: 24px;
//     height: 24px;
//     border-radius: 50%;
//     position: relative;
//     animation: rotate 1s linear infinite
// }

// .loader::before , .loader::after,
// .loader2::before, .loader2::after {
//     content: "";
//     box-sizing: border-box;
//     position: absolute;
//     inset: 0px;
//     border-radius: 50%;
//     border: 5px solid #EE3F3F;
//     animation: prixClipFix 5s linear infinite ;
// }

// .loader::after,
// .loader2::after {
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