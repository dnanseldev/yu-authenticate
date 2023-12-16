import ICommumRepository from "../../app/interfaces/base.repository";
import { UserDTO } from "../../domain/entities/user/user.entity";
import mongoose from "mongoose";
import UserModel from "../models/user.model";
import "dotenv/config";
import { promises } from "dns";

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
      password: item.final_password,
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

  async FindOne(f_username: string): Promise<UserDTO | Partial<UserDTO>> {
    const userExists = await UserModel.findOne({ username: f_username });
    const user_dto: Partial<UserDTO> = {
      id: userExists?.id!,
      name: userExists?.name!,
      age: userExists?.age!,
      complement: userExists?.complement!,
      username: userExists?.username!,
      user_organization: userExists?.user_organization!,
      email: userExists?.email!,
      final_password: userExists?.password!,
    };
    return user_dto;
  }

  async FindById(id: string): Promise<UserDTO | Partial<UserDTO>> {
    const userExists = await UserModel.findById(id).exec();
    const user_dto: Partial<UserDTO> = {
      id: userExists?.id!,
      name: userExists?.name!,
      age: userExists?.age!,
      complement: userExists?.complement!,
      username: userExists?.username!,
      user_organization: userExists?.user_organization!,
      email: userExists?.email!,
    };
    return user_dto;
  }

  FindAll(): Promise<UserDTO[]> {
    throw new Error("Method not implemented.");
  }

  //Exists(username: string): Promise<UserDTO[]> {}
}
