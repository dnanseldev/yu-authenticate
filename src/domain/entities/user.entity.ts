import { ProjectRoles } from "../agregations/project-roles.ag";

export interface UserDTO {
  readonly eID: string;
  readonly name: string;
  readonly age: number;
  readonly complement: string;
  readonly username: string;
  readonly user_organization: string;
  readonly email: string;
  password: string;
  readonly created_at: Date;
  readonly project_roles: ProjectRoles;
}

type FieldValidation = {
  field: string;
  state: string;
  msg: string;
  invalid_qty: number;
};

export class User {
  private eID: string = "";
  private name: string = "";
  private age: number = 0;
  private complement: string = "";
  private username: string = "";
  private user_organization: string = "";
  private email: string = "";
  private crypted_password: unknown;
  private created_at: Date = new Date(Date.now());
  private project_roles = {} as ProjectRoles;

  constructor(readonly user: UserDTO) {}

  set newPassword(crypted_password: unknown) {
    /*
    const bcrypt = require("bcrypt");
    const salt = bcrypt.genSalt(12);
    const hashed_pwd = bcrypt.hash(this.user.password, salt);
    this.crypted_password = hashed_pwd;
    */
    this.crypted_password = crypted_password;
  }

  isInValidEmail(): boolean {
    return false;
  }

  isInValidName(): boolean {
    return false;
  }

  isInValidUsername(): boolean {
    return false;
  }

  validateFields(): [FieldValidation] {
    let amount = 0;
    const fields_state: [FieldValidation] = [
      { field: "", state: "", msg: "", invalid_qty: 0 },
    ];

    if (this.isInValidEmail())
      fields_state.push({
        field: "Email",
        state: "invalid",
        msg: "Email badly formatted",
        invalid_qty: amount++,
      });

    if (this.isInValidName())
      fields_state.push({
        field: "Name",
        state: "invalid",
        msg: "Name is inadequaded",
        invalid_qty: amount++,
      });

    if (this.isInValidUsername())
      fields_state.push({
        field: "Username",
        state: "invalid",
        msg: "Username is invalid",
        invalid_qty: amount++,
      });

    return fields_state;
  }
}
