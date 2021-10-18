import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { IContract, IStateMaintenance } from "../../CommonTypes";
import { Header, ModalContract } from "../../components";
import { Modal } from "../../components/Modal/helpers";
import { ContextApp } from "../../context";
import { api } from "../../services";
import { Toast } from "../../utils";
import { ListContract } from "./components";

import styles from "./styles";

const Contracts: React.FC = () => {
const {contracts:{state, setState}} = useContext(ContextApp)

  function handleEdit(contract: IContract) {
    Modal.show(ModalContract, contract);
  }

  async function handleDelete(id: string) {
    let contractDeleted = state?.filter((contract) => contract.id === id);
    try {
      setState((prev) => prev?.filter((contract) => contract.id !== id));

      await api.delete(`/contract/delete/${id}`);
      Toast.show("Contrato deletado com sucesso", 2000, "success");
    } catch (error) {
      setState((prev) =>
        [...prev, ...contractDeleted].sort((a, b) =>
          new Date(a.created).getTime() > new Date(b.created).getTime() ? -1 : 1
        )
      );
      Toast.show(
        "Ocorreu um erro ao tentar deletar o contracto",
        2000,
        "error"
      );
    }
  }

  function handleCreateContract() {
    Modal.show(ModalContract);
  }

  return (
    <View style={styles.container}>
      <Header title="Contratos" onPressPlus={handleCreateContract} />
      <View style={styles.containerContent}>
        {state && (
          <FlatList
            data={state}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListContract
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                contract={item}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export { Contracts };
