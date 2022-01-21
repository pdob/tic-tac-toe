import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import Welcome from '../components/Welcome';
import MenuButton from '../components/Buttons/MenuButton';
import BackButton from '../components/Buttons/BackButton';
import {LinearGradient} from 'expo-linear-gradient';
import {Auth} from 'aws-amplify';

const Settings = ({navigation}) => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsername();
  }, [username]);

  const getUsername = async () => {
    const user = await Auth.currentUserInfo();
    if (user) {
      setUsername(user.username);
    }
    setLoading(false);
  };

  const signOut = () => {
    Auth.signOut();
    navigation.navigate('Root');
  };

  const signIn = () => {
    navigation.navigate('Root');
  };

  return (
    <View style={styles.background}>
      <LinearGradient colors={['#29434e', 'grey']} style={styles.background}>
        <Welcome />

        {loading ? (
          <ActivityIndicator size="large" color="grey" />
        ) : (
          <View style={styles.container}>
            {username && (
              <Text style={styles.greeting}>Hello, {username}!</Text>
            )}
            {!username && <MenuButton title="Sign in" onPress={signIn} />}
            {username && <MenuButton title="Sign out" onPress={signOut} />}
          </View>
        )}
        <BackButton />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  greeting: {
    paddingBottom: 50,
    fontSize: 30,
    fontStyle: 'italic',
    color: 'white',
  },
});

export default Settings;
