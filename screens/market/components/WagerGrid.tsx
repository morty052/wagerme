import WagerCard from 'components/WagerCard';
import { avatarStateProps } from 'models/avatarStateContext';
import { LivestreamProps } from 'models/livestream';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export type WagerProps = {
  id: string;
  title: string;
  description: string;
  host: any;
  thumbnail: string;
  pot: number;
  seats: number;
  creator: {
    avatar: avatarStateProps['riveAvatarSelections'];
  };
  type: string;
  category: string;
  livestream: null | LivestreamProps['livestream'];
};

const WagerGrid = ({ data, title }: { data: WagerProps[]; title: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
        horizontal
        data={data}
        renderItem={({ item }) => <WagerCard wager={item} />}
      />
    </View>
  );
};

export default WagerGrid;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
    color: 'white',
  },
});
