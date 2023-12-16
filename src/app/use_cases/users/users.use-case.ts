import { User, UserDTO } from "../../../domain/entities/user/user.entity";
import { ProjectRoles } from "../../../domain/agregations/project-roles.ag";
import ICommumRepository from "../../interfaces/base.repository";
import { exit } from "process";
import Services from "../services/services";
import { Login } from "../../../domain/vo/types.utils";

export default class UserUseCases {
  private repository: ICommumRepository<UserDTO>;

  constructor(repository: ICommumRepository<UserDTO>) {
    this.repository = repository;
  }

  async doLogin(login: Login): Promise<User> {
    const tmp_dto = await this.repository.FindOne(login.username);
    const e_user = new User(tmp_dto as UserDTO);
    e_user.newPassword = tmp_dto.final_password;

    if (
      await Services.isMatch(
        login.password,
        e_user.validUserDto.final_password!
      )
    )
      e_user.authentication = true;

    return e_user;
  }

  async authorizeUser(user: User): Promise<boolean> {
    const newTkn = Services.generateToken(user.user_args_dto.id);
    user.newToken = newTkn;
    return true;
  }

  async saveUser(user: User): Promise<UserDTO | Partial<UserDTO>> {
    const newPwd = await Services.encryptPassword(user.tmp_password);
    user.newPassword = newPwd;
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
