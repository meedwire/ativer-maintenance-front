import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RoutesApp} from './app.routes';
import { IContract } from '../CommonTypes';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      contract: {
        contract: string
      }
      clients: undefined;
      users: undefined;
      settings: undefined;
    }
  }
}

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <RoutesApp />
    </NavigationContainer>
  );
};

export {Routes};
