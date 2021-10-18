import React, { useCallback, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Toast } from "../../utils";
import { api } from "../../services";
import { Header } from "../../components";
import styles from "./styles";
import { IStructure } from "../../CommonTypes";
import { Modal } from "../../components/Modal/helpers";
import { ListStructure } from "./components/ListStructure";
import { ModalStructure } from "../../components/ModalStructure";
import { ContextApp } from "../../context";

const Settings: React.FC = () => {
  const { structure } = useContext(ContextApp);

  function filterRecursive(
    array: IStructure[] | undefined,
    id: string
  ): IStructure[] {
    let newData: IStructure[] = [];
    if (array) {
      newData = array.filter((o) => {
        if (o.children) {
          o.children = filterRecursive(o.children, id);
        }
        return o.id !== id;
      });
      return newData.length > 0 ? newData : [];
    }

    return newData;
  }

  async function handleDelete(id: string) {
    structure.setState((prev) => filterRecursive(prev, id));
    try {
      await api.delete(`/structure/delete/${id}`);
      Toast.show("Cliente deletado com sucesso", 2000, "success");
    } catch (error) {
      console.log(error);
      Toast.show("Ocorreu um erro ao tentar deletar o item", 3000, "error");
    }
  }

  function handleEdit(structure: IStructure) {
    Modal.show(ModalStructure, structure);
  }

  function handleAdd(id?: string, showValue?: boolean, showRef?: boolean) {
    Modal.show(ModalStructure, { id, showValue, showRef });
  }

  return (
    <View style={styles.container}>
      <Header title="Configurações" onPressPlus={() => handleAdd()} />
      <View style={styles.containerContent}>
        {structure && (
          <ListStructure
            data={structure.state}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
          />
        )}
      </View>
    </View>
  );
};

export { Settings };
