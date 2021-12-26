import React, { useRef, useEffect } from 'react';
import {
  Animated,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import Welcome from '../../components/Welcome';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';


const ConfirmSignUp = () => {

  const navigation = useNavigation();
  const authOptions = ['Forgot Password', 'Sign Up'];


  const SignInButton = () => (
    <Pressable style={styles.button}>
      <Text style={styles.text}>Sign Up</Text>
    </Pressable>
  )

  return (
    <View style={styles.background}>
      <LinearGradient
        colors={['#29434e', 'grey']}
        style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Confirm sign up</Text>
        </View>
        <View style={styles.signUp}>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Username *</Text>
            <TextInput 
              style={styles.textInput}
              placeholder='Enter username'
            />
            <Image
              style={styles.icon}
              source={require('../../../assets/icons/user-icon.png')}   
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Confirmation code *</Text>
            <TextInput 
              style={styles.textInput}
              placeholder='Enter confirmation code'
              secureTextEntry={true}
            />
            <Image
              style={styles.icon}
              source={require('../../../assets/icons/password-icon.png')}   
            />
          </View>
      

          <SignInButton />

          <View style={styles.textButtonContainer}>
            <Pressable style={{padding: 10}}>
              <Text style={styles.text}>Resend code</Text>
            </Pressable>
            <Pressable style={{padding: 10}}>
              <Text style={styles.text}>Back to Sign In</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}


const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1
  },
  header: {
    padding: 5,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },  
  signUp: {
    alignItems: 'center',
    flex: 1,
    top: 30
  },
  button: {
    width: '90%',
    backgroundColor: '#1c313a',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 0.5,
    bottom: 10
  },
  icon: {
    width: 25,
    height: 25, 
    bottom: 39,
    left: 5
  },
  inputContainer: {
    width: '90%',
  }, 
  textInput: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.6,
    paddingLeft: 35,
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  textButtonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '90%'
  },
  bottomButton: {
    padding: 30,
    alignItems: 'center'
  }
})

export default ConfirmSignUp;