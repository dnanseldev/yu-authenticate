import { User, UserDTO } from "../../../domain/entities/user/user.entity";
import { ProjectRoles } from "../../../domain/agregations/project-roles.ag";
import ICommumRepository from "../../interfaces/base.repository";
import { exit } from "process";
import Services from "../services/services";

export default class UserUseCases {
  private repository: ICommumRepository<UserDTO>;

  constructor(repository: ICommumRepository<UserDTO>) {
    this.repository = repository;
  }

  async authenticateUser(user: User): Promise<boolean> {
    const newTkn = Services.generateToken(user.user_args_dto.id);
    user.newToken(newTkn);
    return true;
  }

  async saveUser(user: User): Promise<UserDTO | Partial<UserDTO>> {
    const newPwd = Services.encryptPassword(user.partial_password);
    user.newPassword(newPwd);
    return await this.repository.Create(user.validUserDto);
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
