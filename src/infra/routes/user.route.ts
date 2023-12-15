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

    this.router.get(`${API_URL}/users/login`, this.uc.doLogin);
    this.router.post(`${API_URL}/users`, this.uc.addUser);
    this.router.get(`${API_URL}/users`, this.uc.TestBase);
  }

  public get routes(): Router {
    return this.router;
  }
}
