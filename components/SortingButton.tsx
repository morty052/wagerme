import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

const SortingButton = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="options-outline" size={24} color="white" />
    </View>
  );
};

export default SortingButton;

const styles = StyleSheet.create({
  container: {
    marginEnd: 10,
  },
});
