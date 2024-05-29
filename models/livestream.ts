import { Call, StreamVideoClient } from '@stream-io/video-react-native-sdk';
import { create } from 'zustand';

export type LivestreamProps = {
  livestream: {
    callId: string;
  };
  client: null | StreamVideoClient;
  call: null | Call;
  setLivestream: (livestream: LivestreamProps['livestream']) => void;
  setLivestreamClient: (client: StreamVideoClient) => void;
  setActiveCall: (call: Call) => void;
};

export const useLivestreamstore = create<LivestreamProps>((set) => ({
  livestream: {
    callId: '',
  },
  client: null,
  call: null,
  setLivestream: (livestream) => set({ livestream }),
  setLivestreamClient: (client) => set({ client }),
  setActiveCall: (call) => set({ call }),
}));
