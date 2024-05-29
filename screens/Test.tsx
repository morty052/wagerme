import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from '@stream-io/video-react-native-sdk';
import { Button } from 'components/ui/Button';
import { useStreamClient } from 'hooks/useStreamClient';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from 'utils/supabase';
import { getItem } from 'utils/storage';
import { Screen } from 'components/ui/Screen';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HoststreamUI } from './hoststream/components/HostLiveStreamUi';

async function getToken(): Promise<string | null> {
  const { data, error } = await supabase.functions.invoke('generate-token', {
    body: {
      call_id: 'p6DWeTxjQOko',
      userId: 'Darth_Maul',
    },
  });
  if (data) {
    return data.token;
  } else {
    console.log(error); //   null;
    return null;
  }
}

const apiKey = 'mmhfdzb5evj2';
const userId = 'Darth_Maul';
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiRGFydGhfTWF1bCIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvRGFydGhfTWF1bCIsImlhdCI6MTcxNjEyMDg0NCwiZXhwIjoxNzE2NzI1NjQ5fQ.ylWd7xLOxBlFPayX3SmOGEhgGxuSzBG1GaWIE8sLgW8';
const callId = 'p6DWeTxjQOko';
const user: User = { id: userId };

export default function Test() {
  const { client, loading } = useStreamClient();
  const [call, setCall] = React.useState<undefined | Call>();
  const [startedBackstage, setStartedBackstage] = React.useState(false);

  function startBackStage() {
    call?.join({ create: true });
    setStartedBackstage(true);
  }

  React.useEffect(() => {
    if (loading) return;
    const username = getItem('username');
    const callId = `${username}-${user.id}`;
    const call = client?.call('livestream', callId);
    console.log(call);
    setCall(call);
    // call?.join({ create: true });
  }, [loading]);

  if (loading || !client || !call) {
    return null;
  }

  if (!startedBackstage) {
    return (
      <Screen style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: 'white' }}>
            Set up live stream
          </Text>
          <Ionicons onPress={startBackStage} name="videocam" size={100} color="white" />
        </View>
      </Screen>
    );
  }

  return (
    <>
      <StreamVideo client={client} language="en">
        <StreamCall call={call as Call}>
          <SafeAreaView style={{ flex: 1 }}>
            <HoststreamUI />
          </SafeAreaView>
        </StreamCall>
      </StreamVideo>
    </>
  );
}
