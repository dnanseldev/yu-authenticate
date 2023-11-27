import { ProjectRoles } from "../agregations/project-roles.ag";

export interface UserDTO {
  readonly eID: string;
  readonly name: string;
  readonly age: number;
  readonly complement: string;
  readonly username: string;
  readonly user_organization: string;
  readonly email: string;
  readonly password: string;
  readonly created_at: Date;
  readonly project_roles: ProjectRoles;
}

export class User {
  constructor(user: UserDTO) {}
}
