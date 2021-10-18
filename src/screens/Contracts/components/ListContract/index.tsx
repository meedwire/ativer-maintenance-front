import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IContract, IStateMaintenance } from "../../../../CommonTypes";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Alert } from "../../../../utils";
import { useNavigation } from "@react-navigation/native";

interface Props {
  contract: IContract;
  handleDelete: (id: string) => void;
  handleEdit: (contract: IContract) => void;
}

const ListContract: React.FC<Props> = ({
  contract,
  handleDelete,
  handleEdit,
}) => {
  const navigation = useNavigation();

  const sizeMaintenances = contract.maintenances.filter(
    (maintenance) => maintenance.state === IStateMaintenance.FINISHED
  ).length;

  function onDelete() {
    Alert.alert(
      "Atenção",
      `Tem certeza que deseja deletar  ${contract.referenceName}?`,
      [
        {
          text: "CANCELAR",
        },
        {
          text: "CONFIRMAR",
          onPress: () => handleDelete(contract.id),
        },
      ]
    );
  }

  function onEdit() {
    Alert.alert(
      "Atenção",
      `Tem certeza que deseja editar  ${contract.referenceName}?`,
      [
        {
          text: "CANCELAR",
        },
        {
          text: "CONFIRMAR",
          onPress: () => handleEdit(contract),
        },
      ]
    );
  }
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("contract", { contract: contract.id })}
      style={styles.container}
    >
      <AntDesign style={styles.icon} name="folder1" size={20} color="gray" />
      <View>
        <Text>{contract.client.comercialName}</Text>
        <Text style={styles.textName}>{contract.referenceName}</Text>
        <Text style={styles.textName}>
          {sizeMaintenances}/{contract.maintenances.length}
        </Text>
      </View>
      <View style={styles.containerButtons}>
        {/* <TouchableOpacity style={styles.buttons}>
          <AntDesign name="filetext1" size={20} color="blue" />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onEdit} style={styles.buttons}>
          <AntDesign name="edit" size={20} color="green" />
        </TouchableOpacity>
        {sizeMaintenances === 0 && (
          <TouchableOpacity onPress={onDelete} style={styles.buttons}>
            <AntDesign name="delete" size={20} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export { ListContract };
