import React, {useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {icons} from '../../config/icons';
import SignInUpButton from '../../components/Buttons/SignInUpButton';
import AuthTextInput from '../../components/TextInput/AuthTextInput';
import AuthRedirectButton from '../../components/Buttons/AuthRedirectButton';
import {Auth} from 'aws-amplify';

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const signUp = async () => {
    if (email) {
      try {
        const {user} = await Auth.signUp({
          username,
          password,
          attributes: {
            email,
          },
        });
        navigation.navigate('ConfirmSignUp', {
          username,
        });
      } catch (error) {
        const err = String(error);
        const msg = err.slice(err.indexOf(' '), err.length);
        Alert.alert(`${msg}`);
      }
    }
    if (!email) {
      Alert.alert('Please fill in the required information.');
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <LinearGradient colors={['#29434e', 'grey']} style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create a new account</Text>
        </View>
        <View style={styles.signUp}>
          <AuthTextInput
            title="Username *"
            placeholder="Enter username"
            icon={icons.userIcon}
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <AuthTextInput
            title="Password *"
            placeholder="Enter password"
            icon={icons.passwordIcon}
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <AuthTextInput
            title="E-mail *"
            placeholder="Enter e-mail"
            icon={icons.emailIcon}
            value={email}
            onChangeText={text => setEmail(text)}
            textInputType="email"
          />

          <SignInUpButton title="Sign Up" onPress={signUp}/>

          <View style={styles.textButtonContainer}>
            <AuthRedirectButton
              title="Confirm code"
              onPress={() => navigation.navigate('ConfirmSignUp')}
            />
            <AuthRedirectButton
              title="Sign in"
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  signUp: {
    alignItems: 'center',
    flex: 1,
    top: 30,
  },
  textButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
});

export default SignUp;
