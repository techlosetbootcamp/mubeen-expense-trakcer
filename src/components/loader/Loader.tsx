import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Loader = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Animated values for the three dots
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulsating animation for wallet icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Fade-in animation for text and dots
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
    // Function to animate a dot (vertical "jump" effect)
    const animateDot = (dotAnim: Animated.Value, delay = 0) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dotAnim, {
            toValue: -10, // move up
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dotAnim, {
            toValue: 0, // move back to original position
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(300), // wait before next jump
        ])
      );
    };

    // Start each dot animation with staggered delays
    animateDot(dot1Anim, 0).start();
    animateDot(dot2Anim, 200).start();
    animateDot(dot3Anim, 400).start();

  }, []);

  return (
    <LinearGradient
      colors={['#fff', '#7f3dff']} // Royal gradient blue shades
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <Ionicons name="wallet" size={60} color="#FFD700" />
      </Animated.View>

      <Animated.View style={{ flexDirection: 'row', marginTop: 15, opacity: fadeAnim }}>
        <Text style={{
          fontSize: 20,
          color: '#fff',
          fontWeight: 'bold',
          letterSpacing: 1.2,
        }}>
          Managing Your Wealth
        </Text>
        <Animated.Text style={{
          transform: [{ translateY: dot1Anim }],
          fontSize: 20,
          color: '#fff',
          fontWeight: 'bold',
          marginHorizontal: 2,
        }}>
          .
        </Animated.Text>
        <Animated.Text style={{
          transform: [{ translateY: dot2Anim }],
          fontSize: 20,
          color: '#fff',
          fontWeight: 'bold',
          marginHorizontal: 2,
        }}>
          .
        </Animated.Text>
        <Animated.Text style={{
          transform: [{ translateY: dot3Anim }],
          fontSize: 20,
          color: '#fff',
          fontWeight: 'bold',
          marginHorizontal: 2,
        }}>
          .
        </Animated.Text>
      </Animated.View>
    </LinearGradient>
  );
};

export default Loader;
