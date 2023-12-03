import { ProjectRoles } from "../agregations/project-roles.ag";
import { FieldsValidation, FragmentState } from "../utilities/types.utils";

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
  private _classState: FragmentState = FragmentState.failed;

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

  constructor(readonly opt_user?: UserDTO) {}

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
    return this._classState === FragmentState.isValid;
  }

  public isValidEmail(opt_email?: string): boolean {
    const re = /\S+@\S+\.\S+/g;

    if (opt_email !== "") return re.exec(opt_email!) ? true : false;
    else return re.exec(this.email) ? true : false;
  }

  public isValidName(opt_name?: string): boolean {
    const re = /^[\w\s]+$/g;

    if (opt_name !== "")
      return re.exec(opt_name!) && opt_name!.length >= 3 ? true : false;
    else return re.exec(this.name) && this.name.length >= 3 ? true : false;
  }

  public isValidUsername(opt_username?: string): boolean {
    const re = /^[\w\s]+$/g;

    if (opt_username !== "")
      return re.exec(opt_username!) && opt_username!.length >= 3 ? true : false;
    return re.exec(this.username) && this.username.length >= 3 ? true : false;
  }

  public validateFields(): FieldsValidation {
    const fields_state = {} as FieldsValidation;
    let amount = 0;
    /*
    const fields_state1: FieldsValidation = {
      group: [{ field: "", state: "", msg: "" }],
      invalid_qty: 0,
    };
    */

    if (this.isValidEmail()) {
      fields_state.group.push({
        field: "Email",
        state: "invalid",
        msg: "Email badly formatted",
      });
      fields_state.invalid_qty = amount++;
    }

    if (this.isValidName()) {
      fields_state.group.push({
        field: "Name",
        state: "invalid",
        msg: "Name is inadequaded",
      });
      fields_state.invalid_qty = amount++;
    }

    if (this.isValidUsername()) {
      fields_state.group.push({
        field: "Username",
        state: "invalid",
        msg: "Username is invalid",
      });
      fields_state.invalid_qty = amount++;
    }

    if (fields_state.invalid_qty === 0)
      this._classState = FragmentState.isValid;

    return fields_state;
  }
}
