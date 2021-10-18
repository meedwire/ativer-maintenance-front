import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IClient, IUser } from "../../../../CommonTypes";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Alert } from "../../../../utils";

interface Props {
  user: IUser;
  handleDelete: (id: string) => void;
  handleEdit: (user: IUser) => void;
}

const ListUser: React.FC<Props> = ({ user, handleDelete, handleEdit }) => {
  function onDelete() {
    Alert.alert(
      "Atenção",
      `Tem certeza que deseja deletar  ${user.name}?`,
      [
        {
          text: "CANCELAR",
        },
        {
          text: "CONFIRMAR",
          onPress: () => handleDelete(user.id),
        },
      ]
    );
  }

  function onEdit() {
    Alert.alert(
      "Atenção",
      `Tem certeza que deseja editar  ${user.name}?`,
      [
        {
          text: "CANCELAR",
        },
        {
          text: "CONFIRMAR",
          onPress: () => handleEdit(user),
        },
      ]
    );
  }
  return (
    <View style={styles.container}>
      <AntDesign style={styles.icon} name="user" size={20} color="gray" />
      <View>
        <Text style={styles.textName}>{user.name}</Text>
        <Text style={styles.textName}>{user.userName}</Text>
      </View>
      <View style={styles.containerButtons}>
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

export { ListUser };
