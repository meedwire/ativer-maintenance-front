import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Theme} from '../../theme';

import styles from './styles';

const LoadingIndicator: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLoading}>
        <ActivityIndicator color={Theme.colors.primary} size={35} />
      </View>
    </View>
  );
};

export {LoadingIndicator};
