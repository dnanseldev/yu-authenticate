import "dotenv/config";
import { sign, decode, verify } from "jsonwebtoken";
import { User, UserDTO } from "../../../domain/entities/user/user.entity";
import bcrypt from "bcrypt";

export default class Services {
  public static async encryptPassword(pass_word: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
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

  public static generateToken(user_info: UserDTO): string {
    const SECRET = process.env.SECRET || "";
    const token = sign(
      {
        id: user_info.id,
        // roles: user_info.project_roles,
      },
      SECRET,
      { expiresIn: "8h" }
    );

    return token;
  }

  public static base64url_encode(buffer: ArrayBuffer): string {
    return btoa(
      Array.from(new Uint8Array(buffer), (b) => String.fromCharCode(b)).join("")
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  public static base64url_decode(value: string): ArrayBuffer {
    const m = value.length % 4;
    return Uint8Array.from(
      atob(
        value
          .replace(/-/g, "+")
          .replace(/_/g, "/")
          .padEnd(value.length + (m === 0 ? 0 : 4 - m), "=")
      ),
      (c) => c.charCodeAt(0)
    ).buffer;
  }

  public static stringToArrayBuffer(str: string) {
    let encoder = new TextEncoder();
    return encoder.encode(str).buffer;
  }
}
