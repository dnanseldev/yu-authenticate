import { Router } from "express";
import "dotenv/config";
import UserController from "../controllers/user.controller";

const API_URL = process.env.BASE_API_URL;

export default class UserRoute {
  private router: Router;
  private uc: UserController;

  constructor() {
    this.router = Router();
    this.uc = new UserController();

    this.router.get(`${API_URL}/users`, this.uc.TestBase);
    this.router.post(`${API_URL}/users/login`, this.uc.doLogin);

    this.router.post(`${API_URL}/users`, this.uc.createUser);
    this.router.get(`${API_URL}/users/:id`, this.uc.readUser);
    this.router.patch(`${API_URL}/users/:id`, this.uc.updateUser);
    this.router.get(`${API_URL}/users/:id`, this.uc.deleteUser);
  }

  public get routes(): Router {
    return this.router;
  }
}
