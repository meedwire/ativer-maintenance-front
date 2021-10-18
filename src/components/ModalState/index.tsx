import React, { useEffect, useState, useCallback } from "react";
import { Text, View } from "react-native";
import { api } from "../../services";
import { formatTime, Toast } from "../../utils";
import { LoadingIndicator } from "../LoadingIndicator";
import styles from "./styles";

interface Props {
  defaultData?: {
    id: string;
  };
}

interface IState {
  id: string;
  created: string;
  updated: string | null;
  deleted: string | null;
  start: number | null;
  end: number | null;
}

const ModalState: React.FC<Props> = ({ defaultData }) => {
  const [state, setState] = useState<IState | undefined>();

  const getState = useCallback(async () => {
    try {
      const { data } = await api.get(`/maintenance/get/${defaultData.id}`);

      setState(data);
    } catch (error) {
      Toast.show("Ocorreu um erro ao tentar buscar as imagens", 3000, "error");
    }
  }, []);

  useEffect(() => {
    getState();
  }, [defaultData]);

  if (!state) {
    return (
      <View style={styles.loading}>
        <LoadingIndicator />;
      </View>
    );
  }

  function toDate(time: number){
    return new Date(Number(time)).toLocaleDateString('pt-BR', {hour: 'numeric', minute: 'numeric', second:'numeric'})
  }

  function calculate(start: number, end: number){
    const diference = Number(end) - Number(start)

    return formatTime(diference)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Dados da manutenção</Text>
      <Text style={styles.text} >{`Horário de inicio: ${toDate(state.start)}`}</Text>
      <Text style={styles.text} >{`Horário de término: ${toDate(state.end)}`}</Text>
      <Text style={styles.text} >{`Tempo gasto: ${calculate(state.start, state.end)}`}</Text>
    </View>
  );
};

export { ModalState };
