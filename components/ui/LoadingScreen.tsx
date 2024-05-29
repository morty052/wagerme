import { Colors } from 'constants/colors';
import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Screen } from './Screen';

const LoadingScreen = () => {
  return (
    <Screen style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }}>
      <ActivityIndicator size={100} color={Colors.primary} />
    </Screen>
  );
};

export default LoadingScreen;
