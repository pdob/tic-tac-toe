import React, { useState } from 'react';
import {
  SafeAreaView,
  Alert,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from '../../config/icons';
import SignInUpButton from '../../components/Buttons/SignInUpButton';
import AuthTextInput from '../../components/TextInput/AuthTextInput';
import AuthRedirectButton from '../../components/Buttons/AuthRedirectButton';
import { Auth } from 'aws-amplify';



const ConfirmResetPassword = ({ route, navigation }) => {

  const username = route.params.username;
  const [password, setPassword] = useState('');
  const [authCode, setAuthCode] = useState('');

  const confirmResetPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(username, authCode, password);
      navigation.navigate('SignIn', {
        username
      });
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
          <Text style={styles.headerText}>Reset your password</Text>
        </View>
        <View style={styles.confirmResetPassword}>
          <AuthTextInput 
            placeholder='Enter confirmation code'
            icon={icons.passwordIcon}
            value={authCode}
            onChangeText={text => setAuthCode(text)}
          />
          <AuthTextInput 
            placeholder='Enter new password'
            icon={icons.passwordIcon}
            secureTextEntry={true}
            textContentType='password'
            value={password}
            onChangeText={text => setPassword(text)}
          />
      

          <SignInUpButton 
            title='Reset password'
            onPress={confirmResetPassword}
          />

          <View style={styles.textButtonContainer}>
            <AuthRedirectButton onPress={() => navigation.navigate('SignIn')} />
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
  confirmResetPassword: {
    alignItems: 'center',
    flex: 1,
    top: 30
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  textButtonContainer: {
    alignItems: 'center',
    width: '90%'
  },
})

export default ConfirmResetPassword;