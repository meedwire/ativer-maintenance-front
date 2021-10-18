import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IClient, IStructure } from "../../../../CommonTypes";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Alert } from "../../../../utils";

interface Props {
  structure: IStructure;
  handleDelete: (id: string) => void;
  handleEdit: (structure: IStructure) => void;
  marginLeft?: number;
  handleAdd: (id: string, showValue?: boolean, showRef?: boolean) => void;
}

const ItemListStage: React.FC<Props> = ({
  structure,
  handleDelete,
  handleEdit,
  handleAdd,
  marginLeft,
}) => {
  function onDelete() {
    Alert.alert(
      "Atenção",
      `Tem certeza que deseja deletar  ${structure.label}?`,
      [
        {
          text: "CANCELAR",
        },
        {
          text: "CONFIRMAR",
          onPress: () => handleDelete(structure.id),
        },
      ]
    );
  }

  function onEdit() {
    Alert.alert(
      "Atenção",
      `Tem certeza que deseja editar  ${structure.label}?`,
      [
        {
          text: "CANCELAR",
        },
        {
          text: "CONFIRMAR",
          onPress: () => handleEdit(structure),
        },
      ]
    );
  }

  function onAdd() {
    handleAdd(structure.id, marginLeft === 60, marginLeft === 30);
  }

  return (
    <View style={[styles.container, { marginLeft }]}>
      <View>
        <Text style={styles.textName}>Label: {structure.label}</Text>
        {structure.value && (
          <Text style={styles.textValue}>Value: {structure.value}</Text>
        )}
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity onPress={onEdit} style={styles.buttons}>
          <AntDesign name="edit" size={20} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.buttons}>
          <AntDesign name="delete" size={20} color="red" />
        </TouchableOpacity>
        {marginLeft < 90 && (
          <TouchableOpacity
            onPress={onAdd}
            style={[
              styles.buttons,
              { backgroundColor: "rgba(0, 255, 0, 0.5)" },
            ]}
          >
            <AntDesign name="plus" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export { ItemListStage };
