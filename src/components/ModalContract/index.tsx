import React, { useCallback, useState, useRef, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "../Button";
import { Form, setErrosYup } from "../Form";
import { HandlesForm } from "../Form/types";
import { Input } from "../Input";
import styles from "./styles";
import axios from "axios";
import * as Yup from "yup";
import { Select } from "../Select/index";
import { api } from "../../services";
import { Toast } from "../../utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import { IClient, IContract, IMaintenance } from "../../CommonTypes";
import { CustomInput } from "./components/CustomInput";
import schema from "./schema";
import { Modal } from "../Modal/helpers";
import { ContextApp } from "../../context";

interface Props {
  defaultData?: IMaintenance;
}

const ModalContract: React.FC<Props> = ({ defaultData }) => {
  const formRef = useRef<HandlesForm>(null);
  const [block, setBlock] = useState(false);
  const [clients, setClients] = useState<
    { value: string | number; label: string }[] | undefined
  >();
  const {contracts} = useContext(ContextApp)

  const getClients = useCallback(async () => {
    try {
      const { data } = await api.get("/client/get");

      if (data)
        setClients(
          data.map((client: IClient) => ({
            value: client.id,
            label: client.comercialName,
          }))
        );
    } catch (error) {
      Toast.show(error.message, 3000, "error");
    }
  }, []);

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    if (defaultData) {
      Object.entries(defaultData).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            formRef.current?.setFieldValue(`${key}.${subKey}`, subValue as any);
          });
        } else {
          formRef.current?.setFieldValue(key, value);
        }
      });
    }
  }, []);

  async function onSubmit(data: Omit<IContract, "id">) {
    try {
      console.log(data);
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post("/contract/create", { ...data });

      Toast.show("Contrato adicionado com sucesso !!", 2000, "success");
      contracts.getContracts();
      Modal.hidden();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return setErrosYup(error, formRef);
      }
      Toast.show(error.message || "Error", 3000, "error");
    }
  }

  return (
    <View>
      <Text style={styles.textHeader}>Cadastro de Contrato</Text>
      <Form ref={formRef} onSubmit={onSubmit}>
        <Input
          label="Nome:"
          name="referenceName"
          placeholder="Ex: Nome de referência, n° contrato, etc..."
        />
        <Select itens={clients || []} label="Cliente:" name="client" />
        <CustomInput
          label="Manutenções:"
          placeholder="Descreva as atividades a serem executadas."
          name="maintenances"
        />
      </Form>
      <Button
        disabled={block}
        style={styles.buttonSubmit}
        onPress={() => formRef.current?.submit()}
        mode="contained"
      >
        <Text>ENVIAR</Text>
      </Button>
    </View>
  );
};

export { ModalContract };
