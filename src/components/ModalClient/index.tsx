import React, { useState, useRef, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { Button } from "../Button";
import { Form, setErrosYup } from "../Form";
import { HandlesForm } from "../Form/types";
import { Input } from "../Input";
import styles from "./styles";
import axios from "axios";
import * as Yup from "yup";
import { Select } from "../Select/index";
import states from "../../constants/states";
import cities from "../../constants/cities";
import schema from "./schema";
import { api } from "../../services";
import { Toast } from "../../utils";
import { IClient } from "../../CommonTypes";
import { Modal } from "../Modal/helpers";
import { ContextApp } from "../../context";

interface Props {
  defaultData?: IClient;
}

const ModalClient: React.FC<Props> = ({ defaultData }) => {
  const formRef = useRef<HandlesForm>(null);
  const [selectedState, setSelectedState] = useState<
    keyof typeof cities | undefined
  >();
  const [block, setBlock] = useState(false);
  const { clients } = useContext(ContextApp);

  useEffect(() => {
    if (defaultData !== undefined) {
      console.log(defaultData);
      setSelectedState(defaultData.address.state as any);
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

  async function handleDataCnpj() {
    try {
      setBlock(false);
      const cnpj = formRef.current?.getFieldValue("cnpj");

      if (!cnpj) {
        return;
      }

      const parsedCnpj = cnpj.toString().replace(/\D/g, "");

      const cnpjSchema = Yup.string().min(
        14,
        "O CNPJ deve conter 14 caracteres."
      );

      await cnpjSchema.validate(parsedCnpj);

      const { data: response } = await api.get(`/client/get/${parsedCnpj}`);

      if (response?.alreadyExists) {
        setBlock(true);
        throw new Error("O cliente já se encontra cadastrado na base.");
      }

      const url = `https://www.receitaws.com.br/v1/cnpj/${parsedCnpj}`;

      const { data } = await axios.get(url);

      if (data?.status === "ERROR") {
        throw new Error(data.message);
      }

      formRef.current?.setFieldValue("comercialName", data?.nome);
      formRef.current?.setFieldValue("phone", data?.telefone);
      formRef.current?.setFieldValue("address.street", data?.logradouro);
      formRef.current?.setFieldValue("address.number", data?.numero);
      formRef.current?.setFieldValue("address.postcode", data?.cep);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        formRef.current?.setFieldError("cnpj", error.errors[0]);
      } else {
        formRef.current?.setFieldError("cnpj", error.message);
        Toast.show(error.message || "Error", 3000, "error");
      }
    }
  }

  async function handleSave(data: any) {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const client = {
        ...data,
        cnpj: data.cnpj.replace(/\D/g, ""),
        address: {
          ...data.address,
          postcode: data.address.postcode.replace(/\D/g, ""),
        },
      };

      await api.post("/client/create", { ...client });
      Toast.show("Cliente adicionado com sucesso !!", 2000, "success");
      clients.getClients();
      Modal.hidden();
    } catch (error) {
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

      const client = {
        ...defaultData,
        ...data,
        cnpj: data.cnpj.replace(/\D/g, ""),
        address: {
          ...data.address,
          postcode: data.address.postcode.replace(/\D/g, ""),
        },
      };

      await api.put("/client/update", { ...client });
      Toast.show("Cliente adicionado com sucesso !!", 2000, "success");
      clients.getClients();
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
      <Text style={styles.textHeader}>{`${
        Object.keys(defaultData || {}).length > 0
          ? "Atualização de Cliente"
          : "Cadastro de Cliente"
      }`}</Text>
      <Form
        ref={formRef}
        onSubmit={
          Object.keys(defaultData || {}).length > 0 ? handleUpdate : handleSave
        }
      >
        <Input
          onBlur={handleDataCnpj}
          label="CNPJ:"
          name="cnpj"
          mask="$$.$$$.$$$/$$$$-$$"
        />
        <Input label="Nome Comercial:" name="comercialName" />
        <Input label="Contato:" name="contact" />
        <Input label="Telefone:" name="phone" />
        <View style={styles.row}>
          <Input flex={1} label="Endereço:" name="address.street" />
          <Input flex={0.5} label="Número:" name="address.number" />
        </View>
        <Input label="CEP:" name="address.postcode" mask="$$.$$$-$$$" />
        <View style={styles.row}>
          <Select
            itens={states}
            onValueChange={(value) =>
              setSelectedState(value as keyof typeof cities)
            }
            flex={1}
            label="Estado:"
            name="address.state"
          />
          <Select
            itens={selectedState ? cities[selectedState] : []}
            flex={1}
            label="Cidade:"
            name="address.city"
          />
        </View>
         <View style={styles.row}>
          <Input flex={1} label="Fabricante:" name="ete.manufacturer" />
          <Input flex={1} label="Modelo:" name="ete.model" />
        </View>
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

export { ModalClient };
