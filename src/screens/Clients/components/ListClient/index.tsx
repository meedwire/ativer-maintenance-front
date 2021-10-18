import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IClient } from "../../../../CommonTypes";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Alert } from "../../../../utils";

interface Props {
  client: IClient;
  handleDelete: (id: string) => void;
  handleEdit: (client: IClient) => void;
}

const ListClient: React.FC<Props> = ({ client, handleDelete, handleEdit }) => {
  function onDelete() {
    Alert.alert(
      "Atenção",
      `Tem certeza que deseja deletar  ${client.comercialName}?`,
      [
        {
          text: "CANCELAR",
        },
        {
          text: "CONFIRMAR",
          onPress: () => handleDelete(client.id),
        },
      ]
    );
  }

  function onEdit() {
    Alert.alert(
      "Atenção",
      `Tem certeza que deseja editar  ${client.comercialName}?`,
      [
        {
          text: "CANCELAR",
        },
        {
          text: "CONFIRMAR",
          onPress: () => handleEdit(client),
        },
      ]
    );
  }
  return (
    <View style={styles.container}>
      <AntDesign style={styles.icon} name="user" size={20} color="gray" />
      <View>
        <Text style={styles.textName}>{client.comercialName}</Text>
        <Text style={styles.textName}>{client.cnpj}</Text>
      </View>
      <View style={styles.containerButtons}>
        {/* <TouchableOpacity style={styles.buttons}>
          <AntDesign name="eyeo" size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <AntDesign name="filetext1" size={20} color="blue" />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onEdit} style={styles.buttons}>
          <AntDesign name="edit" size={20} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.buttons}>
          <AntDesign name="delete" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { ListClient };
