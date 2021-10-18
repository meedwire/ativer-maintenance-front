import {ReactNode} from 'react';

export interface HandlesForm {
  submit: () => void;
  getFieldValue: (fieldName: string) => string | number | undefined;
  setFieldValue: (
    fieldName: string,
    value: string | number | undefined,
  ) => void;
  setFieldError: (fieldName: string, error: string | undefined) => void;
}

export interface IFieldRegister {
  ref: React.RefObject<any>;
  setValue?: (value: any) => void;
}

export interface IForm {
  onSubmit: (data: any) => void;
  children: ReactNode;
}
