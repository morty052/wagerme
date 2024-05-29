import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from 'constants/colors';

const StakeButton = ({ handleStake }: { handleStake: () => void }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleStake} role="button" style={styles.button}>
        <Text style={styles.buttonText}>Stake</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StakeButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: '100%',
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    width: '95%',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
