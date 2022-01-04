import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SignInUpButton from '../../components/Buttons/SignInUpButton';
import AuthTextInput from '../../components/TextInput/AuthTextInput';
import AuthRedirectButton from '../../components/Buttons/AuthRedirectButton';
import { Auth } from 'aws-amplify';
import { icons } from '../../config/icons';


const ResetPassword = ({ navigation }) => {

  const [username, setUsername] = useState('');

  const resetPassword = async () => {

    try {
      await Auth.forgotPassword(username);
      navigation.navigate('ConfirmResetPassword', {
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
        <View style={styles.resetPassword}>
          <AuthTextInput 
            title='Username *'
            placeholder='Enter username'
            icon={icons.userIcon}
            value={username}
            onChangeText={text => setUsername(text)}
          />
      

          <SignInUpButton 
            title='Reset password'
            onPress={resetPassword}
          />

          <View style={styles.textButtonContainer}>
            <AuthRedirectButton 
              title='Back to sign in'
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },  
  resetPassword: {
    alignItems: 'center',
    flex: 1,
    top: 30
  },
  textButtonContainer: {
    justifyContent: 'center',
    width: '90%',
    alignItems: 'center'
  },
})

export default ResetPassword;