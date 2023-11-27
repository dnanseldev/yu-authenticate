import { UserDTO } from "../../domain/entities/user.entity";
import { ProjectRoles } from "../../domain/agregations/project-roles.ag";
import ICommumRepository from "../interfaces/base.repository";
import { exit } from "process";

export default class UserUseCases {
  private repository: ICommumRepository<UserDTO>;

  constructor(repository: ICommumRepository<UserDTO>) {
    this.repository = repository;
  }

  async saveUser(user: UserDTO): Promise<UserDTO | Partial<UserDTO>> {
    return await this.repository.Create(user);
  }

  isAuthorized(user_roles: ProjectRoles): boolean {
    let ret: boolean = false;

    user_roles.roles.forEach((role) => {
      if (
        role.value === "Owner" ||
        role.value === "Admin" ||
        role.value === "Member"
      ) {
        ret = true;
        exit;
      }
    });

    return ret;
  }
}
