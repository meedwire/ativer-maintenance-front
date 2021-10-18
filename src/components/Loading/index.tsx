import React from 'react';
import {useImperativeHandle} from 'react';
import {forwardRef} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useBoolean} from '../../hooks';

import styles from './styles';

export interface HandleLoading {
  loading: () => {start: () => void; stop: () => void};
}

const Loading = forwardRef<HandleLoading>((_, ref) => {
  const [isLoading, {setTrue, setFalse}] = useBoolean(false);
  function loading() {
    const start = () => setTrue();
    const stop = () => setFalse();

    return {
      start,
      stop,
    };
  }

  useImperativeHandle(ref, () => {
    return {
      loading,
    };
  });

  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLoading}>
        <ActivityIndicator size={30} color="blue" />
      </View>
    </View>
  );
});

export {Loading};
