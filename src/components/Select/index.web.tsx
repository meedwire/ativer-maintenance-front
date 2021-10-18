import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useField } from "../Form";
import { Picker } from "@react-native-picker/picker";

import styles, { StyleSelect } from "./styles";
import { ISelect } from "./types";

const Select: React.FC<ISelect> = ({
  name,
  itens,
  onValueChange,
  ...props
}) => {
  const refPicker = useRef<
    HTMLSelectElement & { value: string | number | undefined }
  >(null);
  const [value, setValue] = useState<string | number | undefined>();
  const { fieldRegister, error, clearError } = useField(name);

  useEffect(() => {
    fieldRegister({ ref: refPicker, setValue: (text) => setValue(text) });
  }, [fieldRegister]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (refPicker.current) {
        refPicker.current.value = String(e.currentTarget.value);
        setValue(e.currentTarget.value);
        if (typeof onValueChange === "function") {
          onValueChange(e.currentTarget.value);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [value, refPicker]
  );

  return (
    <Pressable style={[styles.container, { flex: props.flex }]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.containerSelect}>
        <select style={StyleSelect} onChange={onChange} value={value} ref={refPicker} onFocus={clearError} {...props}>
          {itens.map((item) => (
            <option key={item.value} {...item} />
          ))}
        </select>
      </View>
      {error !== undefined && <Text style={styles.textError}>{error}</Text>}
    </Pressable>
  );
};

export { Select };
