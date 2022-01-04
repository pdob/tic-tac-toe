import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from '../../config/icons';
import AuthTextInput from '../../components/TextInput/AuthTextInput';
import SignInUpButton from '../../components/Buttons/SignInUpButton';
import AuthRedirectButton from '../../components/Buttons/AuthRedirectButton';
import { Auth } from 'aws-amplify';


const ConfirmSignUp = ({ route, navigation }) => {

  const [username, setUsername] = useState(route.params?.username || '');
  const [authCode, setAuthCode] = useState('');

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, authCode);
      navigation.navigate('SignIn', {
        username
      });
    } catch (error) {
      const err = String(error);
      const msg = err.slice(err.indexOf(' '), err.length);
      Alert.alert(`${msg}`);
    }
  }
  const resendConfirmationCode = async() => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert('Code resent successfully.');
    } catch (error) {
      const err = String(error);
      const msg = err.slice(err.indexOf(' '), err.length);
      Alert.alert(`${msg}`);
    }
  }


  return (
    <SafeAreaView style={styles.background}>
      <LinearGradient
        colors={['#29434e', 'grey']}
        style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Confirm sign up</Text>
        </View>
        <View style={styles.confirmSignUp}>
          <AuthTextInput 
            title='Username *'
            placeholder='Enter username'
            icon={icons.userIcon}
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <AuthTextInput 
            title='Confirmation code *'
            placeholder='Enter confirmation code'
            icon={icons.passwordIcon}
            value={authCode}
            onChangeText={text => setAuthCode(text)}
          />
          
          <SignInUpButton 
            title='Confirm code'
            onPress={confirmSignUp}
          />

          <View style={styles.textButtonContainer}>
            <AuthRedirectButton 
              title='Resend code'
              onPress={resendConfirmationCode}
            />
            <AuthRedirectButton 
              title='Back to Sign in'
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  background: {
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
  confirmSignUp: {
    alignItems: 'center',
    flex: 1,
    top: 30
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
})

export default ConfirmSignUp;