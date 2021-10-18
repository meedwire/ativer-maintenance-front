import React, {useCallback, useEffect, useRef} from 'react';
import {useState} from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputChangeEventData,
} from 'react-native';
import {Theme} from '../../theme';
import {masked} from '../../utils';
import {useField} from '../Form';

import styles from './styles';
import {IInput} from './types';

const Input: React.FC<IInput> = ({name, mask, ...props}) => {
  const refInput = useRef<TextInput & {value: string | undefined}>(null);
  const [value, setValue] = useState<string | undefined>();
  const {fieldRegister, error, clearError} = useField(name);

  useEffect(() => {
    fieldRegister({ref: refInput, setValue: text => setValue(text)});
  }, [fieldRegister]);

  const onChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const text = props.autoCapitalize ? e.nativeEvent.text.toUpperCase() : e.nativeEvent.text;

      if (mask && refInput.current) {
        setValue(masked(mask, text));
        return;
      }
      if (refInput.current) {
        setValue(text);
      }
    },
    [mask],
  );

  return (
    <Pressable style={[styles.container, {flex: props.flex}]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        {...props}
        value={value}
        onFocus={clearError}
        onChange={onChange}
        style={styles.input}
        autoCompleteType={undefined}
        placeholder={mask ? mask.replace(/\$/g, '8') : props.placeholder}
        placeholderTextColor={Theme.colors.light.text}
        ref={refInput}
      />
      {error !== undefined && <Text style={styles.textError}>{error}</Text>}
    </Pressable>
  );
};

export {Input};
