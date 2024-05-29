import { Ionicons } from '@expo/vector-icons';
import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from '@stream-io/video-react-native-sdk';
import { Button } from 'components/ui/Button';
import { Screen } from 'components/ui/Screen';
import { useStreamClient } from 'hooks/useStreamClient';
import { useLivestreamstore } from 'models/livestream';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getItem } from 'utils/storage';
import { supabase } from 'utils/supabase';

import { HoststreamUI } from '../components/HostLiveStreamUi';
import { useUserModel } from 'models/userModel';

export default function HostStreamScreen() {
  const [loading, setLoading] = React.useState(true);

  const { call, client } = useLivestreamstore();
  const { activeWager } = useUserModel();

  const [startedBackstage, setStartedBackstage] = React.useState(false);

  async function goLive() {
    const { data: livestream, error: LivestreamError } = await supabase
      .from('livestreams')
      .update({ started: true })
      .eq('host', getItem('id'))
      .select();

    const { data, error } = await supabase
      .from('wagers')
      .update({ streaming: true, livestream: livestream?.[0].id })
      .eq('id', activeWager?.id)
      .select();

    console.log({ data, error, livestream, LivestreamError });
  }

  React.useEffect(() => {
    if (!client || !call) return;

    call?.join({ create: true });
    console.log(activeWager);
    setLoading(false);
  }, []);

  if (loading || !client || !call) {
    return null;
  }

  return (
    <>
      <StreamVideo client={client} language="en">
        <StreamCall call={call as Call}>
          <SafeAreaView style={{ flex: 1 }}>
            <HoststreamUI goLive={goLive} call={call} />
          </SafeAreaView>
        </StreamCall>
      </StreamVideo>
    </>
  );
}
