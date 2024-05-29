import { Colors } from 'constants/colors';
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus';
import React from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { supabase } from 'utils/supabase';

import WagerGrid, { WagerProps } from './components/WagerGrid';
import { Screen } from '../../components/ui/Screen';
import { Ionicons } from '@expo/vector-icons';
import LoadingScreen from 'components/ui/LoadingScreen';

function WagerCategory({
  title,
  icon,
}: {
  title: string;
  icon: typeof Ionicons.defaultProps.name;
}) {
  const width = Dimensions.get('window').width * 0.33;

  return (
    <View
      style={{
        // borderWidth: 1,
        // borderColor: Colors.muted,
        minWidth: 100,
        width,
        height: 100,
        borderRadius: 20,
        backgroundColor: Colors.lightBlack,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Ionicons name={icon} size={24} color="white" />
      <Text style={{ color: 'white' }}>{title}</Text>
    </View>
  );
}

const fetchWagers = async (): Promise<WagerProps[] | []> => {
  const { data: wagers, error } = await supabase.from('wagers').select('*, creator(*)');
  if (error) {
    console.error(error); // error;
    return [];
  }
  return wagers;
};

const categories: { title: string; icon: typeof Ionicons.defaultProps.name }[] = [
  {
    title: 'Sports',
    icon: 'football',
  },
  {
    title: 'Music',
    icon: 'musical-note-outline',
  },
  {
    title: 'Movies',
    icon: 'film-outline',
  },
  {
    title: 'Social Media',
    icon: 'logo-twitter',
  },
  {
    title: 'Politics',
    icon: 'globe-outline',
  },
  {
    title: 'Celebrities',
    icon: 'camera-outline',
  },
  {
    title: 'Gaming',
    icon: 'game-controller-outline',
  },
];

export const Market = () => {
  const {
    data: wagers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['all_wagers'],
    queryFn: fetchWagers,
  });

  React.useEffect(() => {
    // async function fetchWagers() {
    //   const { data: wagers, error } = await supabase.from('wagers').select('*, creator(*)');
    //   if (error) {
    //     console.error(error); // error;
    //     return;
    //   }

    //   console.log(wagers);

    //   setWagers(wagers);
    // }
    fetchWagers();
  }, []);

  // useRefreshOnFocus(refetch);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Screen style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 40, paddingBottom: 50 }}>
        <FlatList
          data={categories}
          renderItem={({ item }) => <WagerCategory icon={item.icon} title={item.title} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
          horizontal
        />
        <WagerGrid title="Wagers around you" data={wagers as WagerProps[]} />
        <WagerGrid title="Trending Wagers" data={wagers as WagerProps[]} />
        <WagerGrid title="Sponsored Wagers" data={wagers as WagerProps[]} />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    gap: 30,
  },
});
