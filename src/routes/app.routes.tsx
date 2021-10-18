import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ClientsScreen, SettingsScreen, UsersScreen } from "../screens";
import { ContractsRoutes } from "./contract.routes";
import { Dimensions } from "react-native";

const Drawer = createDrawerNavigator();

const RoutesApp: React.FC = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(
    Dimensions.get("window").width > 1080
  );
  useEffect(() => {
    const event = Dimensions.addEventListener("change", ({ window }) => {
      if (window.width > 1080) {
        setIsLargeScreen(true);
      } else {
        setIsLargeScreen(false);
      }
    });

    return () => event
  }, []);
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: !isLargeScreen ? "front" : 'permanent',
        headerShown: isLargeScreen ? false : true,
      }}
    >
      <Drawer.Screen
        options={{ title: "Clientes" }}
        name="clients"
        component={ClientsScreen}
      />
      <Drawer.Screen
        options={{ title: "Usuários" }}
        name="users"
        component={UsersScreen}
      />
      <Drawer.Screen
        options={{ title: "Contratos" }}
        name="contracts"
        component={ContractsRoutes}
      />
      <Drawer.Screen
        options={{ title: "Configurações" }}
        name="settings"
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
};

export { RoutesApp };
