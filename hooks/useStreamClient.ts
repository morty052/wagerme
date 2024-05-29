import { StreamVideoClient, User } from '@stream-io/video-react-native-sdk';
import { useUserModel } from 'models/userModel';
import React from 'react';

import { supabase } from '../utils/supabase';
import { getItem } from 'utils/storage';
import { useLivestreamstore } from 'models/livestream';

const apiKey = 'zuk8cdjvtvxd';

export const useStreamClient = () => {
  const [loading, setLoading] = React.useState(true);
  const [client, setClient] = React.useState<StreamVideoClient | null>(null);
  const [token, settoken] = React.useState<string | undefined>();

  const { setLivestreamClient } = useLivestreamstore();

  const username = React.useMemo(() => getItem('username'), []);

  async function getToken() {
    const { data, error } = await supabase.functions.invoke('generate-token', {
      body: {
        call_id: 'p6DWeTxjQOko',
        userId: `${username}`,
      },
    });
    if (data) {
      return data.token;
    } else {
      console.log(error); //   null;
      return null;
    }
  }

  const user: User = { id: username as string, type: 'authenticated' };

  React.useEffect(() => {
    // async function getToken() {
    //   const { data, error } = await supabase.functions.invoke('generate-token', {
    //     body: {
    //       call_id: 'p6DWeTxjQOko',
    //       userId: `${username}`,
    //     },
    //   });
    //   if (data) {
    //     console.log(data.token);
    //     settoken(data.token);
    //     setLoading(false);
    //   } else {
    //     console.log(error); //   null;
    //     setLoading(false);
    //   }
    // }
    // getToken();
    // if (!token) {
    //   client.connectUser({ id: username, type: 'authenticated' }).then(() => setLoading(false));
    // }

    if (client) {
      return;
    }
    const streamClient = new StreamVideoClient({ apiKey, user, tokenProvider: getToken });
    setClient(streamClient);
    setLivestreamClient(streamClient);
    setLoading(false);
    console.log('Client set up');
  }, [client]);

  return {
    client,
    loading,
  };
};
