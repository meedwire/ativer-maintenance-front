import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { IContract } from "../../CommonTypes";
import { ContextApp } from "../../context";
import { ListMaintenance } from "./components";

import styles from "./styles";

type TypeConrtact = {
  contract: {
    contract: string
  }
}

const Contract: React.FC = () => {
  const {params:{contract: id}} = useRoute<RouteProp<TypeConrtact, 'contract'>>()
  const navigation = useNavigation();
  const {contracts:{state}} = useContext(ContextApp);
  const [contract, setContract] = useState<IContract>(state.filter((item) => item.id === id)[0])

  useEffect(() => {
    setContract(state.filter((item) => item.id === id)[0])
  }, [state])

  useEffect(() => {
    navigation.setOptions({ title: contract.referenceName });
  }, []);

  function handleDelete(id: string){
    setContract(prev => ({...prev, maintenances: prev.maintenances.filter(m => m.id !== id)}))
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contract.maintenances}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ListMaintenance onDelete={handleDelete} item={item} index={index} />
        )}
        ListFooterComponent={() => (
          <Text style={{padding: 8}} >
            Manutenções:{" "}
            {contract.maintenances.filter((m) => m.state === 2).length}/
            {contract.maintenances.length}
          </Text>
        )}
      />
    </View>
  );
};

export { Contract };
