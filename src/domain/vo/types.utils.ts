import { Result } from "../patterns/result";

enum FragmentState {
  isValid,
  failed,
}

type ErrorValidation = {
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
type Login = {
  email: string;
  username: string;
  password: string;
};

export { ErrorValidation, FragmentState, TCreator, Login };
