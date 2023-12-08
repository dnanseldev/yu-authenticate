import "dotenv/config";
import { sign, decode, verify } from "jsonwebtoken";
const bcrypt = require("bcrypt");

export default class Services {
  public static encryptPassword(pass_word: string): unknown {
    const salt = bcrypt.genSalt(12);
    const hashed_pwd = bcrypt.hash(pass_word, salt);
    return hashed_pwd;
  }

  public static generateToken(user_info: unknown) {
    const SECRET = process.env.SECRET || "";
    const token = sign(
      {
        user_info,
      },
      SECRET
    );
  }
}
