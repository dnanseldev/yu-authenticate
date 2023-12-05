import { Request, Response } from "express";
import UserUseCases from "../../app/use_cases/users.use-case";
import MongoDBUserRepository from "../repositories/mongodb-user.repository";
import { User, UserDTO } from "../../domain/entities/user/user.entity";
import { UserFactory } from "../../domain/vo/factories";
import { Result } from "../../domain/vo/result";
import { FieldsValidation } from "../../domain/vo/types.utils";

export default class UserController {
  user_ue: UserUseCases;

  constructor() {
    this.user_ue = new UserUseCases(new MongoDBUserRepository());
  }

  addUser = async (req: Request, res: Response): Promise<Partial<UserDTO>> => {
    const user_dto = req.body as UserDTO;

    const user_or_error: Result<User> = new UserFactory().factoryMethod(
      user_dto
    );

    if (user_or_error.isFailure) {
      res.status(401).json({
        error: user_or_error.error,
        validation: user_dto.fields_state.group,
      });
    }

    let entity_user: User = user_or_error.getValue();

    await this.user_ue.saveUser(entity_user.user_dto);

    res.status(201).json({
      status: "success",
      data: {
        user: entity_user.user_dto,
      },
    });

    console.log(entity_user.user_dto);

    return entity_user.user_dto;
  };

  TestBase = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      status: "success that's working!",
    });
  };
}
