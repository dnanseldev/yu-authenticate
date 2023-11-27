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

    this.router.post(`${API_URL}/users`, this.uc.addUser);
  }
}
