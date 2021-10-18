import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ContractScreen, ContractsScreen } from "../screens";
import { IContract } from "../CommonTypes";

const Stack = createStackNavigator();

const ContractsRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="main"
        component={ContractsScreen}
      />
      <Stack.Screen
        name="contract"
        component={ContractScreen}
      />
    </Stack.Navigator>
  );
};

export { ContractsRoutes };
