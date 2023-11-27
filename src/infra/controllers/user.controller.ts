import { Request, Response } from "express";
import UserUseCases from "../../app/use_cases/users.use-case";
import MongoDBUserRepository from "../repositories/mongodb-user.repository";
import { UserDTO } from "../../domain/entities/user.entity";

export default class UserController {
  user_ue: UserUseCases;

  constructor() {
    this.user_ue = new UserUseCases(new MongoDBUserRepository());
  }

  addUser = async (req: Request, res: Response): Promise<Partial<UserDTO>> => {
    const newUser = req.body as UserDTO;

    if (!this.user_ue.isAuthorized(newUser.project_roles)) {
      res.status(401).json({
        msg: "Not Allowed!",
      });
    }

    await this.user_ue.saveUser(newUser);

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });

    console.log(newUser);

    return newUser;
  };

  TestBase = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      status: "success that's working!",
    });
  };
}
