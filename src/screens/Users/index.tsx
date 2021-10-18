import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Toast } from "../../utils";
import { api } from "../../services";
import { ListUser } from "./components";
import styles from "./styles";
import { IUser } from "../../CommonTypes";
import { Header, ModalUser } from "../../components";
import { Modal } from "../../components/Modal/helpers";
import { ContextApp } from "../../context";

const Users: React.FC = () => {
 const {users:{state, setState}} = useContext(ContextApp)

  function handleAdd(){
    Modal.show(ModalUser)
  }

  function handleDelete(id: string) {
    setState((prev) => prev?.filter((client) => client.id !== id));
  }

  function handleEdit(user: IUser) {
    Modal.show(ModalUser, {...user})
  }

  return (
    <View style={styles.container}>
      <Header title="Usuários" onPressPlus={handleAdd} />
      <View style={styles.containerContent}>
        {state && (
          <FlatList
            data={state}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListUser
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                user={item}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export { Users };
