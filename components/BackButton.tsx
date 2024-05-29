import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.backButton}>
      <Ionicons onPress={onPress} name="arrow-back" size={26} color="black" />
    </View>
  );
};
const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: 'center',
  },
  backButtonText: {
    color: 'white',
    marginLeft: 4,
  },
});
