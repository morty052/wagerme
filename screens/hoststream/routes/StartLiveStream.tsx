import { Ionicons } from '@expo/vector-icons';
import { Call, StreamCall, User } from '@stream-io/video-react-native-sdk';
import { Button } from 'components/ui/Button';
import { Screen } from 'components/ui/Screen';
import { useStreamClient } from 'hooks/useStreamClient';
import { useLivestreamstore } from 'models/livestream';
import { useUserModel } from 'models/userModel';
import React from 'react';
import { View, Text } from 'react-native';
import { getItem } from 'utils/storage';
import { supabase } from 'utils/supabase';

const userId = 'Darth_Maul';
const user: User = { id: userId };

async function createLiveStream({ call_id, wagerId }: { call_id: string; wagerId: string | null }) {
  const id = getItem('id');

  const { data, error } = await supabase
    .from('livestreams')
    .insert([{ host: id, started: false, ended: false, wager: wagerId, call_id }])
    .select();

  const liveStream_id = data?.[0]?.id;

  console.log({ data, error });

  return liveStream_id;
}

async function updateWagerForLiveStream({
  wagerId,
  liveStream_id,
}: {
  wagerId: string | null;
  liveStream_id: string | null;
}) {
  const { data, error } = await supabase
    .from('wagers')
    .update([
      {
        livestream: liveStream_id,
      },
    ])
    .eq('id', wagerId)
    .select();

  console.log({ data, error });
}

export default function StartLiveStreamScreen({ navigation, route }: any) {
  const { loading } = useStreamClient();
  const [call, setCall] = React.useState<undefined | Call>();
  const [callId, setCallId] = React.useState('');

  const { activeWager } = useUserModel();

  const { client, setActiveCall } = useLivestreamstore();

  async function startBackStage() {
    setActiveCall(call as Call);
    const liveStream_id = await createLiveStream({
      call_id: callId as string,
      wagerId: activeWager && (activeWager.id as string),
    });

    updateWagerForLiveStream({
      wagerId: activeWager && (activeWager.id as string),
      liveStream_id,
    });
    navigation.navigate('HostLiveStreamScreen', {
      wager: activeWager,
    });
  }

  React.useEffect(() => {
    if (loading) return;

    const username = getItem('username');
    const id = getItem('id');
    const callId = `${username}-${id}`;
    const call = client?.call('livestream', callId);
    setCallId(callId);
    setCall(call);
    // call?.join({ create: true });
  }, [loading]);

  if (loading || !client || !call) {
    return null;
  }

  return (
    <>
      <StreamCall call={call as Call}>
        <Screen style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', paddingHorizontal: 20, paddingBottom: 150 }}>
            <View>
              <Text
                style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                Set up live stream
              </Text>
              <Text
                style={{ textAlign: 'center', fontSize: 14, fontWeight: '500', color: 'white' }}>
                Clicking on start setup will start your stream in backstage mode where you can test
                audio and video quality before going live
              </Text>
            </View>
            <Ionicons
              style={{ alignSelf: 'center' }}
              onPress={startBackStage}
              name="videocam"
              size={100}
              color="white"
            />
            <Button onPress={startBackStage} title="Start setup" />
          </View>
        </Screen>
      </StreamCall>
    </>
  );
}
