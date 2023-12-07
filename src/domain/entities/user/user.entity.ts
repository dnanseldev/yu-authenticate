import { ProjectRoles } from "../../agregations/project-roles.ag";
import { ErrorValidation, FragmentState } from "../../vo/types.utils";

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
  fields_state: ErrorValidation;
}

export class User {
  private crypted_password: unknown;

  constructor(readonly user_dto: UserDTO) {}

  set newPassword(crypted_password: unknown) {
    /*
    const bcrypt = require("bcrypt");
    const salt = bcrypt.genSalt(12);
    const hashed_pwd = bcrypt.hash(this.user.password, salt);
    this.crypted_password = hashed_pwd;
    */
    this.crypted_password = crypted_password;
  }

  get validUserDto() {
    return this.user_dto;
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
}
