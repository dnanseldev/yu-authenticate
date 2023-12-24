import { Request, Response } from "express";
import UserUseCases from "../../app/use_cases/users/users.use-case";
import MongoDBUserRepository from "../repositories/mongodb-user.repository";
import { User, UserDTO } from "../../domain/entities/user/user.entity";
import { UserFactory } from "../../domain/patterns/factories";
import { Result } from "../../domain/patterns/result";
import { Login } from "../../domain/vo/types.utils";

export default class UserController {
  user_ue: UserUseCases;

  constructor() {
    this.user_ue = new UserUseCases(new MongoDBUserRepository());
  }

  doLogin = async (req: Request, res: Response): Promise<void> => {
    const login_data = req.body as Login;
    const user = await this.user_ue.doLogin(login_data);

    if (user.authenticated) {
      this.user_ue.authorizeUser(user);

      const resp_user: Partial<UserDTO> = {
        id: user.validUserDto.id,
        username: user.validUserDto.username,
        token: user.validUserDto.token,
      };

      const { token, ...resp_user2 } = resp_user;

      res.status(201).json({
        status: "success",
        data: {
          token,
          user: resp_user2,
        },
      });
    } else {
      res.status(401).json({
        status: "Not allowed",
      });
    }
  };

  addUser = async (req: Request, res: Response): Promise<void> => {
    const user_dto = req.body as UserDTO;
    user_dto.fields_state.invalid_qty = 0;
    const user_exists = await this.user_ue.userAlreadyExists(user_dto.email);

    if (user_exists) {
      res.status(500).json({
        msg: "User already registered",
      });
    } else {
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
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const updates = req.body;
      await this.user_ue.updateUser(userId, updates);
      res.status(201).json({
        status: "Updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  TestBase = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      status: "success that's working!",
    });
  };
}
