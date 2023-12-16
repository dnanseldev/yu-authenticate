import { ProjectRoles } from "../../agregations/project-roles.ag";
import { ErrorValidation } from "../../vo/types.utils";

export interface UserDTO {
  readonly id: any;
  readonly name: string;
  readonly age: number;
  readonly complement: string;
  readonly username: string;
  readonly user_organization: string;
  readonly email: string;
  readonly tmp_password: string;
  readonly final_password: any;
  readonly token: any;
  readonly created_at: Date;
  readonly is_authenticated: boolean;
  readonly project_roles: ProjectRoles;
  fields_state: ErrorValidation;
}

export class User {
  private id: any;
  private name: string;
  private age: number;
  private complement: string;
  private username: string;
  private user_organization: string;
  private email: string;
  readonly tmp_password: string;
  private final_password: any;
  private token: any;
  readonly created_at: Date;
  private project_roles: ProjectRoles;
  private fields_state: ErrorValidation;
  private is_authenticated: boolean;

  constructor(readonly user_args_dto: UserDTO) {
    this.id = user_args_dto.id;
    this.name = user_args_dto.name;
    this.age = user_args_dto.age;
    this.complement = user_args_dto.complement;
    this.username = user_args_dto.username;
    this.user_organization = user_args_dto.user_organization;
    this.email = user_args_dto.email;
    this.tmp_password = user_args_dto.tmp_password;
    //this.final_password = user_args_dto.final_password;
    this.created_at = new Date(Date.now());
    this.project_roles = user_args_dto.project_roles;
    this.fields_state = user_args_dto.fields_state;
    this.is_authenticated = user_args_dto.is_authenticated;
  }

  set newPassword(crypted_password: any) {
    /*
    const bcrypt = require("bcrypt");
    const salt = bcrypt.genSalt(12);
    const hashed_pwd = bcrypt.hash(this.user.password, salt);
    this.crypted_password = hashed_pwd;
    */
    this.final_password = crypted_password;
  }

  set newToken(token: any) {
    this.token = token;
  }

  set authentication(auth: boolean) {
    this.is_authenticated = auth;
  }

  get authenticated() {
    return this.is_authenticated;
  }

  get validUserDto() {
    const validated_user_dto: UserDTO = {
      id: this.id,
      name: this.name,
      age: this.age,
      email: this.email,
      complement: this.complement,
      username: this.username,
      user_organization: this.user_organization,
      tmp_password: "",
      token: this.token,
      final_password: this.final_password,
      created_at: this.created_at,
      project_roles: this.project_roles,
      fields_state: this.fields_state,
      is_authenticated: this.is_authenticated,
    };

    return validated_user_dto;
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
