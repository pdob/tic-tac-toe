import React, {useState} from 'react';
import {Alert, View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Welcome from '../../components/Welcome';
import AuthTextInput from '../../components/TextInput/AuthTextInput';
import AuthRedirectButton from '../../components/Buttons/AuthRedirectButton';
import SignInUpButton from '../../components/Buttons/SignInUpButton';
import {icons} from '../../config/icons';
import {LinearGradient} from 'expo-linear-gradient';
import {Auth} from 'aws-amplify';

const SignIn = ({route, navigation}) => {
  const routeUsername = route.params?.username;
  const [username, setUsername] = useState(routeUsername || '');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      const user = await Auth.signIn(username, password);
    } catch (error) {
      Alert.alert('Incorrect login details.');
    } finally {
      const signedInUser = await Auth.currentAuthenticatedUser();
      if (signedInUser) {
        navigation.navigate('Home');
      }
    }
  };

  return (
    <View style={styles.background}>
      <LinearGradient colors={['#29434e', 'grey']} style={styles.background}>
        <Welcome />
        <View style={styles.signIn}>
          <AuthTextInput
            placeholder="Enter username"
            icon={icons.userIcon}
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <AuthTextInput
            placeholder="Enter password"
            icon={icons.passwordIcon}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <SignInUpButton title="Sign In" onPress={signIn}/>
          <View style={styles.textButtonContainer}>
            <AuthRedirectButton
              title="Sign up"
              onPress={() => navigation.navigate('SignUp')}
            />
            <AuthRedirectButton
              title="Forgot password?"
              onPress={() => navigation.navigate('ResetPassword')}
            />
          </View>
        </View>
        <KeyboardAvoidingView behavior="height" style={styles.bottomButton}>
          <AuthRedirectButton
            title="Continue without signing in"
            onPress={() => navigation.navigate('Home')}
          />
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  signIn: {
    alignItems: 'center',
    flex: 1,
    top: 30,
  },
  textButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  bottomButton: {
    padding: 30,
    alignItems: 'center',
  },
});

export default SignIn;
