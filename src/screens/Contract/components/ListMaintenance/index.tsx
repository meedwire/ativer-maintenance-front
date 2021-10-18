import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { IMaintenance, IStateMaintenance } from "../../../../CommonTypes";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import { Modal } from "../../../../components/Modal/helpers";
import { ModalImages } from "../../../../components/ModalImages";
import { ModalState } from "../../../../components/ModalState";
import { api } from "../../../../services";
import { Toast } from "../../../../utils";

interface Props {
  item: IMaintenance;
  index: number;
  onDelete: (id: string) => void;
}

const states: { [key: number]: { type: string; color: string } } = {
  0: { color: "#c7c40a", type: "AGUARDANDO" },
  1: { color: "#427eff", type: "EM PROGRESSO" },
  2: { color: "#20a100", type: "FINALIZADA" },
};

const ListMaintenance: React.FC<Props> = ({ item, index, onDelete }) => {
  function handleShowImages() {
    Modal.show(ModalImages, { id: item.id });
  }

  function handleShowStatistics() {
    Modal.show(ModalState, { id: item.id });
  }

  async function handleDownloadReport() {
    try {
      const { data } = await api.get(`/report/get/${item.id}`);

      console.log(data)

      const link = document.createElement('a');
      link.href = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + data;
      link.download = `manutencao_${index+1}.docx`;
      link.click();

    } catch (error) {
      Toast.show("Ocorreu um erro ao tentar baixar o documento", 3000, "error");
    }
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: index % 2 ? "#427eff26" : "#ffffffa2" },
      ]}
    >
      <Text style={styles.textDescription}>{item.description}</Text>
      <Text style={[styles.textState, { color: states[item.state].color }]}>
        {states[item.state].type}
      </Text>
      {item.state === 2 && (
        <>
          <TouchableOpacity onPress={handleShowImages} style={styles.buttons}>
            <FontAwesome name="photo" size={20} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShowStatistics}
            style={styles.buttons}
          >
            <AntDesign name="barschart" size={20} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDownloadReport}
            style={styles.buttons}
          >
            <AntDesign name="filetext1" size={20} color="blue" />
          </TouchableOpacity>
        </>
      )}
      {/* {item.state < 1 && (
        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={styles.buttons}
        >
          <AntDesign name="delete" size={20} color="red" />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export { ListMaintenance };
