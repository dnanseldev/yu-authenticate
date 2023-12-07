import { User, UserDTO } from "../entities/user/user.entity";
import { Result } from "./result";
import { ErrorValidation, TCreator } from "../vo/types.utils";

export class UserFactory implements TCreator<User, Result<User>> {
  factoryMethod(user_dto: UserDTO): Result<User> {
    let amount = 0;

    if (!User.isValidEmail(user_dto.email)) {
      user_dto.fields_state.group.push({
        field: "Email",
        state: "invalid",
        msg: "Email badly formatted",
      });
      user_dto.fields_state.invalid_qty = amount++;
    }

    if (!User.isValidName(user_dto.name)) {
      user_dto.fields_state.group.push({
        field: "Name",
        state: "invalid",
        msg: "Name is inadequaded",
      });
      user_dto.fields_state.invalid_qty = amount++;
    }

    if (!User.isValidUsername(user_dto.username)) {
      user_dto.fields_state.group.push({
        field: "Username",
        state: "invalid",
        msg: "Username is invalid",
      });
      user_dto.fields_state.invalid_qty = amount++;
    }

    if (user_dto.fields_state.invalid_qty > 0)
      return Result.fail<User>("There are one or more invalid fields...");

    return Result.ok<User>(new User(user_dto));
  }
}
