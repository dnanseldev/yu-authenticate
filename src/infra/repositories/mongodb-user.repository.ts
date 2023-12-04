import ICommumRepository from "../../app/interfaces/base.repository";
import { UserDTO } from "../../domain/entities/user/user.entity";
import mongoose from "mongoose";
import UserModel from "../models/user.model";
import "dotenv/config";

export default class MongoDBUserRepository
  implements ICommumRepository<UserDTO>
{
  private strCon: string;

  constructor() {
    this.strCon = process.env.DB_STR_CON ?? "";
    mongoose.connect(this.strCon);
  }

  async Create(item: UserDTO | Partial<UserDTO>): Promise<Partial<UserDTO>> {
    const newUser = new UserModel({
      name: item.name,
      age: item.age,
      complement: item.complement,
      username: item.username,
      user_organization: item.user_organization,
      email: item.email,
      password: item.password,
      created_at: item.created_at,
    });

    await newUser.save();

    return item;
  }

  Update(id: string, item: UserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  Delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  Find(item: UserDTO): Promise<UserDTO[]> {
    throw new Error("Method not implemented.");
  }

  FindOne(id: string): Promise<UserDTO> {
    throw new Error("Method not implemented.");
  }

  FindAll(): Promise<UserDTO[]> {
    throw new Error("Method not implemented.");
  }

  //Exists(username: string): Promise<UserDTO[]> {}
}
