import { Button } from 'components/ui/Button';
import Input from 'components/ui/Input';
import { SafeScreen } from 'components/ui/Screen';
import { useUserModel } from 'models/userModel';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from 'utils/supabase';

async function createUser() {
  const { data, error } = await supabase
    .from('users')
    .insert([{ some_column: 'someValue', other_column: 'otherValue' }])
    .select();
}

export const UserNameScreen = ({ navigation }: any) => {
  const [username, setUsername] = React.useState('');
  const [error, setError] = React.useState('');

  const { setUsername: createUsername } = useUserModel();

  const handleSignup = React.useCallback(async () => {
    if (!username) {
      setError('User name is required');
      return;
    }

    createUsername(username);

    navigation.navigate('UserAvatarCreator');
  }, [username, setError]);

  return (
    <SafeScreen style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>Create a username</Text>
          <Text style={styles.subTitle}>Create a unique username for your account</Text>
        </View>
        <View style={styles.form}>
          <View>
            <Input
              setError={setError}
              error={error}
              value={username}
              placeholder="Username"
              onChangeText={setUsername}
            />
            <Text style={{ color: 'white', marginTop: 5 }}>
              Username must be unique and not contain spaces
            </Text>
          </View>
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
      </View>
      <Button onPress={handleSignup} title="Next" />
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  innerContainer: {
    gap: 30,
  },
  form: {
    gap: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
  },
});
