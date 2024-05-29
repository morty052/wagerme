import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

const SearchButton = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={24} color="white" />
    </View>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  container: {
    marginStart: 10,
  },
});
