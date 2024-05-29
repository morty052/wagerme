import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RiveAvatarComponent, setStateMachineInput } from 'components/rive/RiveAvatarComponent';
import LoadingScreen from 'components/ui/LoadingScreen';
import { SafeScreen } from 'components/ui/Screen';
import { Colors } from 'constants/colors';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useQuery } from 'react-query';
import { RiveRef } from 'rive-react-native';
import { getItem, removeItem } from 'utils/storage';
import { supabase } from 'utils/supabase';
import { LinearGradient } from 'expo-linear-gradient';

import { RootStackParamList } from '../navigation';

async function fetchUser() {
  const username = getItem('username');
  const { data: user, error } = await supabase.from('users').select('*').eq('username', username);

  console.log(error);

  return user;
}

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

function Avatar() {
  // const [loading, setLoading] = React.useState(true);
  const riveRef = React.useRef<RiveRef>(null);
  const avatar = React.useMemo(() => {
    const avatarObject = getItem('avatar');
    const riveAvatarSelections = JSON.parse(avatarObject as string);
    return riveAvatarSelections;
  }, []);

  React.useEffect(() => {
    // setStateMachineInput('avatar', avatar);

    for (const key in avatar) {
      setStateMachineInput({ riveRef, partToUpdate: `num${key}`, value: avatar[key] });
    }
  }, []);

  return (
    <View>
      <View style={{ width: 100, height: 100 }}>
        <RiveAvatarComponent ref={riveRef} />
      </View>
    </View>
  );
}

function Wallet({ stake }: { stake: number | string }) {
  return (
    <Pressable onPress={() => removeItem('ONBOARDED')} style={styles.walletContainer}>
      <Text style={styles.walletText}>${stake}</Text>
    </Pressable>
  );
}

function DashBoardCard({
  title,
  subTitle,
  marQuee,
  marqueeSub,
  onPress,
}: {
  title: string;
  subTitle: string;
  marQuee: string;
  marqueeSub: string;
  onPress: () => void;
}) {
  return (
    <View
      style={{
        width: '100%',
        height: 220,
        backgroundColor: Colors.darkGrey,
        borderRadius: 30,
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.muted,
        justifyContent: 'space-between',
      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
          <Text style={{ color: 'white', fontWeight: '400', fontSize: 14 }}>{subTitle}</Text>
        </View>
        <Pressable
          onPress={onPress}
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            backgroundColor: 'black',
            paddingHorizontal: 18,
            paddingVertical: 12,
            borderRadius: 10,
          }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>This week</Text>
          <Ionicons name="chevron-down-outline" size={14} color="white" />
        </Pressable>
      </View>
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 40 }}>{marQuee}</Text>
        <Text style={{ color: Colors.primary, fontWeight: '400', fontSize: 14 }}>{marqueeSub}</Text>
      </View>
    </View>
  );
}

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const username = React.useMemo(() => getItem('username'), []);

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeScreen style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.background}
      />
      <View style={styles.header}>
        <Avatar />
        <Wallet stake={100} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Good Morning, {username}</Text>
        <Text style={styles.descriptionText}>Today's summary</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 10,
          paddingBottom: 50,
          paddingTop: 20,
        }}>
        <DashBoardCard
          onPress={() => console.log('StartLiveStreamScreen')}
          title="Total Earnings"
          marQuee="$1,200"
          subTitle="Received from wagers"
          marqueeSub="+$230 more than last week"
        />
        <DashBoardCard
          onPress={() => console.log('StartLiveStreamScreen')}
          title="Total Wagers"
          marQuee="50 Wagers"
          subTitle="Total wagers entered"
          marqueeSub="+10 from last week"
        />
        <DashBoardCard
          onPress={() => console.log('StartLiveStreamScreen')}
          title="Pending Wagers"
          marQuee="0"
          subTitle="Total pending wagers"
          marqueeSub=""
        />
      </ScrollView>
      <StatusBar style="light" />
    </SafeScreen>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 24,
    paddingTop: 20,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleContainer: {
    paddingHorizontal: 10,
  },
  walletContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 120,
    marginBottom: 20,
  },
  walletText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  titleText: { fontSize: 20, fontWeight: '700', color: 'white' },
  descriptionText: { fontSize: 16, fontWeight: '400', color: 'white' },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
});
