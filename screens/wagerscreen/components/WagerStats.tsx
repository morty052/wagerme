import HorizontalRule from 'components/ui/HorizontalRule';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

function StatItem({ title, value }: { title: string; value: string | number }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
      }}>
      <Text style={styles.descriptionText}>{title}</Text>
      <Text style={styles.descriptionText}>{value}</Text>
    </View>
  );
}

function WagerStats({ seats, type, stake }: { seats: number; type: string; stake: number }) {
  return (
    <View style={styles.container}>
      <StatItem title="Seats" value={seats} />
      <HorizontalRule />
      <StatItem title="Type" value={type} />
      <HorizontalRule />
      <StatItem title="Max Pay" value={`$${stake}`} />
      <HorizontalRule />
      <StatItem title="Min Pay" value={`$${stake / seats}`} />
      <HorizontalRule />
      <StatItem title="Deadline" value="2 days from now" />
    </View>
  );
}

export default WagerStats;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    gap: 10,
  },
  descriptionText: { fontSize: 16, fontWeight: '500', color: 'white' },
});
