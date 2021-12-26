import React, { useRef, useEffect } from 'react';
import {
  Animated,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';


const Welcome = () => {

  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn();
  }, [])
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true
    }).start();
  };


  return (
    <View style={styles.background}>
        <Animated.View style={[styles.animatedBackground, {opacity: fadeAnim}]}>
          <Image 
            source={require('../../assets/logo.png')}
            style={{height: 280, width: 280}}
          />
        </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  background: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  animatedBackground: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center'
  },
  text: {
    fontSize: 45,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'serif',
    padding: 3
  }
})

export default Welcome;