import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { IMaintenance, IStateMaintenance } from "../../../../CommonTypes";
import { Theme } from "../../../../theme";
import { useField } from "../../../Form";
import AntDesign from "react-native-vector-icons/AntDesign";

import styles from "./styles";
import { formatItensBullet } from "../../../../utils";
import { IInput } from "../../../Input/types";

const CustomInput: React.FC<IInput> = ({ name, mask, ...props }) => {
  const refValues = useRef<{ value: Omit<IMaintenance, "id">[] | undefined }>({
    value: undefined,
  });
  const [value, setValue] = useState<string | undefined>();
  const { fieldRegister, error, clearError } = useField(name);
  const [maintenances, setMaintenances] = useState<Omit<IMaintenance, "id">[] | undefined>();
  const refInput = useRef<TextInput>(null);
  let timer: NodeJS.Timer

  useEffect(() => {
    fieldRegister({ ref: refValues, setValue: (text) => setValue(text) });
  }, [fieldRegister]);

  const onChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      if (e.nativeEvent.text === '\n') refInput.current?.clear()
      if (
        e.nativeEvent.text &&
        e.nativeEvent.text !== "" &&
        e.nativeEvent.text !== "\n"
      )
        setValue(e.nativeEvent.text);
    },
    []
  );

  function handleAdd() {
    if (value !== "" && value && value !== "\n") {
      setMaintenances((prev) => [
        ...prev || [],
        { description: value, state: IStateMaintenance.AWAIT, order: prev?.length ? prev?.length : 0 },
      ]);
    }
    refInput.current?.setNativeProps({ text: undefined });
    setValue(undefined);
    refInput.current?.clear();
    refInput.current?.focus();
  }

  function handleKeyPress(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    //@ts-ignore
    if (e.shiftKey && e.nativeEvent.key === "Enter") {
      setValue((prev) => prev && formatItensBullet(prev));
    }

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      setValue((prev) => prev && formatItensBullet(prev));
    }, 1000)

    //@ts-ignore
    if (!e.shiftKey && e.nativeEvent.key === "Enter") {
      handleAdd();
    }
  }

  function handleRemove(index: number) {
    setMaintenances((prev) => prev?.filter((_, i) => index !== i));
  }

  useEffect(() => {
    if (refValues.current && maintenances) {
        refValues.current.value = maintenances
    };
  }, [maintenances]);

  return (
    <>
      <Pressable style={[styles.container, { flex: props.flex }]}>
        {props.label && <Text style={styles.label}>{props.label}</Text>}
        <View style={styles.containerInput}>
          <TextInput
            {...props}
            multiline
            ref={refInput}
            numberOfLines={6}
            value={value}
            onFocus={clearError}
            onChange={onChange}
            style={styles.input}
            autoCompleteType={undefined}
            onKeyPress={handleKeyPress}
            onSubmitEditing={handleAdd}
            placeholderTextColor={Theme.colors.light.text}
          />
          <TouchableOpacity onPress={handleAdd} style={styles.buttonAdd}>
            <AntDesign name="plus" color="white" />
          </TouchableOpacity>
        </View>
        {error !== undefined && <Text style={styles.textError}>{error}</Text>}
      </Pressable>
      <ScrollView contentContainerStyle={{ maxHeight: 280 }}>
        {maintenances &&
          maintenances.map((maintenance, i) => (
            <View style={styles.containerMaintenances} key={i.toString()}>
              <Text>Manutenção {i + 1}</Text>
              <Text>{maintenance.description}</Text>
              <TouchableOpacity
                onPress={() => handleRemove(i)}
                style={styles.buttonRemove}
              >
                <AntDesign name="close" color="white" />
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </>
  );
};

export { CustomInput };
