import React from 'react';
import { View, Image } from 'react-native';

const Cross = () => (
  <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <Image 
      style={{height: 65, width: 65}}
      source={require('../../assets/icons/cross.png')}
    />
  </View>
)

export default Cross;