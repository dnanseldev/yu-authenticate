import "dotenv/config";
import { sign, decode, verify } from "jsonwebtoken";
import { User, UserDTO } from "../../../domain/entities/user/user.entity";
import bcrypt from "bcrypt";

export default class Services {
  public static async encryptPassword(pass_word: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hashed_pwd = bcrypt.hash(pass_word, salt);
    return hashed_pwd;
  }

  public static async isMatch(
    password: string,
    encrypted_pwd: string
  ): Promise<boolean> {
    //const found_user = await this.repository.FindById(user.user_args_dto.id);
    const match = (await bcrypt.compare(password, encrypted_pwd))
      ? true
      : false;

    return match;
  }

  public static generateToken(user_info: UserDTO) {
    const SECRET = process.env.SECRET || "";
    const token = sign(
      {
        id: user_info.id,
        roles: user_info.project_roles,
      },
      SECRET,
      { expiresIn: "4 hours" }
    );
  }
}
