import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'constants/colors';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import coin from '../assets/coin.png';
import React from 'react';
import { supabase } from 'utils/supabase';
import { getItem } from 'utils/storage';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  wagerId: string;
};

function Wallet({ walletAmount }: { walletAmount: number }) {
  return (
    <View style={styles.wallet}>
      <Text style={styles.walletText}>${walletAmount}</Text>
    </View>
  );
}

const StakeModal = ({ visible, setVisible, wagerId }: Props) => {
  const [loading, setloading] = React.useState(false);

  const confirmStake = React.useCallback(async () => {
    setloading(true);
    const { data: stakers, error } = await supabase
      .from('wagers')
      .select('stakers')
      .eq('id', wagerId);

    const stakersArray = stakers?.[0].stakers;
    console.log('stakers', stakersArray);
    const id = getItem('id');
    const { data: wagers, error: wagersError } = await supabase
      .from('wagers')
      // @ts-ignore
      // .update({ stakers: [...stakers, 13] })
      .update({ stakers: [...stakersArray, id] })
      .eq('id', wagerId)
      .select();

    console.log(wagers, wagersError);
    setloading(false);
    setVisible(false);
  }, [setloading, loading, wagerId]);

  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaView style={[styles.container]}>
        <View style={styles.header}>
          <Wallet walletAmount={100} />
          <Ionicons onPress={() => setVisible(false)} name="close" size={24} color="white" />
        </View>
        <View style={styles.innerContainer}>
          <Image source={coin} style={styles.coin} />
          <View style={styles.textRow}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>Stake</Text>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>$40</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>Max Pay</Text>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>$40</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>Min Pay</Text>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>$40</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>Type</Text>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>Live Stream</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>Date</Text>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>10/11/2024</Text>
          </View>
        </View>
        <Pressable onPress={confirmStake} style={styles.button}>
          {!loading ? (
            <Text style={styles.buttonText}>Confirm</Text>
          ) : (
            <ActivityIndicator size={25} color="white" />
          )}
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

export default StakeModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(6,9,6,5.5)',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  innerContainer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 10,
    paddingBottom: 30,
    gap: 20,
  },
  coin: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
  },
  wallet: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  walletText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
  },
});
