import mongoose, { Mongoose } from "mongoose";
import { UserDTO } from "../../domain/entities/user/user.entity";
import MongoDBUserRepository from "./mongodb-user.repository";

describe.only("Testing Concrete User Repository", () => {
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

  /*
  test("Add new User", async () => {
    const newUser: Partial<UserDTO> = {
      username: "fela",
      user_organization: "souls like gamer company",
      email: "fela@gmail.com",
      password: "12345",
      created_at: new Date(Date.now()),
    };
    

    const usr = await rep.Create(newUser);
    */

  test.skip("Retrieving by Username", async () => {
    const mockUser = {
      id: "65637d15237df58d48f38454",
      name: undefined,
      age: undefined,
      complement: undefined,
      username: "fela",
      user_organization: "souls like gamer company",
      email: "fela@gmail.com",
    };

    const dto: Partial<UserDTO> = await rep.FindOne("fela");
    console.log(dto);
    expect(dto).toEqual(mockUser);
  });

  test.skip("Retrieving by ID", async () => {
    const mockUser = {
      id: "65637d15237df58d48f38454",
      name: undefined,
      age: undefined,
      complement: undefined,
      username: "fela",
      user_organization: "souls like gamer company",
      email: "fela@gmail.com",
    };

    const dto: Partial<UserDTO> = await rep.FindById(
      "65637d15237df58d48f38454"
    );
    console.log(dto);
    expect(dto).toEqual(mockUser);
  });
});
