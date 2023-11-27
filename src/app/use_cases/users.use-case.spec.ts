import { assert } from "console";
import { ProjectRoles } from "../../domain/agregations/project-roles.ag";
import MongoDBUserRepository from "../../infra/repositories/mongodb-user.repository";
import UserUseCases from "./users.use-case";

describe("Testing User UseCases", () => {
  const ue = new UserUseCases(new MongoDBUserRepository());
  const pr: ProjectRoles = {
    ID: "14171019-db3d-4ea1-803e-86cdd19df967",
    name: "yu-authorize",
    description: "Authenticate",
    uri_domain: "http://localhost:3500",
    roles: [
      {
        name: "Guest",
        value: "Guest",
      },
      {
        name: "Member",
        value: "Member",
      },
    ],
  };

  test("isAuthorized Method", () => {
    expect(ue.isAuthorized(pr)).toBe(true);
    console.log(`Result ${ue.isAuthorized(pr)}`);
  });
});
