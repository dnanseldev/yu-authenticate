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

function isBlank(str: string) {
  return !str || /^\s*$/.test(str);
}

function isEmpty(e: any) {
  switch (e) {
    case "":
    case 0:
    case "0":
    case null:
    case false:
    case undefined:
      return true;
    default:
      return false;
  }
}

export { ErrorValidation, FragmentState, TCreator, Login };
