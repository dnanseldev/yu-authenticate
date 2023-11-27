import express, { Application, Request, Response } from "express";
import UserRoute from "./infra/routes/user.route";

export default class App {
  public server: Application;

  constructor() {
    this.server = express();
    this.bootstrappingMiddlewares();
    this.testHomePage();
  }

  private bootstrappingMiddlewares() {
    this.server.use(express.json());
    this.server.use(new UserRoute().routes);
    // this.server.use(new ServiceNoteRoute().routes);
  }

  private testHomePage() {
    this.server.get("/", (req: Request, res: Response) => {
      res.status(200).json({ msg: "Welcome to our API!" });
    });
  }
}
