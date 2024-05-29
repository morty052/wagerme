import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';
import { WagerProps } from 'screens/market/components/WagerGrid';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from 'constants/colors';
import { RiveAvatarComponent, setStateMachineInput } from './rive/RiveAvatarComponent';
import React from 'react';
import { avatarStateProps, useAvatarStateContext } from 'models/avatarStateContext';
import { RiveRef } from 'rive-react-native';
import { getItem } from 'utils/storage';

const SeatsDisplay = ({ seats }: { seats: number }) => {
  return (
    <View style={styles.stakeDisplay}>
      <Ionicons name="people-outline" size={20} color="black" />
      <Text>{seats}</Text>
    </View>
  );
};

function Avatar({ avatarObject }: { avatarObject: avatarStateProps['riveAvatarSelections'] }) {
  // const { setAvatar } = useAvatarStateContext();

  const riveRef = React.useRef<RiveRef>(null);
  const avatar = React.useMemo(() => {
    const avatarData = JSON.stringify(avatarObject);
    const riveAvatarSelections = JSON.parse(avatarData);
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
      <View style={{ width: 45, height: 45 }}>
        <RiveAvatarComponent ref={riveRef} />
      </View>
    </View>
  );
}

const WagerCard = ({ wager }: { wager: WagerProps }) => {
  const { title, description, host, thumbnail, pot, seats, creator } = wager;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() => navigation.navigate('WagerScreen', { wager })}
      style={styles.container}>
      <SeatsDisplay seats={seats} />
      <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
      <View style={styles.details}>
        {/* <Image style={styles.avatar} source={{ uri: thumbnail }} /> */}
        <Avatar avatarObject={creator.avatar} />
        <View style={{ paddingRight: 100 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.stake}>${pot}</Text>
          {/* <Text>Live stream</Text> */}
        </View>
      </View>
    </Pressable>
  );
};

export default WagerCard;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.9,
    maxWidth: 450,
    position: 'relative',
  },
  stakeDisplay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  stakeDisplayText: {
    fontSize: 18,
  },
  thumbnail: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.muted,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
  },
  stake: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'white',
    marginTop: -5,
  },
  details: {
    paddingTop: 20,
    flexDirection: 'row',
    gap: 10,
    // backgroundColor: 'white',
  },
});
