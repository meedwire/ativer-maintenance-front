import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Toast } from "../../utils";
import { api } from "../../services";
import { Header } from "../../components";
import { ListClient } from "./components";
import styles from "./styles";
import { IClient } from "../../CommonTypes";
import { Modal } from "../../components/Modal/helpers";
import { ModalClient } from "../../components";
import { ContextApp } from "../../context";

const Clients: React.FC = () => {
  const {clients} = useContext(ContextApp)

  async function handleDelete(id: string) {
    let clientDeleted: IClient = {} as IClient;

    try {
      clients.state?.forEach((client) => {
        if (client.id === id) {
          clientDeleted = client;
        }
      });

      clients.setState((prev) => prev?.filter((client) => client.id !== id));

      await api.delete(`client/delete/${id}`);
      Toast.show("Cliente deletado com sucesso", 2000, "success");
      clients.getClients()
    } catch (error) {
      clients.setState((prev) => [...(prev || []), clientDeleted]);
      Toast.show("Opss... Ocorreu um erro ao tentar deletar o cliente.", 2000, "error");
    }
  }

  function handleEdit(client: IClient) {
    Modal.show(ModalClient, client);
  }

  function handleCreateClient() {
    Modal.show(ModalClient);
  }

  return (
    <View style={styles.container}>
      <Header title="Clientes" onPressPlus={handleCreateClient} />
      <View style={styles.containerContent}>
        {clients && (
          <FlatList
            data={clients.state}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListClient
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                client={item}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export { Clients };
