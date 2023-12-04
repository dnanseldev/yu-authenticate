import { User, UserDTO } from "../entities/user/user.entity";
import { Result } from "./result";
import { FieldsValidation, TCreator } from "./types.utils";

export class UserFactory implements TCreator<User, Result<User>> {
  factoryMethod(tmpUser: UserDTO): Result<User> {
    if (!User.isValidEmail(tmpUser.email))
      return Result.fail<User>("Email badly format");

    if (!User.isValidName(tmpUser.name))
      return Result.fail<User>("Name is badly format");

    if (!User.isValidUsername(tmpUser.username))
      return Result.fail<User>("Username is invalid");

    return Result.ok<User>(new User(tmpUser));
  }
}
