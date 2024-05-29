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

async function SignUp({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  console.log(data, error);
}

export const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const { setUserEmail } = useUserModel();

  const handleSignup = React.useCallback(async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    setUserEmail(email);
    // await SignUp({ email, password });
    navigation.navigate('Details');
  }, [email, password]);

  return (
    <SafeScreen style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subTitle}>Get started with wagerz by creating an account</Text>
        </View>
        <View style={styles.form}>
          <Input
            setError={setError}
            error={error}
            value={email}
            placeholder="Email"
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            setError={setError}
            error={error}
            secureTextEntry
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
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
