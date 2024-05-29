import { useNavigation } from '@react-navigation/native';
import { Call, useCall, useCallStateHooks, VideoRenderer } from '@stream-io/video-react-native-sdk';
import { Button } from 'components/ui/Button';
import { useUserModel } from 'models/userModel';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import IncallManager from 'react-native-incall-manager';
import { getItem } from 'utils/storage';
import { supabase } from 'utils/supabase';

async function createLiveStream({ call_id, wagerId }: { call_id: string; wagerId: string | null }) {
  const id = getItem('id');

  const { data, error } = await supabase
    .from('livestreams')
    .insert([{ host: id, started: true, ended: false, wager: wagerId, call_id }])
    .select();

  const { data: wagerData, error: wagerError } = await supabase
    .from('wagers')
    .update([
      {
        call_id,
        host: id,
        started: false,
        ended: false,
        wager: wagerId,
      },
    ])
    .eq('id', wagerId)
    .select();

  console.log(
    { data, error, wagerData, wagerError }
    //     {
    //     call_id,
    //     host: id,
    //     started: false,
    //     ended: false,
    //     wager: wagerId,
    //   }
  );
}

export const HoststreamUI = ({}: { call: Call; goLive: () => void }) => {
  const call = useCall();
  const [permisionsGranted, setPermisionsGranted] = React.useState<null | boolean>(null);

  const navigation = useNavigation<any>();

  const { useParticipantCount, useLocalParticipant, useIsCallLive, useHasPermissions } =
    useCallStateHooks();

  const { activeWager } = useUserModel();

  const totalParticipants = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const isCallLive = useIsCallLive();
  const hasPermissions = useHasPermissions();

  // Automatically route audio to speaker devices as relevant for watching videos.
  // Please read more about `media` and `auto` options in the documentation of react-native-incall-manager
  // https://github.com/react-native-webrtc/react-native-incall-manager#usage
  React.useEffect(() => {
    if (!hasPermissions) {
      return;
    }
    IncallManager.start({ media: 'video' });
    return () => IncallManager.stop();
  }, [hasPermissions]);

  React.useEffect(() => {
    if (!hasPermissions) {
      call
        ?.requestPermissions({
          permissions: ['camera', 'microphone'],
        })
        .then(() => setPermisionsGranted(true))
        .catch(() => setPermisionsGranted(false));
    }
  }, []);

  if (permisionsGranted === false) {
    return null;
  }

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: 'black' }]}>
      <View style={styles.flexed}></View>
      {/* <Text style={styles.text}>Live: {totalParticipants}</Text> */}
      {localParticipant && <VideoRenderer participant={localParticipant} trackType="videoTrack" />}
      <View
        style={[
          {
            //   backgroundColor: 'red',
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: 40,
            paddingHorizontal: 20,
          },
        ]}>
        {isCallLive ? (
          <Button
            onPress={() => {
              call?.endCall();
              navigation.navigate('App');
            }}
            title="Stop Livestream"
          />
        ) : (
          <Button
            onPress={() => {
              call?.goLive();
              // goLive();
            }}
            title="Go Live"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexed: {
    flex: 1,
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    backgroundColor: 'blue',
    padding: 6,
    margin: 4,
  },
  bottomBar: {
    alignSelf: 'center',
    margin: 4,
  },
});
