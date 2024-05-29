import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchButton from 'components/SearchButton';
import SortingButton from 'components/SortingButton';
import { Colors } from 'constants/colors';
import { View, Text } from 'react-native';
import { Livestream, Market, WagerScreen } from 'screens';
import Test from 'screens/Test';
import BetCreatorStack from 'screens/bet-creator-stack';
import { HostLiveStreamStack } from 'screens/hoststream';
import { WagerProps } from 'screens/market/components/WagerGrid';
import { OnboardingStack } from 'screens/onboarding-stack';

import { BackButton } from '../components/BackButton';
import Details from '../screens/details';
import Overview from '../screens/overview';
import UserWagersScreen from 'screens/user-wagers';
import { LivestreamProps } from 'models/livestream';

export type RootStackParamList = {
  Overview: undefined;
  Onboarding: undefined;
  Details: { name: string };
  App: undefined;
  WagerScreen: { wager: WagerProps };
  CreateWager: undefined;
  StartLiveStreamScreen: undefined;
  ViewLiveStream: { wager: WagerProps; livestream: LivestreamProps['livestream'] };
};

export type RootTabsParamList = {
  Home: undefined;
  Market: undefined;
  UserWagersScreen: undefined;
  Creator: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootTabsParamList>();

function TabBarIcon({
  title,
  children,
  focused,
}: {
  title: string;
  children: React.ReactNode;
  focused: boolean;
}) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {children}
      <Text style={{ marginTop: 4, color: focused ? Colors.primary : 'white', fontWeight: '600' }}>
        {title}
      </Text>
    </View>
  );
}

function AppTabs({ navigation }: any) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 72,
          backgroundColor: Colors.dark,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Home">
              <Ionicons name="home-outline" size={24} color={focused ? Colors.primary : 'white'} />
            </TabBarIcon>
          ),
        }}
        name="Home"
        component={Overview}
      />
      <Tab.Screen
        options={{
          headerTitleAlign: 'center',
          headerRight: () => <SortingButton />,
          headerLeft: () => <SearchButton />,
          headerShadowVisible: false,
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Market">
              <Ionicons
                name="search-outline"
                size={24}
                color={focused ? Colors.primary : 'white'}
              />
            </TabBarIcon>
          ),
          headerStyle: {
            backgroundColor: Colors.dark,
          },
          headerTitleStyle: {
            color: 'white',
          },
        }}
        name="Market"
        component={Market}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 75,
                width: 75,
                borderRadius: 40,
                backgroundColor: Colors.primary,
                marginBottom: 65,
              }}>
              <Ionicons
                onPress={() => {
                  navigation.navigate('CreateWager');
                }}
                name="add-circle-outline"
                size={70}
                color="white"
              />
            </View>
          ),
          headerShown: false,
        }}
        name="Creator"
        component={BetCreatorStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Wagers">
              <Ionicons name="cash-outline" size={24} color={focused ? Colors.primary : 'white'} />
            </TabBarIcon>
          ),
          headerShown: false,
        }}
        name="UserWagersScreen"
        component={UserWagersScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Settings">
              <Ionicons
                name="options-outline"
                size={24}
                color={focused ? Colors.primary : 'white'}
              />
            </TabBarIcon>
          ),
          headerLeft: () => <BackButton onPress={navigation.goBack} />,
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.dark,
          },
        }}
        name="Settings"
        component={Test}
      />
    </Tab.Navigator>
  );
}

export default function RootStack({ onBoarded }: { onBoarded: null | boolean }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={onBoarded ? 'App' : 'Onboarding'}>
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Onboarding"
          component={OnboardingStack}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
          })}
        />
        <Stack.Screen options={{ headerShown: false }} name="App" component={AppTabs} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CreateWager"
          component={BetCreatorStack}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
            headerTitle: '',
            headerShadowVisible: false,
            headerBackgroundColor: 'black',
          })}
          name="WagerScreen"
          component={WagerScreen}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            headerShown: false,
          })}
          name="StartLiveStreamScreen"
          component={HostLiveStreamStack}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            headerShown: false,
          })}
          name="ViewLiveStream"
          component={Livestream}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
