import { Request, Response } from "express";
import UserUseCases from "../../app/use_cases/users/users.use-case";
import MongoDBUserRepository from "../repositories/mongodb-user.repository";
import { User, UserDTO } from "../../domain/entities/user/user.entity";
import { UserFactory } from "../../domain/patterns/factories";
import { Result } from "../../domain/patterns/result";
import Services from "../../app/use_cases/services/services";

export default class UserController {
  user_ue: UserUseCases;

  constructor() {
    this.user_ue = new UserUseCases(new MongoDBUserRepository());
  }

  addUser = async (req: Request, res: Response): Promise<Partial<UserDTO>> => {
    const user_dto = req.body as UserDTO;

    const entity_or_error: Result<User> = new UserFactory().factoryMethod(
      user_dto
    );

    if (entity_or_error.isFailure) {
      res.status(401).json({
        error: entity_or_error.error,
        validation: user_dto.fields_state.group,
      });
    }

    let user: User = entity_or_error.getValue();

    await this.user_ue.saveUser(user);

    res.status(201).json({
      status: "success",
      data: {
        user: user.validUserDto,
      },
    });

    console.log(user.validUserDto);

    return user.validUserDto;
  };

  TestBase = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      status: "success that's working!",
    });
  };
}
