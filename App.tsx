import 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from 'react-query';

import RootStack from './navigation';

import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { getItem } from 'utils/storage';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [onboarded, setOnboarded] = React.useState<null | boolean>(null);

  const queryClient = new QueryClient();

  React.useEffect(() => {
    async function getOnboarded() {
      const onboarded = getItem('ONBOARDED');
      if (onboarded) {
        setOnboarded(true);
        console.log('onboarded', onboarded);
        await SplashScreen.hideAsync();
      } else if (!onboarded) {
        setOnboarded(false);
        await SplashScreen.hideAsync();
      }
    }
    getOnboarded();
  }, []);

  if (onboarded === null) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootStack onBoarded={onboarded} />
    </QueryClientProvider>
  );
}
