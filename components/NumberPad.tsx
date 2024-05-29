import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'constants/colors';

const NumberButton = ({
  number,
  handlePress,
}: {
  number: number;
  handlePress: (number: string) => void;
}) => {
  return (
    <Pressable onPress={() => handlePress(number.toString())} style={styles.button}>
      <Text style={styles.number}>{number}</Text>
    </Pressable>
  );
};

const DoneButton = ({ handlePress }: { handlePress: () => void }) => {
  return (
    <Pressable onPress={handlePress} style={[styles.button, { backgroundColor: Colors.primary }]}>
      <Ionicons name="checkmark-outline" size={30} color="white" />
    </Pressable>
  );
};

const BackSpaceButton = ({ handlePress }: { handlePress: () => void }) => {
  return (
    <Pressable onPress={handlePress} style={[styles.button, { backgroundColor: 'red' }]}>
      <Ionicons name="backspace" size={30} color="white" />
    </Pressable>
  );
};

const NumberPad = ({
  amount,
  setAmount,
  handleDone,
}: {
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  handleDone: () => void;
}) => {
  const enterNumber = (number: string) => {
    setAmount((prevAmount) => prevAmount + number);
  };

  const removeNumber = () => {
    const numbers = amount.split('');
    numbers.pop();
    setAmount(numbers.join(''));
  };

  return (
    <View style={styles.container}>
      <View style={styles.dialPad}>
        <NumberButton handlePress={(number) => enterNumber(number)} number={1} />
        <NumberButton handlePress={(number) => enterNumber(number)} number={2} />
        <NumberButton handlePress={(number) => enterNumber(number)} number={3} />
      </View>
      <View style={styles.dialPad}>
        <NumberButton handlePress={(number) => enterNumber(number)} number={4} />
        <NumberButton handlePress={(number) => enterNumber(number)} number={5} />
        <NumberButton handlePress={(number) => enterNumber(number)} number={6} />
      </View>
      <View style={styles.dialPad}>
        <NumberButton handlePress={(number) => enterNumber(number)} number={7} />
        <NumberButton handlePress={(number) => enterNumber(number)} number={8} />
        <NumberButton handlePress={(number) => enterNumber(number)} number={9} />
      </View>
      <View style={styles.dialPad}>
        <BackSpaceButton handlePress={removeNumber} />
        <NumberButton handlePress={(number) => enterNumber(number)} number={0} />
        <DoneButton handlePress={handleDone} />
      </View>
    </View>
  );
};

export default NumberPad;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
  dialPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  button: {
    backgroundColor: 'white',
    width: 100,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
