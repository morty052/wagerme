import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { SignupScreen } from './routes/SignUpScreen';
import { UserDetails } from './routes/UserDetails';
// @ts-ignore
import { UserNameScreen } from './routes/usernamescreen';
import UserAvatar from './routes/UserAvatar';
import { Colors } from 'constants/colors';
import { BackButton } from 'components/BackButton';

const Stack = createStackNavigator();

export const OnboardingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Details" component={UserDetails} />
      <Stack.Screen name="UsernameScreen" component={UserNameScreen} />
      <Stack.Screen name="UserAvatarCreator" component={UserAvatar} />
    </Stack.Navigator>
  );
};
