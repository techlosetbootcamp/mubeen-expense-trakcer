import React from 'react';
import { Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import useLoader from './useLoader';

const Loader = () => {
 
  const {
    pulseAnim,
    fadeAnim,
    dot1Anim,
    dot2Anim,
    dot3Anim,
    useEffect
  } = useLoader()

  return (
    <LinearGradient
      colors={['#fff', '#7f3dff']}
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
