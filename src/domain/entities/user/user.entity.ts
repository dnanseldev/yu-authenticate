import { ProjectRoles } from "../../agregations/project-roles.ag";
import { FieldsValidation, FragmentState } from "../../vo/types.utils";

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

export class User {
  public static fields_state = {} as FieldsValidation;
  private static _all_fields_valid: FragmentState = FragmentState.failed;
  private crypted_password: unknown;

  private user_dto?: UserDTO;

  constructor(readonly out_user: UserDTO) {
    this.user_dto = out_user;
  }

  set newPassword(crypted_password: unknown) {
    /*
    const bcrypt = require("bcrypt");
    const salt = bcrypt.genSalt(12);
    const hashed_pwd = bcrypt.hash(this.user.password, salt);
    this.crypted_password = hashed_pwd;
    */
    this.crypted_password = crypted_password;
  }

  get classState(): boolean {
    return User._all_fields_valid === FragmentState.isValid;
  }

  public static isValidEmail(opt_email?: string): boolean {
    const re = /\S+@\S+\.\S+/g;

    return re.exec(opt_email!) ? true : false;
  }

  public static isValidName(opt_name?: string): boolean {
    const re = /^[\w\s]+$/g;

    return re.exec(opt_name!) && opt_name!.length >= 3 ? true : false;
  }

  public static isValidUsername(opt_username?: string): boolean {
    const re = /^[\w\s]+$/g;

    return re.exec(opt_username!) && opt_username!.length >= 3 ? true : false;
  }

  /*
  public static validateFields(): FieldsValidation {
    const fields_state = {} as FieldsValidation;
    let amount = 0;

    if (!this.isValidEmail()) {
      fields_state.group.push({
        field: "Email",
        state: "invalid",
        msg: "Email badly formatted",
      });
      fields_state.invalid_qty = amount++;
    }

    if (!this.isValidName()) {
      fields_state.group.push({
        field: "Name",
        state: "invalid",
        msg: "Name is inadequaded",
      });
      fields_state.invalid_qty = amount++;
    }

    if (!this.isValidUsername()) {
      fields_state.group.push({
        field: "Username",
        state: "invalid",
        msg: "Username is invalid",
      });
      fields_state.invalid_qty = amount++;
    }

    if (fields_state.invalid_qty === 0)
      this._all_fields_valid = FragmentState.isValid;

    return fields_state;
  }
  */
}
