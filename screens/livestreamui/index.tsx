import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  ViewerLivestream,
  useCallStateHooks,
  RequestPermissionRequest,
} from '@stream-io/video-react-native-sdk';
import { useStreamClient } from 'hooks/useStreamClient';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// const callId = 'p6DWeTxjQOko';

export const Livestream = ({ navigation, route }: any = {}) => {
  const { livestream } = route.params;
  const { client, loading } = useStreamClient();
  const [call, setCall] = React.useState<undefined | Call>();

  React.useEffect(() => {
    if (loading || !client || !livestream) return;
    const call = client?.call('livestream', livestream.call_id);
    call?.join();
    setCall(call);
  }, [loading]);

  if (loading || !client || !call) {
    return null;
  }

  console.log('call', livestream.call_id);

  return (
    <StreamVideo client={client as StreamVideoClient} language="en">
      <StreamCall call={call as Call}>
        <SafeAreaView style={{ flex: 1 }}>
          <ViewerLivestream />
        </SafeAreaView>
      </StreamCall>
    </StreamVideo>
  );
};
