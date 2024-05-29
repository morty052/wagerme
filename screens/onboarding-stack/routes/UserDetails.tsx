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

export const UserDetails = ({ navigation }: any) => {
  const [firstName, setfirstName] = React.useState('');
  const [lastName, setlastName] = React.useState('');
  const [error, setError] = React.useState('');

  const { setFirstName, setLastName } = useUserModel();

  const handleSignup = React.useCallback(async () => {
    if (!firstName || !lastName) {
      setError('Both names are required');
      return;
    }

    setFirstName(firstName);
    setLastName(lastName);

    navigation.navigate('UsernameScreen');
  }, [firstName, lastName]);

  return (
    <SafeScreen style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>Whats your name ?</Text>
          <Text style={styles.subTitle}>Please enter your first and last names below</Text>
        </View>
        <View style={styles.form}>
          <Input
            setError={setError}
            error={error}
            value={firstName}
            placeholder="First Name"
            onChangeText={setfirstName}
          />
          <Input
            setError={setError}
            error={error}
            value={lastName}
            placeholder="Last Name"
            onChangeText={setlastName}
          />
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
