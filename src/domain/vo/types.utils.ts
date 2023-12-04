import { Result } from "./result";

enum FragmentState {
  isValid,
  failed,
}

type FieldsValidation = {
  group: [
    {
      field: string;
      state: string;
      msg: string;
    }
  ];
  invalid_qty: number;
};

interface TCreator<T, R extends Result<T>> {
  factoryMethod(...args: any): R;
}

export { FieldsValidation, FragmentState, TCreator };
