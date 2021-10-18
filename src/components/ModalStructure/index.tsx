import React, { useRef, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { Button } from "../Button";
import { Form, setErrosYup } from "../Form";
import { HandlesForm } from "../Form/types";
import { Input } from "../Input";
import styles from "./styles";
import * as Yup from "yup";
import { api } from "../../services";
import { Toast } from "../../utils";
import { IStructure } from "../../CommonTypes";
import { Modal } from "../Modal/helpers";
import { ContextApp } from "../../context";

interface Props {
  defaultData?: IStructure & { showValue?: boolean; showRef?: boolean };
  parent?: number;
  index?: number;
}

const ModalStructure: React.FC<Props> = ({ defaultData, parent, index }) => {
  const formRef = useRef<HandlesForm>(null);
  const { structure } = useContext(ContextApp);

  useEffect(() => {
    if (defaultData !== undefined) {
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

  async function getIndex(parent?: string): Promise<number> {
    const url = `structure/index${parent ? "/" + parent : ""}`;
    try {
      const { data } = await api.get(url);

      return data.index;
    } catch (error) {
      Toast.show("Erro ao obter o index da estrutura", 3000, "error");
    }
  }

  async function handleSubmit(data: any) {
    try {
      const schema = Yup.object().shape({
        label: Yup.string().required("O Label é obrigatório !!"),
        value: defaultData.showValue ? Yup.string().required('O valor é obrigatório !!') : Yup.string(),
        parent: Yup.number(),
        ref: Yup.object().shape({
          ref: defaultData.showRef ? Yup.string().required('A referência é obrigatória !!') : Yup.string(),
        }) 
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (!defaultData.showRef){
        delete data.ref
      }

      if (defaultData?.label) {
        const newData = {
          ...defaultData,
          ...data,
        };

        await api.put(`/structure/update/${defaultData.id}`, { ...newData });

        Toast.show("Cliente atualizado com sucesso !!", 2000, "success");
        await structure.getStructure();

        return Modal.hidden();
      }

      const index = await getIndex(defaultData?.id);

      const newData = {
        ...data,
        parent: defaultData?.id,
        index,
      };

      await api.post("/structure/create", { ...newData });
      Toast.show("Cliente adicionado com sucesso !!", 2000, "success");
      await structure.getStructure();

      Modal.hidden();
    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        return setErrosYup(error, formRef);
      }
      Toast.show(error.message || "Error", 3000, "error");
    }
  }
  return (
    <View>
      <Text style={styles.textHeader}>
        {`${defaultData?.label ? "Atualizaçao" : "Cadastro"}`} de estrutura
      </Text>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input autoCapitalize="characters" label="Label:" name="label" />
        {defaultData.showValue && (
          <Input multiline numberOfLines={6} label="Value:" name="value" />
        )}
        {defaultData.showRef && (
          <Input
            multiline
            numberOfLines={4}
            label="Referência relatório:"
            name="ref.ref"
          />
        )}
      </Form>
      <Button
        style={styles.buttonSubmit}
        onPress={() => formRef.current?.submit()}
        mode="contained"
      >
        <Text>ENVIAR</Text>
      </Button>
    </View>
  );
};

export { ModalStructure };
