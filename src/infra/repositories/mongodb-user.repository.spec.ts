import mongoose, { Mongoose } from "mongoose";
import { UserDTO } from "../../domain/entities/user.entity";
import MongoDBUserRepository from "./mongodb-user.repository";

describe("Testing Concrete User Repository", () => {
  const strCon = process.env.DB_STR_CON ?? "";
  let mongoCli: Mongoose;

  beforeAll(async () => {
    mongoCli = await mongoose.connect(strCon);
  });

  afterAll(async () => {
    await mongoCli.connection.close();
  });

  afterAll(async () => {
    await mongoCli.connection.close();
  });

  const rep = new MongoDBUserRepository();

  test("Add new User", async () => {
    const newUser: Partial<UserDTO> = {
      username: "fela",
      user_organization: "souls like gamer company",
      email: "fela@gmail.com",
      password: "12345",
      created_at: new Date(Date.now()),
    };

    const usr = await rep.Create(newUser);
    console.log(usr);
  });
});
