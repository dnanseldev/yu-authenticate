export enum Roles {
  Owner = "Owner",
  Admin = "Admin",
  Member = "Member",
  Guest = "Guest",
}

export interface ProjectRoles {
  readonly ID: string;
  readonly name: string;
  readonly description: string;
  readonly uri_domain: string;
  readonly roles: {
    name: string;
    value: string;
  }[];
}
