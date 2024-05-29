import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { supabase } from 'utils/supabase';
import { WagerProps } from 'screens/market/components/WagerGrid';
import { getItem } from 'utils/storage';
import { SafeScreen, Screen } from 'components/ui/Screen';
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus';
import { Colors } from 'constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUserModel } from 'models/userModel';
import { useQuery } from 'react-query';
import LoadingScreen from 'components/ui/LoadingScreen';

async function fetchUserWagers() {
  const id = getItem('id');
  console.log(id);
  const { data, error } = await supabase.from('wagers').select().eq('creator', id);
  console.log(data, error);
  return data;
}

function UserWagerCard({ wager, onPress }: { wager: WagerProps; onPress: () => void }) {
  const { title, pot, type } = wager;

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
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
            Opened few mins ago
          </Text>
        </View>
        {type === 'Live Stream' && (
          <Pressable
            onPress={onPress}
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              backgroundColor: Colors.primary,
              paddingHorizontal: 18,
              paddingVertical: 12,
              borderRadius: 10,
            }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Open Studio</Text>
            <Ionicons name="videocam" size={14} color="white" />
          </Pressable>
        )}
      </View>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>
        {title}
      </Text>
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 40 }}>${pot}</Text>
        {/* <Text style={{ color: Colors.primary, fontWeight: '400', fontSize: 14 }}>{marqueeSub}</Text> */}
      </View>
    </View>
  );
}

const UserWagersScreen = () => {
  // const [wagers, setWagers] = React.useState<null | WagerProps[]>([]);
  // const [loading, setLoading] = React.useState(true);

  const navigation = useNavigation<any>();

  const { setActiveWager } = useUserModel();

  const { data: wagers, isLoading } = useQuery({
    queryKey: ['user_wagers'],
    queryFn: fetchUserWagers,
  });

  // React.useEffect(() => {
  //   fetchUserWagers().then((data) => {
  //     if (data?.length === 0) {
  //       setWagers([]);
  //       setLoading(false);
  //       return;
  //     }
  //     setWagers(data);
  //     setLoading(false);
  //   });
  // }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeScreen>
      <View style={styles.container}>
        {!isLoading && wagers?.length === 0 && (
          <Text style={{ textAlign: 'center', color: 'white' }}>No wagers found</Text>
        )}
        {wagers && wagers?.length > 0 && (
          <View style={{ gap: 20 }}>
            <View>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>Your Wagers</Text>
            </View>
            <FlatList
              data={wagers}
              renderItem={({ item }) => (
                <UserWagerCard
                  onPress={() => {
                    setActiveWager(item);
                    navigation.navigate('StartLiveStreamScreen', { wager: item });
                  }}
                  wager={item}
                />
              )}
            />
            <Text
              style={{
                color: Colors.muted,
                fontWeight: 'bold',
                fontSize: 14,
                textAlign: 'center',
              }}>
              Pull down to refresh
            </Text>
          </View>
        )}
      </View>
    </SafeScreen>
  );
};

export default UserWagersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
    gap: 20,
  },
});
