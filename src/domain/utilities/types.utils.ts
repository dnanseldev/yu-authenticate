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

export { FieldsValidation, FragmentState };
