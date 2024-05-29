import { createStackNavigator } from '@react-navigation/stack';
import { BackButton } from 'components/BackButton';

import HostStreamScreen from './routes/HostStreamScreen';
import StartLiveStreamScreen from './routes/StartLiveStream';

const Stack = createStackNavigator();

export const HostLiveStreamStack = ({ navigation }: { navigation: any }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton onPress={navigation.goBack} />,
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerShown: true,
        }}
        name="LiveStreamHome"
        component={StartLiveStreamScreen}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton onPress={navigation.goBack} />,
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerShown: false,
        }}
        name="HostLiveStreamScreen"
        component={HostStreamScreen}
      />
    </Stack.Navigator>
  );
};
