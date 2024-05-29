import { StyleSheet, View } from 'react-native';

const HorizontalRule = () => {
  return <View style={styles.line}></View>;
};

export default HorizontalRule;

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
  },
});
