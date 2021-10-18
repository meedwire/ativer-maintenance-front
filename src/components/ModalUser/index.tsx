import React, { useState, useRef, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { Button } from "../Button";
import { Form, setErrosYup } from "../Form";
import { HandlesForm } from "../Form/types";
import { Input } from "../Input";
import styles from "./styles";
import * as Yup from "yup";
import schema from "./schema";
import { api } from "../../services";
import { Toast } from "../../utils";
import { IClient } from "../../CommonTypes";
import { Modal } from "../Modal/helpers";
import { ContextApp } from "../../context";

interface Props {
  defaultData?: IClient;
}

const ModalUser: React.FC<Props> = ({ defaultData }) => {
  const formRef = useRef<HandlesForm>(null);
  const [block, setBlock] = useState(false);
  const { users } = useContext(ContextApp);

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

  async function handleSave(data: any) {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const user = {
        ...data,
      };

      await api.post("/users/create", { ...user });
      Toast.show("Usuário adicionado com sucesso !!", 2000, "success");
      users.getUsers();
      Modal.hidden();
    } catch (error) {
      console.log(error)
      if (error instanceof Yup.ValidationError) {
        return setErrosYup(error, formRef);
      }
      Toast.show(error.message || "Error", 3000, "error");
    }
  }

  async function handleUpdate(data: any) {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const user = {
        id: defaultData?.id,
        ...data,
      };

      await api.put("/users/update", { ...user });
      Toast.show("Usuário atualizado com sucesso !!", 2000, "success");
      users.getUsers();
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
      <Text style={styles.textHeader}>{`${Object.keys(defaultData || {}).length > 0 ? 'Atualização de usuário' : 'Cadastro de usuário'}`}</Text>
      <Form ref={formRef} onSubmit={Object.keys(defaultData || {}).length > 0 ? handleUpdate : handleSave}>
        <Input label="Nome:" name="name" />
        <Input label="Nome de usuário" name="userName" />
        <Input label="Senha:" name="password" />
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

export { ModalUser };
