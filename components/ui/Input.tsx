import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'constants/colors';
import React, { forwardRef } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

type Props = {
  error?: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  extraStyles?: StyleProp<any>;
} & TextInputProps;

const Input = forwardRef<TextInput, Props>(({ error, setError, extraStyles, ...props }, ref) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <TextInput
      {...props}
      onFocus={() => {
        setFocused(true);
        setError('');
      }}
      onBlur={() => setFocused(false)}
      placeholderTextColor="rgba(255,255,255,0.5)"
      style={[
        styles.container,
        { borderColor: error ? 'red' : focused ? 'white' : 'rgba(255,255,255,0.5)' },
        !extraStyles && { height: 50 },
        extraStyles,
      ]}
      ref={ref}
    />
  );
});

export const SearchInput = forwardRef<TextInput, Props>(
  ({ error, setError, extraStyles, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);
    return (
      <View
        style={[
          styles.container,
          { flexDirection: 'row', alignItems: 'center', gap: 10 },
          { borderColor: error ? 'red' : focused ? 'white' : 'rgba(255,255,255,0.5)' },
        ]}>
        <Ionicons name="search-outline" size={24} color="white" />
        <TextInput
          {...props}
          onFocus={() => {
            setFocused(true);
            setError('');
          }}
          onBlur={() => setFocused(false)}
          placeholderTextColor="rgba(255,255,255,0.5)"
          style={[{ color: 'white', height: 50 }]}
          ref={ref}
        />
      </View>
    );
  }
);
export default Input;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 10,
    backgroundColor: Colors.lightBlack,
  },
});
