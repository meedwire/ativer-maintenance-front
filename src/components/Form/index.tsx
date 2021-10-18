import React, {
  forwardRef,
  useState,
  createRef,
  useImperativeHandle,
} from "react";
import { HandlesForm, IFieldRegister, IForm } from "./types";
import { Keyboard } from "react-native";
import * as Yup from "yup";

type IRefs = Record<string, any>;

const inputsRefs = createRef<IRefs>();

export function setErrosYup(
  error: Yup.ValidationError,
  ref: React.RefObject<HandlesForm>
) {
  error.inner.forEach((err) => {
    if (err.path) {
      console.log('[MESSAGE]:', err.message, '[PATH]:', err.path)
      ref.current?.setFieldError(err.path, err.message);
    }
  });

  return;
}

export function useField(name: string) {
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  function setErrorField(fieldName: string, error: string | undefined) {
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  }

  function clearError() {
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function fieldRegister({ ref, setValue }: IFieldRegister) {
    //@ts-ignore
    inputsRefs.current = {
      ...(inputsRefs.current || {}),
      [name]: { ref, setErrorField, setValue },
    };
  }

  return {
    fieldRegister,
    error: errors[name],
    clearError,
  };
}

type Obj = { [key: string]: number | string | undefined };

const Form = forwardRef<HandlesForm, IForm>(({ children, onSubmit }, ref) => {
  function submit() {
    if (typeof onSubmit === "function" && inputsRefs.current) {
      Keyboard.dismiss();

      const obj: Obj = {};

      Object.entries(inputsRefs.current).forEach(([key, value]) => {
        let keyObject = key;
        let keyNested = keyObject.split(".");

        if (keyNested.length > 1) {
          Object.assign(obj, {
            [keyNested[0]]: {
              //@ts-ignore
              ...(obj[keyNested[0]] || {}),
              [keyNested[1]]: value.ref.current?.value,
            },
          });
        } else {
          Object.assign(obj, { [key]: value.ref.current?.value });
        }
      });

      onSubmit(obj);
    }
  }

  function getFieldValue(fieldName: string) {
    if (inputsRefs.current) {
      return inputsRefs.current[fieldName].ref.current.value;
    }
    return undefined;
  }

  function setFieldError(fieldName: string, error: string | undefined) {
    if (inputsRefs.current) {
      inputsRefs.current[fieldName].setErrorField(fieldName, error);
    }
  }

  function sleep(time: number) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), time);
    });
  }

  async function setFieldValue(
    fieldName: string,
    value: string | number | undefined
  ) {
    await sleep(500);
    if (inputsRefs.current && inputsRefs.current[fieldName]) {
      inputsRefs.current[fieldName].setValue(value);
    }
  }

  useImperativeHandle(ref, () => {
    return {
      submit,
      getFieldValue,
      setFieldValue,
      setFieldError,
    };
  });

  return <>{children}</>;
});

export { Form };
