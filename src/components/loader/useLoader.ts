import { useEffect, useRef } from "react";
import { Animated } from "react-native";


const useLoader = () => {

const pulseAnim = useRef(new Animated.Value(1)).current;
const fadeAnim = useRef(new Animated.Value(0)).current;
const dot1Anim = useRef(new Animated.Value(0)).current;
const dot2Anim = useRef(new Animated.Value(0)).current;
const dot3Anim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated?.loop(
    Animated?.sequence([
      Animated?.timing(pulseAnim, {
        toValue: 1.2,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated?.timing(pulseAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ])
  ).start();

  Animated?.timing(fadeAnim, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true,
  }).start();
  const animateDot = (dotAnim: Animated.Value, delay = 0) => {
    return Animated?.loop(
      Animated?.sequence([
        Animated?.delay(delay),
        Animated?.timing(dotAnim, {
          toValue: -10,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated?.timing(dotAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated?.delay(300),
      ])
    );
  };

  animateDot(dot1Anim, 0)?.start();
  animateDot(dot2Anim, 200)?.start();
  animateDot(dot3Anim, 400)?.start();

}, []);

  return {
    pulseAnim,
    fadeAnim,
    dot1Anim,
    dot2Anim,
    dot3Anim,
    useEffect
  }
}

export default useLoader


