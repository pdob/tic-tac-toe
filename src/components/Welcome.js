import React, { useRef, useEffect } from 'react';
import {
  Animated,
  View,
  Image,
  StyleSheet
} from 'react-native';



const Welcome = () => {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn();
  }, []);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3500,
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