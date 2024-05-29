import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { BackButton } from 'components/BackButton';
import { Colors } from 'constants/colors';
import { RootStackParamList } from 'navigation';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import StakeButton from './components/StakeButton';
import WagerStats from './components/WagerStats';
import StakeModal from 'components/StakeModal';
import Avatar from 'components/Avatar';
import { supabase } from 'utils/supabase';
import { getItem } from 'utils/storage';
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus';
import { Button } from 'components/ui/Button';
import { LivestreamProps } from 'models/livestream';
import { useQuery } from 'react-query';
import LoadingScreen from 'components/ui/LoadingScreen';

export function StakeIndicator({ stake }: { stake: number | string }) {
  return (
    <View style={styles.stakeContainer}>
      <Text style={styles.stakeText}>${stake}</Text>
    </View>
  );
}

async function fetchWagerStatus(wagerId: string) {
  const userId = getItem('id');
  const { data, error } = await supabase
    .from('wagers')
    .select('stakers, streaming, livestream(call_id)')
    .eq('id', wagerId);
  const stakers = data?.[0].stakers;

  const isStaked = stakers?.includes(Number(userId));
  const isStreaming = data?.[0].streaming;
  const livestream = data?.[0].livestream;

  console.log(data, error);

  // if (isStaked) {
  //   setStaked(true);
  // }

  // if (isStreaming) {
  //   const livestream = data?.[0].livestream;
  //   setStreaming(livestream);
  //   return;
  // }

  return { isStaked, isStreaming, livestream };
}

export const WagerScreen = ({
  route,
  navigation,
}: {
  route: RouteProp<RootStackParamList, 'WagerScreen'>;
  navigation: any;
}) => {
  const [stakeModalOpen, setstakeModalOpen] = React.useState(false);
  // const [staked, setStaked] = React.useState(false);
  const [streaming, setStreaming] = React.useState<null | LivestreamProps['livestream']>(null);
  const { wager } = route.params;

  const {
    data: wagerData,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['wager'],
    queryFn: () => fetchWagerStatus(wager?.id),
  });

  useRefreshOnFocus(refetch);

  const { title, description, creator, thumbnail, seats, pot, type, id } = wager ?? {};
  const { isStaked, isStreaming, livestream } = wagerData ?? {};

  function handleStakeInit() {
    setstakeModalOpen(true);
  }

  function viewLiveStream() {
    navigation.navigate('ViewLiveStream', { wager, livestream });
    console.log(streaming);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
      headerRight: () => (
        // <Ionicons style={{ marginRight: 10 }} name="options-outline" size={24} color="white" />
        <Avatar avatarObject={wager?.creator.avatar} />
      ),
      headerTitle: () => <StakeIndicator stake={wager?.pot} />,
      headerShadowVisible: false,
      headerTitleAlign: 'center',
      headerTransparent: false,
      headerStyle: {
        backgroundColor: 'black',
      },
    });
  }, []);

  // React.useEffect(() => {
  //   fetchWagerStatus({ wagerId: wager?.id, setStaked, setStreaming });
  // }, []);

  // useRefreshOnFocus(() => fetchWagerStatus({ wagerId: wager?.id, setStaked, setStreaming }));

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.thumbnailContainer}>
          {/* <View style={styles.topButtonsContainer}>
      <StakeIndicator stake={stake} />
      
    </View> */}
          <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
        </View>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
          <WagerStats stake={pot} type={type} seats={seats} />
        </View>
        {!isStaked && !isStreaming && <StakeButton handleStake={handleStakeInit} />}
        {isStreaming && <Button onPress={viewLiveStream} title="Join live stream" />}
      </View>
      <StakeModal wagerId={id} setVisible={setstakeModalOpen} visible={stakeModalOpen} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    gap: 20,
  },
  thumbnailContainer: {
    width: '100%',
    position: 'relative',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  stakeContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  stakeText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  thumbnail: {
    width: '100%',
    height: 280,
    borderRadius: 10,
  },
  detailsContainer: {
    gap: 10,
    paddingHorizontal: 10,
  },
  titleText: { fontSize: 20, fontWeight: '700', color: 'white' },
  descriptionText: { fontSize: 16, fontWeight: '400', color: 'white' },
});
